import React, { useEffect, useRef, useState } from 'react'
import './Toast.scss'
import { SUCCESS } from 'configs/constants'

interface Props {
  type?: boolean
  message?: { title?: string; content?: string }
  duration?: number
  onClick?: (e: any) => void
  onClose?: any
}

const Toast: React.FC<Props> = ({ type = SUCCESS, message, duration = 1500, onClose }) => {
  const [state, setState] = useState<'' | 'slide-in' | 'fade-out'>('')
  const timeout = useRef<any>()
  const ref = useRef<any>()
  const { title = 'Information', content = 'This is a toast!' } = message || {}

  /**
   * Close the toast
   * @param {*} e click event
   */
  const close = (e?: any) => {
    // Prevent click parent when click close
    e?.stopPropagation()

    setState('')
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setState('fade-out')

      timeout.current = setTimeout(() => {
        onClose?.()
      }, 400)
    }, 400)
  }

  useEffect(() => {
    setTimeout(() => setState('slide-in'), 10)
    if (duration) {
      timeout.current = setTimeout(() => {
        close()
      }, duration)
    }
    return () => clearTimeout(timeout.current)
  }, [])

  const isFadeOut = state === 'fade-out'

  return (
    <div
      className={`toast ${state} ${type === SUCCESS ? 'success' : 'error'}`}
      ref={ref}
      style={{
        maxHeight: isFadeOut ? 0 : ref.current?.scrollHeight,
        marginBottom: isFadeOut ? 0 : 8,
        padding: isFadeOut ? 0 : 16,
      }}
    >
      <i className={`fas fa-${type === SUCCESS ? 'check' : 'exclamation'}-circle`} />
      <div>
        <p className="toast-title">{title}</p>
        <p className="label toast-content">{content}</p>
      </div>
    </div>
  )
}

export default Toast
