type State = {
  isAuth: boolean
  userUid: string
  email: string
}
type Action = {
  type: 'UPDATE_IS_AUTH'
  payload: { isAuth: boolean; userUid: string; email: string }
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_IS_AUTH':

      const { isAuth, userUid, email } = action.payload
      return {
        ...state,
        isAuth,
        userUid,
        email,
      }

    default:
      return state
  }
}
