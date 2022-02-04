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

const App: React.FC = () => {
  const [initializing, setInitializing] = useState(true)
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(() => {
    const userInfo = getUserLS()
    const { access_token } = userInfo
    if (access_token) {
      dispatch(updateAuth(userInfo))
      // if (!pathname.includes('/admin')) history.push('/admin')
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
            <Route path="/" component={UserLayout} />
            <Redirect to="/" />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  )
}

export default App
