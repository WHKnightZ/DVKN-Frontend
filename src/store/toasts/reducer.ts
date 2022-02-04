import { CREATE_TOAST, REMOVE_TOAST } from 'store/actionTypes'
import { ActionType } from 'types'

let toastKey = 0

const toastsReducer = (state: { key: number; message: string }[] = [], action: ActionType) => {
  const { type, payload } = action

  switch (type) {
    case CREATE_TOAST:
      // Not add duplicate toast
      // if (state.findIndex((item: any) => item.message === payload.message) !== -1) return state

      toastKey += 1
      return [...state, { ...payload, key: toastKey }]

    case REMOVE_TOAST:
      return state.filter((s) => s.key !== payload)

    default:
      return state
  }
}

export default toastsReducer
