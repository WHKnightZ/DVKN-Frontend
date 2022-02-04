import { InputAdornment } from '@mui/material'
import { CSSProperties, useEffect, useRef, useState } from 'react'
import Input from './Input'

interface Props {
  style?: CSSProperties
  fullWidth?: boolean
  placeholder?: string
  onSearch?: (keyword: string) => void
  disabled?: boolean
  [key: string]: any
}

const InputSearch: React.FC<Props> = (props: any) => {
  const { onSearch = () => {}, placeholder = 'Tìm kiếm', ...rest } = props

  const searchEmpty = true
  const minLengthSearch = 0
  const timeoutSearch = 700
  const timeout = useRef<any>(0)

  const firstTime = useRef(false)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (firstTime.current) {
      if (timeout.current) clearTimeout(timeout.current)
      const trimmedKeyword: any = keyword?.trim()
      if (trimmedKeyword?.length >= minLengthSearch || searchEmpty) {
        timeout.current = setTimeout(() => {
          onSearch?.(trimmedKeyword)
        }, timeoutSearch)
      }
    } else firstTime.current = true
  }, [keyword])

  const handleChange = (e: any) => {
    const value = e.target.value
    setKeyword(value)
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (timeout.current) clearTimeout(timeout.current)
      const trimmedKeyword: any = keyword?.trim()
      if (trimmedKeyword?.length >= minLengthSearch || searchEmpty) {
        onSearch?.(trimmedKeyword)
      }
    }
  }

  return (
    <Input
      {...rest}
      className="InputSearch"
      value={keyword}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      maxLength={50}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <span className="icon-search" />
          </InputAdornment>
        ),
      }}
    />
  )
}

export default InputSearch
