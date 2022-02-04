/* eslint-disable */
import { useHistory } from 'react-router-dom'
import { Button, Page } from 'components'
import { useAuth } from 'store/auth'

import './index.scss'

const InitDeck: React.FC = () => {
  const { card_images = [] } = useAuth()
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
