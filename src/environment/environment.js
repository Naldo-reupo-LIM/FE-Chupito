const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  version: process.env.REACT_APP_VERSION,
  eventCollectionName: 'events',
  appId: process.env.REACT_APP_ID,
  user: process.env.TEST_USER_EMAIL,
  password: process.env.TEST_USER_PWD,
}

export default config
