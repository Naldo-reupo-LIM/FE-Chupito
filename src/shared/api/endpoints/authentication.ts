import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import getFirebaseApp from '../backends/firebase'
import { Credentials } from '../../entities'

function Authentication() {
  const login = (credentials: Credentials) => {
    const auth = getAuth(getFirebaseApp())

    signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    ).then((userCredential) => {
      return userCredential.user
    })
    return signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
  }

  const logout = () => {
    const auth = getAuth(getFirebaseApp())
    return signOut(auth)
  }

  return {
    login,
    logout,
  }
}

export default Authentication
