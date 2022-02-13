/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { AccountType } from 'types'
import { getWinRate } from 'utils'
import { Card } from '@mui/material'
import { DEFAULT_AVATAR } from 'configs/constants'

interface Props {
  username: string
}

const AccountDetailInfo: React.FC<Props> = ({ username }) => {
  const { apiGet } = useApis()

  const [data, setData] = useState<AccountType>({})

  const { avatar, level, exp, health, win_battle, total_battle, gold, diamond, barrel } = data

  useEffect(() => {
    apiGet(apiUrls.adminAccounts(username), {}, ({ status, data }) => {
      if (status) {
        setData(data)
      }
    })
  }, [])

  return (
    <Card>
      <h3 className="mb-2">Thông tin người chơi</h3>

      <div className="d-f">
        <div className="d-f fd-c ai-c">
          <img alt="" src={avatar || DEFAULT_AVATAR} />
          <div className="b" style={{ marginTop: 4 }}>
            <b>{username}</b>
          </div>
        </div>
        <div className="ml-1 p-1">
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
    </Card>
  )
}

export default AccountDetailInfo
