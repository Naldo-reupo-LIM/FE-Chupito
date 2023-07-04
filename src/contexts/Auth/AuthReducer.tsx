type State = {
  isAuth: boolean
}
type Action = {
  type: 'UPDATE_IS_AUTH'
  payload: { isAuth: boolean }
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'UPDATE_IS_AUTH':
      return { ...state, isAuth: action.payload.isAuth }

    default:
      return state
  }
}
