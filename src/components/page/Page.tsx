import React, { useEffect } from 'react'

interface Props {
  title?: string
  className?: string
}

const Page: React.FC<Props> = ({ title = '', children, className = '' }) => {
  useEffect(() => {
    document.title = `Đại Việt Kỳ Nhân${title ? ` - ${title}` : ''}`
  }, [])

  return <div className={className}>{children}</div>
}

export default Page
