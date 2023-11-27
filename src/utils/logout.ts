// TODO: this should be in api folder calls

import Security from '../shared/api/endpoints/security'
import { Authentication } from '../shared/api'
import { VerifyApiResponse } from '../shared/entities/auth'

// TODO: is getUserInfo needed here?
export const logout = async (
  setLoginData: ({ isAuth, userUid, email }: VerifyApiResponse) => void,
  getUserInfo: () => void
) => {
  const api = Security()
  const firebase = Authentication()

  try {
    await firebase.logout()
    const data = await api.revokeToken()
    if (data) {
      setLoginData({ isAuth: false, userUid: '', email: '' })
      getUserInfo()

      localStorage.removeItem('token')
    }
  } catch (error) {
    console.log(error)
  }
}
