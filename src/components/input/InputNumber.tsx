import React, { useRef } from 'react'
import Input, { Props as InputProps } from './Input'

interface Props extends InputProps {
  min?: number
  max?: number
}

const InputNumber: React.FC<Props> = ({ min, max, onChange, onBlur, ...rest }) => {
  const ref = useRef<HTMLInputElement>()

  const handleBlur = (e: any) => {
    if (!onChange || !onBlur) return

    const value = ref.current?.value || ''
    let numberValue = Number(value)
    if (isNaN(numberValue)) numberValue = 0
    if (min && numberValue < min) numberValue = min
    if (max && numberValue > max) numberValue = max
    e.target.value = '' + numberValue
    onChange(e)
    onBlur(e)
  }

  return <Input inputRef={ref} {...rest} onBlur={handleBlur} onChange={onChange} />
}

export default InputNumber
