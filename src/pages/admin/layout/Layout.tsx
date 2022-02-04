import React, { Suspense } from 'react'
import './index.scss'
import Sidebar from './Sidebar'
import { Redirect, Switch } from 'react-router'
import PrivateRoute from 'privateRoute'
import { loading } from 'configs/extensions'
import Navbar from './Navbar'

const Cards = React.lazy(() => import('../cards/Cards'))
const AddCard = React.lazy(() => import('../cards/AddCard'))
const EditCard = React.lazy(() => import('../cards/EditCard'))
const Dashboard = React.lazy(() => import('../dashboard/Dashboard'))

const routes = [
  { path: 'the-bai', component: Cards, title: 'Danh sách Thẻ bài' },
  { path: 'the-bai/them-moi', component: AddCard, title: 'Thêm Thẻ bài' },
  { path: 'the-bai/:id', component: EditCard, title: 'card_management', hideTitle: true },
  { path: 'dashboard', component: Dashboard, title: 'dashboard' },
]

const Layout: React.FC = () => {
  return (
    <div className="AdminLayout">
      <Navbar />
      <Sidebar />
      <div className="AdminMain">
        <div className="AdminContainer">
          <Suspense fallback={loading}>
            <Switch>
              {routes.map(({ path, component, title, hideTitle }) => (
                <PrivateRoute
                  key={path}
                  exact
                  path={`/admin/${path}`}
                  component={component}
                  title={title}
                  isAdmin
                  hideTitle={hideTitle}
                />
              ))}
              <Redirect to="/admin/the-bai" />
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Layout
