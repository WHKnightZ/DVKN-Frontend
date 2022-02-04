import { Breakpoint, Dialog, DialogTitle } from '@mui/material'
import React from 'react'
import './index.scss'

interface Props {
  show: boolean
  title: string
  close?: any
  size?: Breakpoint
}

const Modal: React.FC<Props> = (props) => {
  const { show, title, close, children, size = 'xs' } = props

  return (
    <Dialog className="Modal" open={show} fullWidth maxWidth={size}>
      <DialogTitle>
        {title}
        {!!close && <i className="fas fa-times" onClick={close} />}
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export default Modal
