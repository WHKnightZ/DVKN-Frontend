import React, { Suspense } from 'react'
import './index.scss'
import { Redirect, Route, Switch } from 'react-router'
import PrivateRoute from 'privateRoute'
import { loading } from 'configs/extensions'

import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import InitDeck from '../auth/InitDeck'
import Home from '../home/Home'

const Battle = React.lazy(() => import('../battle/Battle'))

const routes = [
  { path: 'khoi-tao', component: InitDeck, title: 'Bộ bài' },
  {
    path: 'chien-dau',
    component: Battle,
    title: 'Chiến đấu',
    className: 'h-100',
    checkRefresh: true,
  },
  { path: '', component: Home, title: 'Trang chủ' },
]

const Layout: React.FC = () => {
  return (
    <div className="Layout">
      <div className="Main">
        <Suspense fallback={loading}>
          <Switch>
            {routes.map(({ path, component, title, className, checkRefresh }) => (
              <PrivateRoute
                key={path}
                exact
                path={`/${path}`}
                component={component}
                title={title}
                className={className}
                checkRefresh={checkRefresh}
              />
            ))}
            <Route exact component={SignIn} path="/dang-nhap" />
            <Route exact component={SignUp} path="/dang-ky" />
            <Redirect to="/dang-nhap" />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default Layout
