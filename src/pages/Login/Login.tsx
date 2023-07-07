import { useState, useContext } from 'react'

import Login from '../../components/Login/Login'
import { Authentication } from '../../shared/api'
import EventsApi from '../../api/events'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const eventId = params.get('eventId')
  const { setLoginData, getUserInfo } = useContext(AuthContext)

  const api = Authentication()

  const handleLoginClicked = async (
    userName: string,
    password: string,
    callback: () => void
  ) => {
    setLoading(true)
    try {
      const result = await api.login({ email: userName, password })
      const resultToken = await result.user.getIdToken()
      setLoading(false)
      window.localStorage.setItem('token', JSON.stringify(resultToken))

      setLoginData({
        isAuth: true,
        userUid: result.user.uid,
        email: result.user.email,
      })
      await getUserInfo(result.user.uid)

      if (eventId) {
        const eventsApi = new EventsApi()
        await eventsApi.addAttendees(eventId, {
          email: userName,
          password,
        })
      }
      callback()
    } catch (err) {
      console.error(err)
    }
  }

  return <Login onLogin={handleLoginClicked} loading={loading} />
}
