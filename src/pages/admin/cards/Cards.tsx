/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { DEFAULT_PAGE_SIZE } from 'configs/constants'
import { DataTable } from 'components'
import { CardType, TableDataType, TableFieldsType } from 'types'
import InputSearch from 'components/input/InputSearch'
import { useModalConfirm } from 'store/modalConfirm'
import { mappingElements, mappingTypes } from './constants'
import { useHistory } from 'react-router-dom'

const Cards: React.FC = () => {
  const { apiGet, apiDelete } = useApis()
  const { showModalConfirm, hideModalConfirm } = useModalConfirm()
  const history = useHistory()

  const [data, setData] = useState<TableDataType<CardType>>({
    items: [],
    loading: true,
    total: 0,
  })

  const page = useRef(1)
  const [keyword, setKeyword] = useState('')
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE)

  const setLoading = (loading: boolean) => setData((data) => ({ ...data, loading }))

  const getItems = useCallback(() => {
    setLoading(true)
    apiGet(
      apiUrls.cards(),
      {
        page: page.current,
        page_size: pageSize,
        keyword,
      },
      ({ status, data }) => {
        if (status) setData({ ...data, loading: false })
        else setLoading(false)
      }
    )
  }, [keyword, pageSize])

  const deleteItem = useCallback(
    (id: string) => {
      setLoading(true)
      apiDelete(apiUrls.cards(id), {}, ({ status }) => {
        if (status) {
          getItems()
        } else setLoading(false)
      })
    },
    [getItems]
  )

  // Define all columns of table
  const fields: TableFieldsType = {
    id: { label: 'Id', style: { width: '18%' }, maxLine: 1 },
    name: { label: 'Tên', style: { width: '22%' }, maxLine: 1 },
    thumbnail: { label: 'Ảnh', style: { width: '16%' }, type: 'image-ver' },
    type: {
      label: 'Nhóm',
      style: { width: '16%' },
      renderContent: ({ type }) => mappingTypes[type],
    },
    element: {
      label: 'Hệ',
      style: { width: '16%' },
      renderContent: ({ element }) => mappingElements[element],
    },
    actions: {
      style: { width: '12%' },
      actions: [
        {
          icon: 'pencil-alt',
          action: ({ id }) => history.push(`/admin/the-bai/${id}`),
          title: 'Sửa',
        },
        {
          icon: 'trash',
          action: ({ id, name }) =>
            showModalConfirm({
              title: 'Xóa Thẻ bài',
              content: `Bạn có muốn xóa thẻ bài *${name}* không?`,
              confirm: {
                action: () => {
                  hideModalConfirm()
                  deleteItem(id)
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
  }, [keyword, pageSize])

  const { items, loading, total } = data

  return (
    <div className="AdminCards">
      <DataTable
        items={items}
        fields={fields}
        loading={loading}
        createButton={{
          text: 'Thêm Thẻ bài',
          action: () => history.push('/admin/the-bai/them-moi'),
        }}
        headerLeft={
          <>
            <InputSearch
              style={{ minWidth: 120, width: 200 }}
              onSearch={(keyword) => setKeyword(keyword)}
              disabled={loading}
            />
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

export default Cards
