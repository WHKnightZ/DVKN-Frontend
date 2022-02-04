import { Page, Title } from 'components'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps, RouteComponentProps, useHistory } from 'react-router-dom'
import { RootState } from 'types'

interface Props extends RouteProps {
  className?: string
  isAdmin?: boolean
  title: string
  checkRefresh?: boolean
  hideTitle?: boolean
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

const PrivateRoute: React.FC<Props> = ({
  component: Component,
  title,
  className,
  checkRefresh,
  isAdmin,
  hideTitle,
  ...rest
}) => {
  const auth = useSelector((state: RootState) => state.auth)
  const isLogged = auth.access_token && (isAdmin ? auth.is_admin : true)
  const history = useHistory()
  const { t } = useTranslation()
  title = t(title)

  useEffect(() => {
    if (checkRefresh) {
      if (!localStorage.getItem('check-refresh')) history.push('/')
    }

    localStorage.removeItem('check-refresh')
  }, [])

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? (
          <Page title={title} className={className}>
            {isAdmin && !hideTitle && <Title>{title}</Title>}
            <Component {...props} />
          </Page>
        ) : (
          <Redirect to="/dang-nhap" />
        )
      }
    />
  )
}

export default PrivateRoute
