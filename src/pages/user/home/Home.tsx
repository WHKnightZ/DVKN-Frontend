import { Card } from '@mui/material'
import { Button } from 'components'
import { apiUrls } from 'configs/apis'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApis } from 'services/api'
import { useAuth } from 'store/auth'

const Home: React.FC = () => {
  const { apiGet, apiPost } = useApis()
  const { signOut } = useAuth()
  const history = useHistory()

  const [users, setUsers] = useState<{ username: string; avatar: string }[]>([])

  useEffect(() => {
    apiGet(apiUrls.users(), {}, ({ status, data }) => {
      if (status) setUsers(data.items)
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
      <div style={{ margin: '40px 20px' }}>
        <Button variant="contained" onClick={() => signOut()}>
          Thoát
        </Button>
      </div>
      <div className="row" style={{ maxWidth: 840, margin: '0 auto' }}>
        {users.map(({ username, avatar }) => (
          <div key={username} className="mb-2 col-4">
            <Card className="d-f">
              <div className="d-f fd-c ai-c" style={{ marginRight: 12 }}>
                <img alt="" src={avatar} style={{ width: 80, height: 109, marginBottom: 8 }} />
                <div style={{ fontSize: 13.5 }}>{username}</div>
              </div>

              <Button variant="outlined" style={{ height: 28 }} onClick={() => attack(username)}>
                Đánh
              </Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
