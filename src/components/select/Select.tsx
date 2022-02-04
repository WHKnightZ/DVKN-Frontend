import { InputAdornment, MenuItem, Popover, TextField } from '@mui/material'
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import TopLabel from '../input/TopLabel'
import { SelectType } from 'types'
import { isEqual } from 'lodash'

interface Props {
  selected?: string
  setSelected?: (selected: string) => void
  label?: string
  data?: SelectType[]
  onSearch?: (keyword: string) => void
  style?: CSSProperties
  topLabel?: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  [key: string]: any
}

const Select: React.FC<Props> = ({
  data = [],
  selected,
  setSelected,
  onSearch,
  style,
  topLabel,
  disabled,
  required,
  ...rest
}) => {
  const anchorRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  // const [search, setSearch] = useState('')

  const value = data.find((item) => isEqual(item.value, selected))?.label || ''

  const timeoutSearch = useRef<any>()

  // Open the menu if has data
  const handleOpen = () => {
    if (data.length) setOpen(true)
  }

  // Close the menu
  const handleClose = () => {
    setOpen(false)
  }

  // Search when click item, enter or after 1 second
  const handleSearch = (newValue?: string) => {
    if (!newValue) newValue = value
    onSearch?.(newValue)
  }

  // When click item, set selected item, set value in textbox and close menu
  const handleClickItem = (item: SelectType) => {
    setSelected?.(item.value)
    handleSearch(item.value)
    handleClose()
  }

  useEffect(() => {
    // If user not typing after 1s => search
    timeoutSearch.current = setTimeout(handleSearch, 1000)

    return () => clearTimeout(timeoutSearch.current)
  }, [value])

  return (
    <div style={style} className="TableSelect-readOnly">
      <TopLabel label={topLabel} disabled={disabled} required={required} />
      <TextField
        {...rest}
        disabled={disabled}
        size="small"
        ref={anchorRef}
        onClick={handleOpen}
        value={value}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <svg
                className={`TableSelect-arrow ${open && 'focus'}`}
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </InputAdornment>
          ),
        }}
      />
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: { width: anchorRef.current?.getBoundingClientRect().width || 0 },
        }}
        disableAutoFocus
        open={open}
        disableRestoreFocus
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >
        {data.map((item) => (
          <MenuItem
            className={`TableSelect-item${selected === item.value ? ' active' : ''}`}
            key={item.value}
            onClick={() => handleClickItem(item)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Popover>
    </div>
  )
}

export default Select
