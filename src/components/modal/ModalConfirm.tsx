import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { formatContent } from './extensions'
import Button from '../button/Button'

interface Props {
  show: boolean
  title: string
  content: any
  confirm?: { text: string; action: any }
  cancel?: { text: string; action: any }
  center?: boolean
  small?: boolean
}

const ModalConfirm: React.FC<Props> = (props) => {
  const { show, title, confirm, cancel, center, small = true } = props
  let { content } = props
  content = formatContent(content)

  return (
    <Dialog open={show} className="Modal" fullWidth maxWidth={small ? 'xs' : 'sm'}>
      <DialogTitle style={{ textAlign: center ? 'center' : undefined }}>{title}</DialogTitle>
      <DialogContent style={{ fontWeight: 500, textAlign: center ? 'center' : undefined }}>
        {content}
      </DialogContent>
      <DialogActions>
        {cancel && (
          <Button onClick={cancel.action} color="primary">
            {cancel.text}
          </Button>
        )}
        {confirm && (
          <Button onClick={confirm.action} variant="contained" color="primary">
            {confirm.text}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ModalConfirm
