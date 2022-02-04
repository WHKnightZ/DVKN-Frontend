import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from 'store/auth'

const excepts = ['dang-nhap']

const SessionContainer: React.FC = () => {
  const { isAuth } = useAuth()
  const { pathname } = useLocation()
  const history = useHistory()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    if (!isAuth && !excepts.some((except) => pathname.includes(except))) history.push('/dang-nhap')
  }, [isAuth])

  return null
}

export default SessionContainer
