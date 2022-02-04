import React from 'react'
import { matchPath, useHistory, useLocation } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface Props {
  navConfig: any[]
  [key: string]: any
  open: boolean
  handleCloseSidebar: any
}

const NavSection: React.FC<Props> = ({ navConfig, open, handleCloseSidebar, ...rest }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const history = useHistory()
  const match = (path: any) => matchPath(pathname, { path, exact: false })

  return (
    <Box className="NavSection" pt={3} {...rest}>
      <List disablePadding>
        {navConfig.map(({ title, path, icon, onClick }) => {
          const active = match(path)

          const handleClick = () => {
            path && history.push(path)
            onClick?.()
            // Close sidebar if clicked at current path
            active && handleCloseSidebar()
          }

          return (
            <ListItemButton
              key={title}
              className={`NavSection-item${active ? ' active' : ''}`}
              onClick={handleClick}
            >
              <i className={`fas fa-${icon}`} />
              <ListItemText className={`AdminSidebar-label${open ? ' active' : ''}`}>
                {t(title)}
              </ListItemText>
              <div className="NavSection-item__border-right"></div>
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

export default NavSection
