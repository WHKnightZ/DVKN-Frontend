import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ModalConfirmType } from 'types'

import { showModalConfirm, hideModalConfirm } from './actions'

export default function useModalConfirm() {
  const dispatch = useDispatch()

  return useMemo(
    () => ({
      showModalConfirm: (payload: ModalConfirmType) => dispatch(showModalConfirm(payload)),
      hideModalConfirm: () => dispatch(hideModalConfirm()),
    }),
    [dispatch]
  )
}
