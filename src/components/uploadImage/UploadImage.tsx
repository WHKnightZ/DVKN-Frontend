import { Button, CircularProgress } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './index.scss'
import { useUploadImage } from './utils'

const initialValues = { url: '', loading: false }

interface Props {
  prefix: string
  image: string
  onSuccess?: (url: string) => void
  onRemove?: () => void
  className?: string
  disabled?: boolean
}

const UploadImage: React.FC<Props> = ({
  prefix,
  image: imageDefault,
  onSuccess,
  onRemove,
  className = '',
  disabled,
}) => {
  const { upload, canUpload } = useUploadImage()

  const [image, setImage] = useState({ url: imageDefault, loading: false })
  const inputRef = useRef<any>()

  useEffect(() => {
    if (image.url !== imageDefault) setImage({ url: imageDefault, loading: false })
  }, [imageDefault])

  const handleSuccess = useCallback(
    (url: string) => {
      setImage({ url, loading: false })
      onSuccess?.(url)
    },
    [onSuccess]
  )

  const handleRemove = (e: any) => {
    e.stopPropagation()
    setImage(initialValues)
    onRemove?.()
  }

  const handleError = (err: string) => {
    setImage(initialValues)
    console.log(err)
  }

  const handleUploadImage = useCallback((e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (canUpload(file.size)) {
      setImage({ url: URL.createObjectURL(file), loading: true })

      upload({ file, prefix, onSuccess: handleSuccess, onError: handleError })
    }

    e.target.value = null
  }, [])

  const { url, loading } = image

  return (
    <div className={`UploadImage ${className}`}>
      <Button
        onClick={() => inputRef.current?.click()}
        className={`UploadImage-btn${url ? ' has-image' : ''}`}
        variant="contained"
        color="primary"
        disabled={loading || disabled}
      >
        {url && (
          <div className="overlay">
            {loading ? (
              <CircularProgress thickness={5} size={32} color="inherit" />
            ) : (
              !disabled && (
                <div
                  className="remove"
                  onClick={handleRemove}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-times-circle" />
                </div>
              )
            )}
          </div>
        )}
        {url ? <img alt="" src={url} /> : <i className="fas fa-image" />}
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/x-png,image/jpeg"
        style={{ display: 'none' }}
        onChange={handleUploadImage}
      />
    </div>
  )
}

export default UploadImage
