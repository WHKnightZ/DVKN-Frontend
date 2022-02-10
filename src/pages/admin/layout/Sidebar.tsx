import React, { useState } from 'react'
import { Button, ListItemText } from '@mui/material'
import { Scrollbar } from 'components'
import NavSection from './NavSection'

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false)

  const toggleSidebar = () => setOpen(!open)
  const handleCloseSidebar = () => setOpen(false)

  const sidebarConfig = [
    {
      title: 'card_management',
      path: '/admin/the-bai',
      icon: 'clone', //id-badge
    },
    {
      title: 'account_management',
      path: '/admin/tai-khoan',
      icon: 'users',
    },
  ]

  const renderContent = (
    <Scrollbar className="AdminSidebar-scroll">
      <div className="AdminSidebar-wrapper">
        <div className="AdminSidebar-menu">
          <div className="AdminSidebar-menu__left">
            <Button className={open ? 'active' : ''} onClick={toggleSidebar}>
              <i className="fas fa-bars" />
            </Button>
            <ListItemText className={`AdminSidebar-label big${open ? ' active' : ''}`}>
              Menu
            </ListItemText>
          </div>
          <Button className="AdminSidebar-menu__close" onClick={handleCloseSidebar}>
            <i className="fas fa-times" />
          </Button>
        </div>
        <NavSection open={open} handleCloseSidebar={handleCloseSidebar} navConfig={sidebarConfig} />
      </div>
    </Scrollbar>
  )

  return <div className={`AdminSidebar${open ? ' open' : ' close'}`}>{renderContent}</div>
}

export default Sidebar
