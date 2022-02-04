import { Button, CircularProgress } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { randomId } from 'utils'
import { useUploadImage } from './utils'
import './index.scss'
import { MAX_ATTACHMENT_FILES, MAX_ATTACHMENT_SIZE } from 'configs/constants'

type ImageType = {
  id: string
  url: string
  loading: boolean
}

interface Props {
  prefix: string
  images: string
  onSuccess?: (url: string) => void
}

const arrayToImagesUrl = (array: ImageType[]) => {
  return array.map((item) => item.url).join(', ')
}

const imagesUrlToArray = (imagesUrl: string) => {
  return (imagesUrl || '')
    .split(',')
    .map((item) => ({ id: randomId(), url: item.trim(), loading: false }))
}

const UploadMultiImages: React.FC<Props> = ({ prefix, images: imagesDefault, onSuccess }) => {
  const inputRef = useRef<any>()
  const { upload, showPopupCantUpload } = useUploadImage()

  const [images, setImages] = useState<ImageType[]>([])

  useEffect(() => {
    if (imagesDefault.trim?.() === arrayToImagesUrl(images)) return

    const newImages = imagesUrlToArray(imagesDefault)
    setImages(newImages)
  }, [imagesDefault])

  const handleSuccess = useCallback(
    (url: string, id?: string) => {
      setImages((images) => {
        const index = images.findIndex((item) => item.id === id)
        if (index === -1) return images
        const newImages = [...images]
        newImages[index].url = url
        newImages[index].loading = false
        onSuccess?.(arrayToImagesUrl(newImages))
        return newImages
      })
    },
    [onSuccess]
  )

  const handleRemove = (id: string) => {
    setImages((images) => {
      const newImages = images.filter((item) => item.id !== id)
      onSuccess?.(arrayToImagesUrl(newImages))
      return newImages
    })
  }

  const handleError = (err: string, id?: string) => {
    handleRemove(id || '')
    console.log(err)
  }

  const handleUploadImages = useCallback((e: any) => {
    const files = e.target.files
    if (!files.length) return

    const newFiles = [...files]
    const filteredFiles = newFiles.filter((item) => item.size < MAX_ATTACHMENT_SIZE)
    if (filteredFiles.length < newFiles.length) showPopupCantUpload()

    setImages((images) => {
      const newImages = [
        ...images,
        ...filteredFiles.slice(0, MAX_ATTACHMENT_FILES - images.length).map((item: any) => {
          const id = randomId()
          upload({ file: item, prefix, onSuccess: handleSuccess, onError: handleError, id })
          return { id, url: URL.createObjectURL(item), loading: true }
        }),
      ]
      onSuccess?.(arrayToImagesUrl(newImages))
      return newImages
    })

    e.target.value = null
  }, [])

  return (
    <div className="UploadMultiImages">
      {images.length < MAX_ATTACHMENT_FILES && (
        <div className="UploadMultiImages-item" style={{ marginLeft: 2 }}>
          <div className="UploadImage">
            <Button
              onClick={() => inputRef.current?.click()}
              className={'UploadImage-btn'}
              variant="contained"
              color="primary"
            >
              <i className="fas fa-images" />
            </Button>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/x-png,image/jpeg"
              style={{ display: 'none' }}
              onChange={handleUploadImages}
            />
          </div>
        </div>
      )}
      {images.map((item) => (
        <div className="UploadMultiImages-item" key={item.id}>
          <div className="UploadImage">
            <div className="UploadImage-btn has-image">
              <div className="overlay">
                {item.loading ? (
                  <CircularProgress thickness={5} size={32} color="inherit" />
                ) : (
                  <div
                    className="remove"
                    onClick={() => handleRemove(item.id)}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <i className="mn-icon-x-circle" />
                  </div>
                )}
              </div>
              <img alt="" src={item.url} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UploadMultiImages
