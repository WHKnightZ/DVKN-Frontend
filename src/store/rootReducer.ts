import { combineReducers } from 'redux'

import { authReducer } from './auth'
import { modalConfirmReducer } from './modalConfirm'
import { toastsReducer } from './toasts'

const rootReducer = combineReducers({
  modalConfirm: modalConfirmReducer,
  auth: authReducer,
  toasts: toastsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
