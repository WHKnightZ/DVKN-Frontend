/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom'
import { ModalConfirmContainer, ToastContainer, ScrollToTop, SessionContainer } from 'components'

// Routes
import { getUserLS } from 'utils'
import { loading } from 'configs/extensions'
import { useDispatch } from 'react-redux'
import { updateAuth } from 'store/auth/actions'

import AdminLayout from 'pages/admin/layout/Layout'
import UserLayout from 'pages/user/layout/Layout'
import PrivateRoute from 'privateRoute'

const Battle = React.lazy(() => import('pages/user/battle/Battle'))

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(() => {
    const userInfo = getUserLS()
    const { access_token, is_admin } = userInfo
    if (access_token) {
      dispatch(updateAuth(userInfo))
      if (is_admin && !pathname.includes('/admin')) history.push('/admin')
    }
    setInitializing(false)
  }, [])

  if (initializing) return loading

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <ModalConfirmContainer />
        <SessionContainer />
        <ScrollToTop>
          <Switch>
            <Route path="/admin" component={AdminLayout} />
            <PrivateRoute
              path="/chien-dau"
              title="Chiến đấu"
              component={Battle}
              className="h-100"
              checkRefresh
            />
            <Route path="/" component={UserLayout} />
            <Redirect to="/" />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  )
}

export default App
