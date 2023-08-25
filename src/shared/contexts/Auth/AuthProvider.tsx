import { useReducer, ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import { Authentication } from '../../api'
import { reducer } from './AuthReducer'
import Users from '../../../api/users'
import { VerifyApiResponse } from '../../entities/auth'

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  let initialState = { isAuth: false, userUid: '', email: '', userName: '', isAdmin: false }
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
      const { firstName, isAdmin } = await usersApi.getUserById(userUid)
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          username: firstName as string,
          isAdmin
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
