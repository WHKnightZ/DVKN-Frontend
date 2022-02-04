import React, { CSSProperties, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './index.scss'
import moment from 'moment'
import { TextField } from '@mui/material'
import TopLabel from '../input/TopLabel'

/* eslint-disable-next-line */
const CustomInput = forwardRef(
  (
    {
      onClick,
      fullWidth,
      date,
      format,
      label,
      handleClear,
      disabled,
      placeholder,
    }: {
      onClick?: any
      fullWidth?: boolean
      date?: any
      format?: any
      label?: string
      handleClear?: any
      disabled?: boolean
      placeholder?: string
    },
    ref: any
  ) => (
    <div
      className="TableSelect-readOnly"
      style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={onClick}
    >
      <TextField
        ref={ref}
        size="small"
        style={{ width: fullWidth ? undefined : 140 }}
        fullWidth={fullWidth}
        value={date ? moment(date).format(format || 'DD/MM/YYYY') : ''}
        label={label}
        placeholder={placeholder || 'dd/mm/yyyy'}
        InputProps={{
          readOnly: true,
        }}
        disabled={disabled}
      />
      {fullWidth ? (
        <i className="far fa-calendar" style={{ position: 'absolute', right: 16, fontSize: 16 }} />
      ) : (
        <i
          className="fas fa-times-circle"
          style={{ position: 'absolute', right: 12, fontSize: 14, color: '#aaa' }}
          onClick={handleClear}
        />
      )}
    </div>
  )
)

interface Props {
  fullWidth?: boolean
  minDate?: any
  maxDate?: any
  date?: Date | null
  setDate?: (date: Date | null) => void
  yearDropdownItemNumber?: number
  format?: string
  label?: string
  disabled?: boolean
  popperPlacement?: any
  style?: CSSProperties
  topLabel?: string
  required?: boolean
  placeholder?: string
}

const CustomDatePicker: React.FC<Props> = ({
  fullWidth,
  minDate,
  maxDate,
  date,
  setDate,
  yearDropdownItemNumber,
  format,
  label,
  disabled,
  popperPlacement,
  style,
  topLabel,
  required,
  placeholder,
}) => {
  const params = {
    minDate,
    maxDate,
    yearDropdownItemNumber,
    calendarStartDay: 1,
    disabled,
  }

  const handleClear = (e: any) => {
    e.stopPropagation()
    setDate?.(null)
  }

  const customInputParams = {
    fullWidth,
    date,
    format,
    label,
    handleClear,
    placeholder,
  }

  return (
    <div className="DatePicker" style={style}>
      <TopLabel label={topLabel} disabled={disabled} required={required} />
      <DatePicker
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
        selected={date}
        portalId="root-portal"
        popperPlacement={popperPlacement || 'bottom'}
        {...params}
        onChange={(date: any) => setDate?.(date)}
        customInput={<CustomInput {...customInputParams} />}
        disabled={disabled}
      />
    </div>
  )
}

export default CustomDatePicker
