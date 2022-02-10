/* eslint-disable */
import { Card } from '@mui/material'
import { Button } from 'components'
import { apiUrls } from 'configs/apis'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApis } from 'services/api'
import { CardType } from 'types'
import './index.scss'

const Cards: React.FC = () => {
  const { apiGet } = useApis()
  const history = useHistory()

  const [cards, setCards] = useState<CardType[]>([])

  useEffect(() => {
    apiGet(apiUrls.cards(), { page: 1 }, ({ status, data }) => {
      if (status) {
        setCards(data.items)
      }
    })
  }, [])

  const renderAttribute = (icon: string, title: string, value: string) => {
    return (
      <div className="d-f ai-c" style={{ marginBottom: 3 }}>
        <i
          className={`d-f ai-c jc-c ${icon}`}
          style={{ color: '#666', marginRight: 8, width: 16, height: 16 }}
        />
        <span style={{ width: 58 }}>{title}</span>
        <span>{value}</span>
      </div>
    )
  }

  return (
    <div className="Cards">
      <h2 className="mb-2">Bộ bài</h2>
      <div className="row" style={{ justifyContent: 'center' }}>
        {cards.map(({ id, thumbnail, name, level, attack, defend, army }) => (
          <div key={id} className="col-6">
            <Card className="d-f">
              <img alt="" src={thumbnail} />
              <div className="ml-1 p-1">
                <div className="b mb-1">{name}</div>
                {renderAttribute('fas fa-star', 'Cấp', level)}
                {renderAttribute('fas fa-fire', 'Công', attack)}
                {renderAttribute('fas fa-shield-alt', 'Thủ', defend)}
                {renderAttribute('fas fa-user-friends', 'Lính', army)}
                <Button
                  variant="contained"
                  onClick={() => history.push('/the-bai/thong-tin', id)}
                  style={{ marginTop: 12, padding: '0 20px', height: 30 }}
                >
                  Chi tiết
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cards
