import { useState } from 'react'

import Login from '../../components/Login/Login'
import { Authentication } from '../../shared/api'

export default function LoginPage(): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [state] = useState('')
  const [redirectURL] = useState(null)

  const api = Authentication()

  const handleLoginClicked = (userName: string, password: string) => {
    setLoading(true)

    api
      .login({ email: userName, password })
      .then((result) => {
        result.user.getIdToken().then((resultToken) => {
          setLoading(false)
          window.localStorage.setItem('token', JSON.stringify(resultToken))
        })

        if (redirectURL && state) {
          const completeURL = `${redirectURL}?state=${state}&code=`
          window.location.href = completeURL
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return <Login onLogin={handleLoginClicked} loading={loading} />
}
