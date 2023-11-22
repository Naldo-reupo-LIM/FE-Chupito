import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Login from '../../components/Login/Login'
import { Authentication } from '../../shared/api'
import EventsApi from '../../shared/api/endpoints/events'
import { AuthContext } from '../../shared/contexts/Auth/AuthContext'
import { useAuth } from '../../shared/hooks/useAuth'
import NoneLayout from '../../hocs/NoneLayout'

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const eventId = params.get('eventId')
  const { setLoginData } = useContext(AuthContext)
  const history = useHistory()
  const user = useAuth()

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

      if (eventId) {
        const eventsApi = EventsApi()
        await eventsApi.addAttendees(eventId, {
          email: userName,
          password,
        })
      }
      handleRedirect()
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
      }
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRedirect = useCallback(() => {
    const { email, isAdmin } = user.state

    let shouldRedirectTo = '/login'

    if (email) {
      shouldRedirectTo = isAdmin ? '/events/list' : '/'
    } else if (eventId) {
      shouldRedirectTo = `/event-info/${eventId}`
    }
    history.push(shouldRedirectTo)
  }

  useEffect(() => {
    handleRedirect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NoneLayout>
      <Login
        onLogin={handleLoginClicked}
        googleOnLogin={handleGoogleLogin}
        loading={loading}
      />
    </NoneLayout>
  )
}
