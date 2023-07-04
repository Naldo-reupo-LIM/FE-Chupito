import { useReducer, ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { Authentication } from '../../shared/api'
import { reducer } from './AuthReducer'

type Props = {
  children: ReactNode
}
interface VerifyApiResponse {
  isAuth: boolean
  user: {} | null
}

export const AuthProvider = ({ children }: Props) => {
  let initialState = { isAuth: false, email: '', loadingIsAuth: true }
  const api = Authentication()

  const verifyUser = async () => {
    try {
      const verifyApiResponse: VerifyApiResponse = await api.verifyAuth()
      dispatch({
        type: 'UPDATE_IS_AUTH',
        payload: { isAuth: verifyApiResponse.isAuth },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AuthContext.Provider value={{ state, verifyUser }}>
      {children}
    </AuthContext.Provider>
  )
}
