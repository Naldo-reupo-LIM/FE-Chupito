import { useReducer, ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { Authentication } from '../../shared/api'
import { reducer } from './AuthReducer'
import Users from '../../api/users'

type Props = {
  children: ReactNode
}
interface VerifyApiResponse {
  isAuth: boolean
  userUid: string
  email: string
  username?: string | null
}

export const AuthProvider = ({ children }: Props) => {
  let initialState = { isAuth: false, userUid: '', email: '', username: '' }
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

      if (isAuth) {
        await getUserInfo(userUid)
      }
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
  const getUserInfo = async (userUid: string) => {
    const usersApi = new Users()

    try {
      const userResponse = await usersApi.getUserById(userUid)
      dispatch({
        type: 'UPDATE_USERNAME',
        payload: {
          username: userResponse.firstName as string,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider
      value={{ state, verifyUser, setLoginData, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  )
}
