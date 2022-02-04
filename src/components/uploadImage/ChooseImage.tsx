import { Button, FormHelperText } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './index.scss'

interface Props {
  image: string
  onChosen?: (url: string, file?: any) => void
  className?: string
  error?: string
}

const ChooseImage: React.FC<Props> = ({ image: imageDefault, onChosen, className = '', error }) => {
  const [image, setImage] = useState(imageDefault)
  const inputRef = useRef<any>()

  useEffect(() => {
    if (image !== imageDefault) setImage(imageDefault)
  }, [imageDefault])

  const handleUploadImage = useCallback((e: any) => {
    const file = e.target.files?.[0]
    if (!file) return

    const image = URL.createObjectURL(file)

    setImage(image)
    onChosen?.(image, file)

    e.target.value = null
  }, [])

  return (
    <div>
      <div className={`UploadImage ${className}`}>
        <Button
          onClick={() => inputRef.current?.click()}
          className={`UploadImage-btn${image ? ' has-image' : ''}`}
          variant="contained"
          color="primary"
        >
          {image ? <img alt="" src={image} /> : <i className="fas fa-image" />}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/x-png,image/jpeg"
          style={{ display: 'none' }}
          onChange={handleUploadImage}
        />
      </div>
      {!!error && (
        <FormHelperText error style={{ margin: '-12px 0 8px' }}>
          {error}
        </FormHelperText>
      )}
    </div>
  )
}

export default ChooseImage
