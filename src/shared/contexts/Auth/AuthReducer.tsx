type State = {
  isAuth: boolean
  userUid: string
  email: string
  userName: string
  isAdmin: boolean
}
type UpdateUsernameAction = {
  type: 'UPDATE_USER'
  payload: {
    username: string
    isAdmin: boolean
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
    case 'UPDATE_USER':
      const { username, isAdmin } = action.payload
      return {
        ...state,
        username,
        isAdmin
      }

    default:
      return state
  }
}
