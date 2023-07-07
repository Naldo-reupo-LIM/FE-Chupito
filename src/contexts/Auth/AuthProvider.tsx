import { useReducer, ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { Authentication } from '../../shared/api'
import { reducer } from './AuthReducer'
//import Users from '../../api/users'

type Props = {
  children: ReactNode
}
interface VerifyApiResponse {
  isAuth: boolean
  userUid: string
  email: string
}

export const AuthProvider = ({ children }: Props) => {
  let initialState = { isAuth: false, userUid: '', email: '' }
  const api = Authentication()

  const verifyUser = async () => {
    try {
      const { isAuth, userUid, email }: VerifyApiResponse =
        await api.verifyAuth()
      dispatch({
        type: 'UPDATE_IS_AUTH',
        payload: {
          isAuth,
          userUid,
          email,
        },
      })
      //TODO: Implement method to bring user data
    } catch (error) {
      console.log(error)
    }
  }

  const setLoginData = ({ isAuth, userUid, email }: VerifyApiResponse) => {
    dispatch({
      type: 'UPDATE_IS_AUTH',
      payload: {
        isAuth,
        userUid,
        email,
      },
    })
  }
  //TODO: Add endpoint to access user data only

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, verifyUser, setLoginData }}>
      {children}
    </AuthContext.Provider>
  )
}
