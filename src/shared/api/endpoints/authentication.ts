import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

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
  const verifyAuth = () => {
    return new Promise<{ isAuth: boolean; userUid: string; email: string }>(
      (resolve, reject) => {
        const auth = getAuth(getFirebaseApp())
        auth.onAuthStateChanged((user) => {
          const { uid, email } = user ?? {}
          if (uid) {
            resolve({
              isAuth: true,
              userUid: uid,
              email: email as string,
            })
          } else {
            reject({ isAuth: false, userUid: '', email: '' })
          }
        })
      }
    )
  }

  const logout = () => {
    const auth = getAuth(getFirebaseApp())
    return signOut(auth)
  }

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(getFirebaseApp())

    provider.setCustomParameters({
      prompt: 'select_account',
    })
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const idTokenResult = await user.getIdTokenResult()
      const displayName = idTokenResult.claims.name || user.displayName

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        token: idTokenResult.token,
      }

      return userData
    } catch (error) {
      console.error('Error during sign-in', error)
    }
  }

  return {
    login,
    logout,
    verifyAuth,
    googleSignIn,
  }
}

export default Authentication
