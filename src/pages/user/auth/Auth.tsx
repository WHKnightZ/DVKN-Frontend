/* eslint-disable */
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik, Form, FormikProvider } from 'formik'
import { Stack } from '@mui/material'
import { Input, Button, Page } from 'components'
import { useTranslation } from 'react-i18next'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { useAuth } from 'store/auth'
import * as Yup from 'yup'

import './index.scss'

const validationSchema = Yup.object().shape({
  username: Yup.string().trim().required('Tài khoản không được để trống'),
  password: Yup.string().required('Mật khẩu không được để trống'),
})

interface Props {
  isSignUp?: boolean
}

const Auth: React.FC<Props> = ({ isSignUp }) => {
  const { updateAuth } = useAuth()
  const { t } = useTranslation()
  const { apiPost } = useApis()
  const history = useHistory()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ username, password }, { resetForm }) => {
      setLoading(true)
      apiPost(
        apiUrls[isSignUp ? 'signUp' : 'signIn'](),
        {
          username: username.trim(),
          password,
        },
        ({ status, data, text, id }) => {
          setLoading(false)
          if (status) {
            updateAuth(data)
            if (isSignUp) {
              history.push('/khoi-tao')
            } else {
              history.push(data.is_admin ? '/admin' : '/')
            }
          } else {
            if (id === '1') setError(text)
          }
        }
      )
    },
  })

  const { errors, handleSubmit, getFieldProps, handleChange, isSubmitting, touched } = formik

  const title = isSignUp ? 'Đăng ký' : 'Đăng nhập'

  return (
    <Page className="AuthLayout" title={title}>
      <div className="AuthLayout-wrapper">
        <div className="AuthLayout-card">
          <div className="AuthLayout-header">
            <h2 className="AuthLayout-title">{title}</h2>
          </div>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Stack spacing={3} mb={3}>
                <Input
                  fullWidth
                  size="medium"
                  autoComplete="username"
                  label="Tài khoản"
                  {...getFieldProps('username')}
                  onChange={(e) => {
                    if (error) setError('')
                    if (e.target.value === '' || !e.target.value.includes(' ')) handleChange(e)
                  }}
                  disabled={loading}
                  errorFocused={!!error}
                  maxLength={36}
                  error={error ? true : errors.username}
                  errorEmpty={isSubmitting || touched.username}
                />
                <Input
                  fullWidth
                  type="password"
                  size="medium"
                  autoComplete="password"
                  label="Mật khẩu"
                  {...getFieldProps('password')}
                  onChange={(e) => {
                    if (error) setError('')
                    handleChange(e)
                  }}
                  error={error || t(errors.password?.toString() || '')}
                  disabled={loading}
                  errorFocused={!!error}
                  errorEmpty={isSubmitting || touched.password}
                />
              </Stack>
              {!isSignUp && (
                <div className="AuthLayout-button-link">
                  <button type="button" className="btn-link" onClick={() => {}}>
                    {t('forgot_password')}
                  </button>
                </div>
              )}

              <Button
                loading={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={loading}
              >
                {title}
              </Button>
            </Form>
          </FormikProvider>
          <div style={{ fontSize: '13.5px', marginTop: 12 }}>
            {isSignUp ? 'Đã' : 'Chưa'} có tài khoản?
            <button
              className="btn-link ml-05"
              onClick={() => history.push(isSignUp ? '/dang-nhap' : '/dang-ky')}
            >
              {isSignUp ? 'Đăng nhập' : 'Đăng ký'}
            </button>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Auth
