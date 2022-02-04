import React from 'react'
import './Scrollbar.scss'

interface Props {
  className?: string
  [key: string]: any
}

const Scrollbar: React.FC<Props> = ({ children, className = '', ...rest }) => {
  return (
    <div {...rest} className={`Scrollbar ${className}`}>
      {children}
    </div>
  )
}

export default Scrollbar
