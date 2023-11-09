import Security from '../shared/api/endpoints/security'
import { Authentication } from '../shared/api'
import { VerifyApiResponse } from '../shared/entities/auth'

// TODO: Refactor logout to avoid using history
export const logout = async (
  history: Array<{}>,
  setLoginData: ({ isAuth, userUid, email }: VerifyApiResponse) => void,
  getUserInfo: () => void
) => {
  const api = new Security()
  const firebase = Authentication()

  try {
    const data = await api.logout()
    await firebase.logout()
    if (data) {
      history.push('/')

      setLoginData({ isAuth: false, userUid: '', email: '' })
      getUserInfo()

      localStorage.removeItem('token')
    }
  } catch (error) {
    console.log(error)
  }
}
