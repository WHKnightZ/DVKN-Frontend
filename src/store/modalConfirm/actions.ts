import { HIDE_MODAL_CONFIRM, SHOW_MODAL_CONFIRM } from 'store/actionTypes'
import { DispatchType, ModalConfirmType } from 'types'

/**
 * Show modal confirm
 * @param payload title, content, buttons of modal
 */
export const showModalConfirm = (payload: ModalConfirmType) => (dispatch: DispatchType) => {
  dispatch({ type: SHOW_MODAL_CONFIRM, payload })
}

/**
 * Hide modal confirm
 */
export const hideModalConfirm = () => (dispatch: DispatchType) => {
  dispatch({ type: HIDE_MODAL_CONFIRM })
}
