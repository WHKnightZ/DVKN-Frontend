import React, { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Box, Divider, MenuItem, Typography, Avatar, IconButton, Popover } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useModalConfirm } from 'store/modalConfirm'
import { useAuth } from 'store/auth'
import { DEFAULT_AVATAR } from 'configs/constants'

const AccountPopover: React.FC = () => {
  const { t } = useTranslation()

  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const { signOut, username } = useAuth()
  const { showModalConfirm, hideModalConfirm } = useModalConfirm()

  /**
   * Show modal sign out
   */
  const showModalSignOut = () => {
    showModalConfirm({
      title: t('confirmation'),
      content: t('sure_sign_out'),
      cancel: { text: t('lbl_no'), action: hideModalConfirm },
      confirm: {
        text: t('lbl_yes'),
        action: () => {
          hideModalConfirm()
          signOut()
        },
      },
    })
  }

  const menuOptions = [
    {
      label: 'profile',
      icon: 'fas fa-user',
      linkTo: '#',
    },
    {
      label: 'change_password',
      icon: 'fas fa-lock',
      linkTo: '#',
    },
    {
      label: 'sign_out',
      icon: 'fas fa-sign-out-alt',
      linkTo: '#',
      onClick: showModalSignOut,
    },
  ]

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
        }}
      >
        <Avatar src={DEFAULT_AVATAR} alt="avatar" />
      </IconButton>

      <Popover
        className="MenuPopover"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.5,
            width: 250,
            borderRadius: '8px',
            pb: 2,
          },
        }}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 250 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="body2" noWrap style={{ color: 'var(--cl-secondary)' }}>
            Quản Trị Viên
          </Typography>
          <Typography
            variant="subtitle1"
            noWrap
            textOverflow="ellipsis"
            style={{ color: 'var(--cl-secondary)' }}
          >
            {username}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {menuOptions.map((option) => (
          <MenuItem
            key={option.label}
            component={RouterLink}
            to={option.linkTo}
            onClick={() => {
              handleClose()
              option.onClick?.()
            }}
            sx={{ typography: 'body2', py: 1.5, px: 2.5 }}
            style={{ color: 'var(--cl-secondary)' }}
          >
            <Box mr={2} display="flex" alignItems="center">
              <i className={`icon-sm ${option.icon}`} />
            </Box>
            {t(option.label)}
          </MenuItem>
        ))}
      </Popover>
    </>
  )
}

export default AccountPopover
