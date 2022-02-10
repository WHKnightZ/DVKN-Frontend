import { Pagination as MuiPagination } from '@mui/material'
import { DEFAULT_PAGE_SIZE } from 'configs/constants'
import React from 'react'

interface Props {
  page: number
  pageSize: number
  total: number
  disabled?: boolean
  onChange: (page: number) => void
}

const Pagination: React.FC<Props> = ({ page, pageSize, total, disabled, onChange }) => {
  if (total === 0) return null

  const handleChange = (newPage: number) => {
    if (page === newPage) return

    window.scrollTo(0, 0)
    onChange(newPage)
  }

  const totalPages = Math.ceil(total / (pageSize || DEFAULT_PAGE_SIZE))

  return (
    <MuiPagination
      count={totalPages}
      color="primary"
      page={page}
      onChange={(_, page) => handleChange(page)}
      showFirstButton
      showLastButton
      siblingCount={1}
      boundaryCount={0}
      size="small"
      disabled={disabled}
    />
  )
}

export default Pagination
