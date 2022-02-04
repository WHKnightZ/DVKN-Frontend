import { useMemo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from 'store'
import { AuthType } from 'types'
import { removeUserLS, updateUserLS } from 'utils'
import { signOut, updateAuth } from './actions'

export default function useAuth() {
  const dispatch = useDispatch()
  const authReducer: AuthType = useSelector((state: RootState) => state.auth, shallowEqual)

  const { pathname = '' } = useLocation() || {}

  return useMemo(
    () => ({
      ...authReducer,
      isAuth: !!authReducer.access_token,
      signOut: () => {
        removeUserLS()
        dispatch(signOut())
      },
      updateAuth: (payload: any) => {
        updateUserLS(payload)
        dispatch(updateAuth(payload))
      },
    }),
    [dispatch, authReducer, pathname]
  )
}
