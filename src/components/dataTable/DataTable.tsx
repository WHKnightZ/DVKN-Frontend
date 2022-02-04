/* eslint-disable */

import {
  Card,
  TableContainer,
  Table as TableWrapper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Pagination,
  Box,
  Select,
  MenuItem,
  Stack,
} from '@mui/material'
import Scrollbar from '../scrollbar/Scrollbar'
import Button from '../button/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Row from './Row'
import './index.scss'
import { useState } from 'react'
import { RowType, TableFieldsType } from 'types'
import { addNumber } from 'utils'

interface Props {
  items: RowType[]
  fields: TableFieldsType
  loading?: boolean
  headerLeft?: React.ReactChild
  headerRight?: React.ReactChild
  createButton?: { text?: string; action?: () => void; disabled?: boolean }
  minWidth?: string | number
  pagination?: {
    total: number
    pageSize: number
    page: number
    onPageChange?: (page: number) => void
    onPageSizeChange?: (pageSize: number) => void
    hidePage?: boolean
  }
}

const DataTable: React.FC<Props> = ({
  items: oldItems,
  fields: oldFields,
  loading,
  headerLeft,
  headerRight,
  createButton,
  minWidth,
  pagination = {
    total: 0,
    pageSize: 0,
    page: 0,
    onPageChange: () => {},
    onPageSizeChange: () => {},
    hidePage: false,
  },
}) => {
  const { t } = useTranslation()
  const { total, page, onPageChange, pageSize, onPageSizeChange, hidePage } = pagination

  const [sort, setSort] = useState({ column: '', direction: 'asc' })

  // Add column no.
  const fields: TableFieldsType = {
    number: { style: { width: '6%', paddingLeft: 20 } },
    ...oldFields,
  }

  // Add data for column no.
  const items = oldItems.map((item: any, index: number) => addNumber(item, index, page, pageSize))

  const columns = Object.keys(fields).map((item) => ({
    key: item,
    label: fields[item].label,
    sort: fields[item].sort,
  }))

  const renderLoading = (
    <TableRow className={`DataTable-loading${items.length > 0 ? ' has-items' : ' no-items'}`}>
      <TableCell align="center" colSpan={columns.length}>
        <CircularProgress size={28} color="inherit" />
      </TableCell>
    </TableRow>
  )

  const rows = [5, 10, 15]

  const totalPages = Math.ceil(total / pageSize)

  const total2 = page * pageSize
  const first = (page - 1) * pageSize + 1
  const last = total2 < total ? total2 : total

  let newItems = items
  if (sort.column) {
    // Sort data
    newItems = newItems.sort((a, b) => {
      const key = sort.column
      const valueA = a[key]
      const valueB = b[key]
      const multiple = sort.direction === 'asc' ? 1 : -1
      return (valueA > valueB ? 1 : -1) * multiple
    })
  }

  const header = !!(headerLeft || headerRight || createButton)

  return (
    <Card className="DataTable" style={{ padding: '20px 0 24px' }}>
      {header && (
        <Stack className="DataTable-header" flexDirection="row" gap={3}>
          <div className="d-f jc-sb w-100">
            <div className="d-f ai-c space-2">{headerLeft}</div>
            <div className="d-f ai-c space-2-left">
              {headerRight}
              {createButton && (
                <Button
                  variant="contained"
                  size="small"
                  disabled={createButton.disabled}
                  onClick={createButton.action}
                >
                  <i className="fas fa-plus" />
                  {createButton.text}
                </Button>
              )}
            </div>
          </div>
        </Stack>
      )}
      <Scrollbar>
        <TableContainer sx={{ minWidth: minWidth || 1000 }}>
          <TableWrapper className="DataTable-table">
            <TableHead>
              <TableRow>
                {columns.map(({ key, label, sort: s }) => {
                  label = t(label || key)
                  const active = sort.column === key

                  return (
                    <TableCell key={key} style={fields[key].style}>
                      {!s ? (
                        label
                      ) : (
                        <div
                          className={`DataTable-table__sort-cell ${active ? sort.direction : s}${
                            active ? ' active' : ''
                          }`}
                          onClick={() =>
                            setSort({
                              column: key,
                              direction: active ? (sort.direction === 'asc' ? 'desc' : 'asc') : s,
                            })
                          }
                        >
                          {label}
                          <i className="fas fa-arrow-down" />
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
          </TableWrapper>
          <TableWrapper className="DataTable-table">
            <TableBody>
              {items.length > 0 ? (
                <>
                  {newItems.map((item, index) => (
                    <Row key={item.id || index} fields={fields} row={item} />
                  ))}
                  {loading && renderLoading}
                </>
              ) : !loading ? (
                <TableRow>
                  <TableCell align="center" colSpan={columns.length} sx={{ py: 5 }}>
                    Không có kết quả
                  </TableCell>
                </TableRow>
              ) : (
                renderLoading
              )}
            </TableBody>
          </TableWrapper>
        </TableContainer>
      </Scrollbar>

      {!hidePage && total > 0 && (
        <Box className="Pagination" pt={2.25}>
          {total > 1 && (
            <Pagination
              count={totalPages}
              color="primary"
              page={page}
              onChange={(_, page) => onPageChange?.(page)}
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={0}
              size="small"
              disabled={loading}
            />
          )}

          <Stack
            className={`Pagination-right${loading ? ' disabled' : ''}`}
            display="flex"
            flexDirection="row"
            alignItems="center"
            gap={2}
          >
            Số dòng mỗi trang
            <Select
              className="ChangePageSize"
              size="small"
              value={pageSize}
              onChange={(p) => onPageSizeChange?.(Number(p.target.value))}
              disabled={loading}
            >
              {rows.map((item) => (
                <MenuItem key={item} className="ChangePageSize-item" value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            <div>
              {first} - {last} trong số {total}
            </div>
          </Stack>
        </Box>
      )}
    </Card>
  )
}

export default DataTable
