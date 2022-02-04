import { MAX_ATTACHMENT_SIZE } from 'configs/constants'
import { useMemo } from 'react'
import ApiRequest from 'services/api'
import { useModalConfirm } from 'store/modalConfirm'

export const uploadFile = ({
  file,
  prefix,
  onSuccess,
  onError,
  id,
  contentType,
}: {
  file: any
  prefix: string
  onSuccess?: (url: string, id?: string) => void
  onError?: (error: string, id?: string) => void
  id?: string
  contentType?: string
}) => {
  ApiRequest.get('/api/v1/upload', { prefix, file_name: file.name }, ({ status, data, text }) => {
    if (status) {
      const { file_link, upload_link } = data
      const myHeaders = new Headers()
      myHeaders.append('x-amz-acl', 'public-read')
      if (contentType) myHeaders.append('content-type', contentType)

      const requestOptions: any = {
        method: 'PUT',
        headers: myHeaders,
        body: file,
        redirect: 'follow',
      }

      fetch(upload_link, requestOptions)
        .then((response) => response.text())
        .then(() => {
          onSuccess?.(file_link || '', id)
        })
        .catch((error) => console.log('error', error))
    } else onError?.(text, id)
  })
}

export const uploadMultiFiles = ({
  files,
  prefix,
  onSuccess,
  contentType,
}: {
  files: { file: any; name: string }[]
  prefix: string
  onSuccess?: () => void
  contentType?: string
}) => {
  ApiRequest.post(
    '/api/v1/upload',
    { prefix, file_names: files.map(({ name }) => name) },
    ({ status, data }) => {
      if (status) {
        const myHeaders = new Headers()
        myHeaders.append('x-amz-acl', 'public-read')
        if (contentType) myHeaders.append('content-type', contentType)

        let done = 0
        const total = data.length
        data.forEach(({ upload_link }: any, index: number) => {
          const requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: files[index].file,
            redirect: 'follow',
          }

          fetch(upload_link, requestOptions)
            .then((response) => response.text())
            .then(() => {
              done += 1
              if (done === total) onSuccess?.()
            })
            .catch((error) => console.log('error', error))
        })
      }
    }
  )
}

export const useUploadImage = () => {
  const { showModalConfirm, hideModalConfirm } = useModalConfirm()

  const showPopupCantUpload = () =>
    showModalConfirm({
      title: 'Thông báo',
      content: 'Không thể upload file trên 50 MB',
      confirm: { action: hideModalConfirm, text: 'Đã hiểu' },
      small: true,
    })

  return useMemo(
    () => ({
      showPopupCantUpload,
      canUpload: (fileSize: number) => {
        if (fileSize > MAX_ATTACHMENT_SIZE) {
          showPopupCantUpload()
          return false
        }
        return true
      },
      upload: uploadFile,
    }),
    []
  )
}
