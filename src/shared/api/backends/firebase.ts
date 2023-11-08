import { FirebaseApp, initializeApp } from 'firebase/app'

import getEnvVariables from '../../environment/environment'

let app: FirebaseApp

const getFirebaseApp = () => {
  const { apiKey, authDomain, projectId, storageBucket, messagingSenderId } =
    getEnvVariables()
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
  }
  if (!app) {
    app = initializeApp(firebaseConfig)
  }
  return app
}

export default getFirebaseApp
