import { Button } from 'components'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'store/auth'

const NavBtn = ({ title, onClick }: any) => {
  return (
    <div className="mr-2">
      <Button variant="contained" onClick={onClick}>
        {title}
      </Button>
    </div>
  )
}

const Header: React.FC = () => {
  const { signOut } = useAuth()
  const history = useHistory()

  return (
    <div className="d-f jc-sb w-100 mt-3 mb-3">
      <div className="d-f">
        <NavBtn title="Trang chủ" onClick={() => history.push('/')} />
        <NavBtn title="Làng chạ" onClick={() => history.push('/lang-cha')} />
        <NavBtn title="So tài" onClick={() => history.push('/so-tai')} />
        <NavBtn title="Thẻ bài" onClick={() => history.push('/the-bai')} />
      </div>
      <Button variant="text" onClick={() => signOut()}>
        Thoát
      </Button>
    </div>
  )
}

export default Header
