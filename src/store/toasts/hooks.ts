import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { ToastType } from 'types'

import { createToast, removeToast } from './actions'

export default function useToasts() {
  const dispatch = useDispatch()

  return useMemo(
    () => ({
      createToast: (payload: ToastType) => dispatch(createToast(payload)),
      removeToast: (key: number) => dispatch(removeToast(key)),
    }),
    [dispatch]
  )
}
