import { useContext, useEffect } from 'react'

import { AuthContext } from '../contexts/Auth/AuthContext'

export const useAuth = () => {
  const { state, verifyUser } = useContext(AuthContext)

  useEffect(() => {
    verifyUser()
  }, [])

  return { state }
}
