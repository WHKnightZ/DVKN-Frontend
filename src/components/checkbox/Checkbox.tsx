import React from 'react'
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material'
import './index.scss'

interface Props extends CheckboxProps {
  label?: string
}

const Checkbox: React.FC<Props> = ({ label, disabled, ...rest }) => {
  return (
    <div className={`Checkbox${disabled ? ' disabled' : ''}`}>
      <MuiCheckbox disabled={disabled} {...rest} />
      {!!label && <span>{label}</span>}
    </div>
  )
}

export default Checkbox
