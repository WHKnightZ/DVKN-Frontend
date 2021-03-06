import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import Input from '../input/Input'
import Button from '../button/Button'
import { validatePassword } from 'utils'
import { useTranslation } from 'react-i18next'
import { formatContent } from './extensions'
import { useEffect } from 'react'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'

interface Props {
  show: boolean
  title: string
  content: string
  onSuccess?: () => void
  onClose?: () => void
}

const ModalConfirmPassword: React.FC<Props> = ({ show, content, title, onSuccess, onClose }) => {
  const { apiPost } = useApis()
  const { t } = useTranslation()
  content = formatContent(content)

  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [wrongPassword, setWrongPassword] = useState({ value: '', text: '' })

  useEffect(() => {
    setPassword('')
  }, [show])

  const handleConfirm = () => {
    setLoading(true)
    apiPost(apiUrls.cards(), { password }, ({ id, text, status }) => {
      setLoading(false)
      if (status) {
        onClose?.()
        onSuccess?.()
      } else if (id === '10') {
        setWrongPassword({ value: password, text })
      }
    })
  }

  let invalid = validatePassword().test(password) ? '' : t('password_format_is_incorrect')
  if (wrongPassword.value && wrongPassword.value === password) invalid = wrongPassword.text
  const error = password ? invalid : ''

  return (
    <Dialog open={show} fullWidth maxWidth="xs" className="Modal">
      <DialogTitle style={{ textAlign: 'center' }}>{title}</DialogTitle>
      <DialogContent style={{ fontWeight: 500, textAlign: 'center' }}>
        {content}
        <div style={{ width: 0, height: 0, overflow: 'hidden' }}>
          <input autoComplete="password" />
        </div>

        <Input
          value={password}
          autoComplete="password"
          type="password"
          label="Password"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && password && !invalid) handleConfirm()
          }}
          onChange={(e) => {
            if (e.target.value === '' || !e.target.value.includes(' ')) setPassword(e.target.value)
          }}
          error={error}
          style={{ marginTop: 24 }}
          disabled={loading}
          errorFocused={password === wrongPassword.value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          loading={loading}
          disabled={!!invalid}
          style={{ width: 64 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ModalConfirmPassword
