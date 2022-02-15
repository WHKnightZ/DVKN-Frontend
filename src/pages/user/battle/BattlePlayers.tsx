import { Card } from '@mui/material'
import { Button, Pagination } from 'components'
import { apiUrls } from 'configs/apis'
import { DEFAULT_USER_PAGE_SIZE } from 'configs/constants'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApis } from 'services/api'
import { getWinRate } from 'utils'

const BattlePlayers: React.FC = () => {
  const { apiGet, apiPost } = useApis()
  const history = useHistory()

  const [data, setData] = useState<{
    items: {
      username: string
      avatar: string
      level: number
      win_battle: number
      total_battle: number
    }[]
    total: number
    loading: boolean
  }>({ items: [], total: 0, loading: true })
  const [page, setPage] = useState(1)

  const setLoading = (loading: boolean) => setData((data) => ({ ...data, loading }))

  useEffect(() => {
    setLoading(true)
    apiGet(
      apiUrls.battlePlayers(),
      { page, page_size: DEFAULT_USER_PAGE_SIZE },
      ({ status, data }) => {
        if (status) setData(data)
      }
    )
  }, [page])

  const attack = (username: string) => {
    setLoading(true)
    apiPost(
      apiUrls.battle(),
      {
        username,
      },
      ({ status, data }) => {
        setLoading(false)
        if (status) {
          localStorage.setItem('check-refresh', 'ok')
          history.push('/chien-dau', data)
        }
      },
      true
    )
  }

  const { items, total, loading } = data

  return (
    <div>
      <h2 className="mb-2">So tài</h2>
      <div className="row">
        {items.map(({ username, avatar, level, win_battle, total_battle }) => (
          <div key={username} className="mb-2 col-4">
            <Card className="d-f">
              <img alt="" src={avatar} style={{ width: 80, height: 116, marginBottom: 8 }} />

              <div className="ml-2">
                <div className="b" style={{ fontSize: 15, marginBottom: 4 }}>
                  {username}
                </div>
                <div style={{ fontSize: 13.5, marginBottom: 3 }}>Cấp {level}</div>
                <div style={{ fontSize: 13.5, marginBottom: 8 }}>
                  Thắng {getWinRate(win_battle, total_battle)} %
                </div>
                <Button
                  variant="outlined"
                  style={{ height: 24 }}
                  onClick={() => attack(username)}
                  disabled={loading}
                >
                  Đánh
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="d-f jc-c mb-2">
        <Pagination
          page={page}
          total={total}
          pageSize={DEFAULT_USER_PAGE_SIZE}
          onChange={(page) => setPage(page)}
        />
      </div>
    </div>
  )
}

export default BattlePlayers
