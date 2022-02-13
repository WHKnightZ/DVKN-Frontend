/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { DEFAULT_PAGE_SIZE } from 'configs/constants'
import { DataTable, Select } from 'components'
import { AccountType, TableDataType, TableFieldsType } from 'types'
import { InputSearch } from 'components'
import { useModalConfirm } from 'store/modalConfirm'
import { useHistory } from 'react-router-dom'
import { getWinRate } from 'utils'
import { ACCOUNT_TYPES, listTypes } from './constants'

const Accounts: React.FC = () => {
  const { apiGet, apiDelete } = useApis()
  const { showModalConfirm, hideModalConfirm } = useModalConfirm()
  const history = useHistory()

  const [data, setData] = useState<TableDataType<AccountType>>({
    items: [],
    loading: true,
    total: 0,
  })

  const page = useRef(1)
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)
  const [type, setType] = useState(ACCOUNT_TYPES.ALL_TYPES)

  const setLoading = (loading: boolean) => setData((data) => ({ ...data, loading }))

  const getItems = useCallback(() => {
    setLoading(true)
    apiGet(
      apiUrls.adminAccounts(),
      {
        page: page.current,
        page_size: pageSize,
        keyword,
        type: type === ACCOUNT_TYPES.ALL_TYPES ? undefined : type,
      },
      ({ status, data }) => {
        if (status) setData({ ...data, loading: false })
        else setLoading(false)
      }
    )
  }, [keyword, pageSize, type])

  const deleteItem = useCallback(
    (id: string) => {
      setLoading(true)
      apiDelete(apiUrls.adminAccounts(id), {}, ({ status }) => {
        if (status) {
          getItems()
        } else setLoading(false)
      })
    },
    [getItems]
  )

  // Define all columns of table
  const fields: TableFieldsType = {
    username: { label: 'Tên', style: { width: '18%' }, maxLine: 1 },
    avatar: { label: 'Ảnh đại diện', style: { width: '22%' }, type: 'avatar' },
    level: { label: 'Cấp đội', style: { width: '12%' } },
    win_rate: {
      label: 'Tỉ lệ thắng',
      style: { width: '18%' },
      renderContent: ({ win_battle, total_battle }) =>
        `${getWinRate(win_battle, total_battle)}% (${win_battle}/${total_battle})`,
    },
    is_admin: {
      label: 'Là quản trị viên',
      style: { width: '14%' },
      renderContent: ({ is_admin }) =>
        is_admin ? (
          <i
            className="fas fa-check-circle"
            style={{ color: 'var(--cl-primary)', fontSize: 22, marginLeft: 18 }}
          />
        ) : undefined,
    },
    actions: {
      style: { width: '12%' },
      actions: [
        {
          icon: 'pencil-alt',
          action: ({ username }) => history.push(`/admin/tai-khoan/${username}`),
          title: 'Sửa',
        },
        {
          icon: 'trash',
          action: ({ username }) =>
            showModalConfirm({
              title: 'Xóa Tài khoản',
              content: `Bạn có muốn xóa tài khoản *${username}* không?`,
              confirm: {
                action: () => {
                  hideModalConfirm()
                  deleteItem(username)
                },
                text: 'Xóa',
              },
              cancel: { action: hideModalConfirm, text: 'Hủy' },
              center: true,
              small: true,
            }),
          title: 'Xóa',
        },
      ],
    },
  }

  // When click change page, set page to selected page
  const handleChangePage = (newPage: number) => {
    page.current = newPage
    getItems()
  }

  useEffect(() => {
    page.current = 1
    getItems()
  }, [getItems])

  const { items, loading, total } = data

  return (
    <div className="AdminAccounts">
      <DataTable
        items={items}
        fields={fields}
        loading={loading}
        createButton={{
          text: 'Thêm Quản trị viên',
          action: () => history.push('/admin/tai-khoan/them-moi'),
        }}
        headerLeft={
          <>
            <InputSearch
              style={{ minWidth: 120, width: 200 }}
              onSearch={(keyword) => setKeyword(keyword)}
              disabled={loading}
            />
            <Select label="Loại" data={listTypes} selected={type} setSelected={setType} />
          </>
        }
        pagination={{
          total,
          pageSize,
          page: page.current,
          onPageChange: handleChangePage,
          onPageSizeChange: setPageSize,
        }}
      />
    </div>
  )
}

export default Accounts
