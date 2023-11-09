import { useState, useContext } from 'react'

import Login from '../../components/Login/Login'
import { Authentication } from '../../shared/api'
import EventsApi from '../../shared/api/endpoints/events'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const eventId = params.get('eventId')
  const { setLoginData, getUserInfo } = useContext(AuthContext)

  const api = Authentication()

  const handleLoginClicked = async (userName: string, password: string) => {
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
    } catch (err) {
      console.error(err)
    }
  }
  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const user = await api.googleSignIn()

      if (user) {
        window.localStorage.setItem('token', JSON.stringify(user.token))
        await getUserInfo(user.uid, user.displayName)
      }
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Login
      onLogin={handleLoginClicked}
      googleOnLogin={handleGoogleLogin}
      loading={loading}
    />
  )
}
