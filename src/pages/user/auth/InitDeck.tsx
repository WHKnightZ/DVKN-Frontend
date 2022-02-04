/* eslint-disable */
import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useFormik, Form, FormikProvider } from 'formik'
import { Stack, Button as MuiButton } from '@mui/material'
import { Input, Button, Page } from 'components'
import { useTranslation } from 'react-i18next'
import { validateTypingNumber } from 'utils'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { useAuth } from 'store/auth'

import './index.scss'

const InitDeck: React.FC = () => {
  const { card_images = [] } = useAuth()
  const { t } = useTranslation()
  const history = useHistory()

  const title = 'Bộ bài'

  return (
    <Page title={title} className="mt-4">
      <div className="AuthLayout-wrapper big">
        <div className="AuthLayout-card">
          <div className="AuthLayout-header">
            <h2 className="AuthLayout-title">{title}</h2>
          </div>
          <div className="d-f fw-w jc-c mb-2">
            {card_images.map(({ id, image }) => (
              <div key={id} style={{ padding: 8 }}>
                <img style={{ borderRadius: '8px' }} alt="" src={image} />
              </div>
            ))}
          </div>
          <Button
            style={{ padding: '0 20px' }}
            variant="contained"
            onClick={() => history.push('/')}
          >
            Chơi ngay
          </Button>
        </div>
      </div>
    </Page>
  )
}

export default InitDeck
