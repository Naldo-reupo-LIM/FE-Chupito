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
}

export const AuthProvider = ({ children }: Props) => {
  let initialState = { isAuth: false, userUid: '' }
  const api = Authentication()

  const verifyUser = async () => {
    try {
      const { isAuth, userUid }: VerifyApiResponse = await api.verifyAuth()
      dispatch({
        type: 'UPDATE_IS_AUTH',
        payload: {
          isAuth,
          userUid,
        },
      })
      //TODO: Implement method to bring user data
    } catch (error) {
      console.log(error)
    }
  }
  const setLoginData = ({ isAuth, userUid }: VerifyApiResponse) => {
    dispatch({
      type: 'UPDATE_IS_AUTH',
      payload: {
        isAuth,
        userUid,
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
