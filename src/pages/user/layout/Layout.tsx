import React, { Suspense } from 'react'
import './index.scss'
import { Route, Switch } from 'react-router'
import PrivateRoute from 'privateRoute'
import { loading } from 'configs/extensions'

import SignIn from '../auth/SignIn'
import SignUp from '../auth/SignUp'
import InitDeck from '../auth/InitDeck'
import MainLayout from './MainLayout'

const routes: {
  path: string
  component: any
  title: string
  className?: string
  checkRefresh?: boolean
}[] = [{ path: 'khoi-tao', component: InitDeck, title: 'Bộ bài' }]

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
            <Route component={MainLayout} path="/" />
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default Layout
