/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { SelectType } from 'types'
import { Card } from '@mui/material'
import { MAX_PAGE_SIZE } from 'configs/constants'
import { Button, Select } from 'components'

const listRanks = Array.from({ length: 5 }).map((_, index) => ({
  value: index,
  label: `${index + 1} ★`,
}))

interface Props {
  username: string
}

const AccountDetailAddCard: React.FC<Props> = ({ username }) => {
  const { apiGet, apiPost } = useApis()

  const [loading, setLoading] = useState(false)
  const [cards, setCards] = useState<SelectType[]>([])
  const [card, setCard] = useState('')
  const [rank, setRank] = useState('2')

  useEffect(() => {
    apiGet(apiUrls.adminCards(), { page_size: MAX_PAGE_SIZE }, ({ status, data }) => {
      if (status) {
        setCards(data.items.map((item: any) => ({ value: item.id, label: item.name })))
      }
    })
  }, [])

  const addCard = () => {
    if (!card) return

    setLoading(true)

    apiPost(
      apiUrls.adminAccountAddCard(username),
      { card_id: card, rank: Number(rank) },
      () => {
        setLoading(false)
      },
      true
    )
  }

  return (
    <Card>
      <h3 className="mb-2">Thêm lá bài cho người chơi</h3>
      <div className="mb-2">
        <Select label="Lá bài" data={cards} selected={card} setSelected={setCard} />
      </div>
      <div className="mb-2">
        <Select label="Cấp" data={listRanks} selected={rank} setSelected={setRank} />
      </div>
      <Button variant="contained" onClick={addCard} loading={loading}>
        Thêm
      </Button>
    </Card>
  )
}

export default AccountDetailAddCard
