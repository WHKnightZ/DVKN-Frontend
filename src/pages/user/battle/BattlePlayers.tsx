import { Card } from '@mui/material'
import { Button } from 'components'
import { apiUrls } from 'configs/apis'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApis } from 'services/api'
import { getWinRate } from 'utils'

const BattlePlayers: React.FC = () => {
  const { apiGet, apiPost } = useApis()
  const history = useHistory()

  const [players, setPlayers] = useState<
    { username: string; avatar: string; level: number; win_battle: number; total_battle: number }[]
  >([])

  useEffect(() => {
    apiGet(apiUrls.battlePlayers(), { page_size: 12 }, ({ status, data }) => {
      if (status) setPlayers(data.items)
    })
  }, [])

  const attack = (username: string) => {
    apiPost(
      apiUrls.battle(),
      {
        username,
      },
      ({ status, data }) => {
        if (status) {
          localStorage.setItem('check-refresh', 'ok')
          history.push('/chien-dau', data)
        }
      }
    )
  }

  return (
    <div>
      <h2 className="mb-2">So tài</h2>
      <div className="row">
        {players.map(({ username, avatar, level, win_battle, total_battle }) => (
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
                <Button variant="outlined" style={{ height: 24 }} onClick={() => attack(username)}>
                  Đánh
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BattlePlayers
