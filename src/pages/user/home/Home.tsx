/* eslint-disable */
import { Card } from '@mui/material'
import { Button } from 'components'
import { apiUrls } from 'configs/apis'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useApis } from 'services/api'
import { useAuth } from 'store/auth'
import { AuthType } from 'types'
import { getWinRate } from 'utils'
import './index.scss'

const Home: React.FC = () => {
  const { apiGet } = useApis()
  const {
    updateAuth,
    username,
    avatar,
    level,
    exp,
    health,
    win_battle,
    total_battle,
    gold,
    diamond,
    barrel,
  } = useAuth()
  const history = useHistory()

  useEffect(() => {
    apiGet(apiUrls.profile(), {}, ({ status, data }) => {
      if (status) {
        updateAuth(data)
      }
    })
  }, [])

  return (
    <div className="Home">
      <h2 className="mb-2">Trang cá nhân</h2>
      {!!avatar && (
        <div className="d-f">
          <div className="d-f fd-c ai-c">
            <img alt="" src={avatar} />
            <div className="b" style={{ marginTop: 4 }}>
              <button className="btn-link" onClick={() => {}}>
                Xem Đội hình
              </button>
            </div>
          </div>
          <div className="ml-1 p-1 Home-info">
            <div style={{ marginBottom: 6 }}>
              Xin chào: <b>{username}</b>
            </div>
            <div>Cấp đội: {level}</div>
            <div>Kinh nghiệm: {exp}</div>
            <div>
              Sức khỏe: {health}/{health}
            </div>
            <div>Vàng: {gold}</div>
            <div>Ngọc: {diamond}</div>
            <div>Vò rượu: {barrel}</div>
            <div>
              Thắng: {win_battle}/{total_battle} ({getWinRate(win_battle, total_battle)}%)
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
