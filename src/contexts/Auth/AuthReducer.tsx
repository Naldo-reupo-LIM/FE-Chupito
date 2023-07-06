type State = {
  isAuth: boolean
  userUid: string
}
type Action = {
  type: 'UPDATE_IS_AUTH'
  payload: { isAuth: boolean; userUid: string }
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_IS_AUTH':
      const { isAuth, userUid } = action.payload
      return {
        ...state,
        isAuth,
        userUid,
      }

    default:
      return state
  }
}
