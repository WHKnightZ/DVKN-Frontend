import React, { Suspense } from 'react'
import { Redirect, Switch } from 'react-router'
import PrivateRoute from 'privateRoute'
import { loading } from 'configs/extensions'

import Header from './Header'
import Home from '../home/Home'
import Missions from '../missions/Missions'
import BattlePlayers from '../battle/BattlePlayers'
import Cards from '../cards/Cards'
import CardDetail from '../cards/CardDetail'

const routes: {
  path: string
  component: any
  title: string
  className?: string
  checkRefresh?: boolean
}[] = [
  { path: 'lang-cha', component: Missions, title: 'Làng chạ' },
  { path: 'so-tai', component: BattlePlayers, title: 'So tài' },
  { path: 'the-bai', component: Cards, title: 'Thẻ bài' },
  { path: 'the-bai/thong-tin', component: CardDetail, title: 'Thông tin Thẻ bài' },
  { path: '', component: Home, title: 'Trang chủ' },
]

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
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
          <Redirect to="/dang-nhap" />
        </Switch>
      </Suspense>
    </>
  )
}

export default MainLayout
