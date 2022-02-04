import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useCallback, useState } from 'react'
import TopLabel from './TopLabel'
import './index.scss'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  label?: string
  error?: any
  variant?: 'outlined' | 'standard' | 'filled'
  errorFocused?: boolean
  blurWhenEnter?: boolean
  size?: 'small' | 'medium' | any
  topLabel?: string
  inputRef?: React.Ref<any>
  errorEmpty?: boolean
  [key: string]: any
}

const Input: React.FC<Props> = (props) => {
  const [isFocusing, setIsFocusing] = useState(false)

  const {
    fullWidth = true,
    type = 'text',
    name = '',
    label = '',
    error,
    value,
    onFocus,
    onBlur,
    variant = 'outlined',
    errorFocused,
    onKeyDown,
    blurWhenEnter,
    maxLength,
    inputProps,
    InputProps,
    size = 'small',
    topLabel,
    required,
    placeholder,
    disabled,
    errorEmpty,
    ...rest
  } = props as any

  const isSmall = size === 'small'
  const isPassword = type === 'password'

  const [passwordShown, setPasswordShown] = useState(!isPassword)

  /**
   * When input is focus, save status focus to this field name
   */
  const handleFocus = useCallback((e: any) => {
    setIsFocusing(true)
    onFocus?.(e)
  }, [])

  /**
   * Reset status focus when blur field
   */
  const handleBlur = useCallback((e: any) => {
    setIsFocusing(false)
    onBlur?.(e)
  }, [])

  const invalid = (errorEmpty ? true : !!value) && (!isFocusing || errorFocused) && !!error

  const adornmentPassword = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={() => (isPassword ? setPasswordShown(!passwordShown) : {})} edge="end">
          <i
            style={isSmall ? { fontSize: 20, width: 26 } : { fontSize: 24, width: 32 }}
            className={`icon-password fas fa-eye${passwordShown ? '-slash' : ''}`}
          />
        </IconButton>
      </InputAdornment>
    ),
  }

  const helperText = invalid && error !== true ? error : undefined

  return (
    <div>
      <TopLabel label={topLabel} disabled={disabled} required={required} />
      <TextField
        {...rest}
        size={size}
        disabled={disabled}
        inputProps={inputProps || { maxLength: isPassword ? 16 : maxLength }}
        fullWidth={fullWidth}
        label={label || undefined}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder || topLabel}
        onKeyDown={(e) => {
          if (blurWhenEnter && e.key === 'Enter') setIsFocusing(false)
          onKeyDown?.(e)
        }}
        type={isPassword ? (passwordShown ? 'text' : 'password') : type}
        value={value}
        InputProps={isPassword ? adornmentPassword : InputProps}
        error={invalid}
        helperText={helperText}
        variant={variant}
        required={required}
      />
    </div>
  )
}

export default Input
