import { CLEAR_AUTH, UPDATE_AUTH } from 'store/actionTypes'
import { AuthType, DispatchType } from 'types'

export const signOut = () => (dispatch: DispatchType) => {
  dispatch({ type: CLEAR_AUTH })
}

export const updateAuth = (payload: AuthType) => {
  return { type: UPDATE_AUTH, payload }
}
