import { CREATE_TOAST, REMOVE_TOAST } from 'store/actionTypes'
import { DispatchType, ToastType } from 'types'

export const createToast = (payload: ToastType) => (dispatch: DispatchType) => {
  dispatch({ type: CREATE_TOAST, payload })
}

export const removeToast = (key: number) => (dispatch: DispatchType) => {
  dispatch({ type: REMOVE_TOAST, payload: key })
}
