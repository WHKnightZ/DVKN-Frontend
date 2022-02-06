/* eslint-disable */
import { Button } from 'components'
import { apiUrls } from 'configs/apis'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useApis } from 'services/api'
import { useToasts } from 'store/toasts'
import { CardType } from 'types'
import './index.scss'

const CardDetail: React.FC = () => {
  const { apiGet, apiPut } = useApis()
  const { createToast } = useToasts()
  const { state } = useLocation()
  const history = useHistory()
  const id = state as string

  const [card, setCard] = useState<CardType>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!state) {
      history.push('/')
      return
    }

    apiGet(apiUrls.cards(id), {}, ({ status, data }) => {
      if (status) {
        setCard(data)
      }
    })
  }, [])

  const upgrade = () => {
    setLoading(true)
    apiPut(apiUrls.upgradeCard(id), {}, ({ status, text, data }) => {
      setLoading(false)
      createToast({ message: { content: text }, type: status })
      if (status) {
        setCard((card) => ({ ...card, ...data }))
      }
    })
  }

  const { thumbnail, level, attack, defend, army } = card || {}

  return (
    <div className="CardDetail">
      <h2 className="mb-2">Thông tin Thẻ bài</h2>
      <div className="d-f fd-c ai-c">
        <img className="mb-4" alt="" src={thumbnail} />

        <div className="mb-4">Bản test: Mỗi 3 cấp tăng 1 sao, cấp tối đa 15</div>

        <div className="mb-4">
          Cấp: {level} <br />
          Công: {attack}
          <br />
          Thủ: {defend}
          <br />
          Lính: {army}
        </div>

        <Button
          variant="contained"
          onClick={upgrade}
          loading={loading}
          style={{ width: 80, height: 36 }}
        >
          Lên cấp
        </Button>
      </div>
    </div>
  )
}

export default CardDetail
