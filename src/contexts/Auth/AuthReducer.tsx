type State = {
  isAuth: boolean
  userUid: string
  email: string
  username: string
}
type UpdateUsernameAction = {
  type: 'UPDATE_USERNAME'
  payload: {
    username: string
  }
}
type Action =
  | {
      type: 'UPDATE_IS_AUTH'
      payload: {
        isAuth: boolean
        userUid: string
        email: string
      }
    }
  | UpdateUsernameAction

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
    case 'UPDATE_USERNAME':
      const { username } = action.payload
      return {
        ...state,
        username,
      }

    default:
      return state
  }
}
