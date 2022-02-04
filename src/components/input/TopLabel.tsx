import React from 'react'

interface Props {
  label?: string
  required?: boolean
  disabled?: boolean
}

const TopLabel: React.FC<Props> = ({ label, required, disabled }) => {
  if (!label) return null

  return (
    <div className={`top-label${disabled ? ' disabled' : ''}`}>
      {label}{' '}
      {required && (
        <>
          (<span style={{ color: 'var(--cl-error)' }}>*</span>)
        </>
      )}
    </div>
  )
}

export default TopLabel
