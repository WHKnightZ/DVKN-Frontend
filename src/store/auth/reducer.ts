import { CLEAR_AUTH, UPDATE_AUTH } from 'store/actionTypes'
import { ActionType, AuthType } from 'types'

const initialState: AuthType = {}

const authReducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_AUTH:
      return { ...state, ...payload }

    case CLEAR_AUTH:
      return initialState

    default:
      return state
  }
}

export default authReducer
