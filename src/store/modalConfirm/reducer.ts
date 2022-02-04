import { HIDE_MODAL_CONFIRM, SHOW_MODAL_CONFIRM } from 'store/actionTypes'
import { ActionType } from 'types'

const initialState = { show: false, title: '', content: '' }

const modalConfirmReducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case SHOW_MODAL_CONFIRM:
      return { ...payload, show: true }

    case HIDE_MODAL_CONFIRM:
      return { ...state, show: false }

    default:
      return state
  }
}

export default modalConfirmReducer
