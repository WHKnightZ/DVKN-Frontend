/* eslint-disable */
import React from 'react'
import { useParams } from 'react-router-dom'
import AccountDetailAddCard from './AccountDetailAddCard'
import AccountDetailInfo from './AccountDetailInfo'

const AccountDetail: React.FC = () => {
  const { username } = useParams() || ({} as any)

  return (
    <div className="AdminAccountDetail row">
      <div className="col-6">
        <AccountDetailInfo username={username} />
      </div>
      <div className="col-6">
        <AccountDetailAddCard username={username} />
      </div>
    </div>
  )
}

export default AccountDetail
