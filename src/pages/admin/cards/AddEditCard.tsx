/* eslint-disable */
import { Card, InputAdornment } from '@mui/material'
import { Button, ChooseImage, Input, Select, Title } from 'components'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import {
  imgElements,
  imgFrame,
  imgStar,
  imgTypeFrame,
  isLoadedImages,
  mappingCardTypeImage,
} from './utils'
import { defaultInitialValues, listTypes, CARD_TYPES, listElements } from './constants'
import { convertToId } from 'utils'
import { uploadMultiFiles } from 'components/uploadImage/utils'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { CARD_WIDTH, CARD_HEIGHT, CARD_WIDTH2, CARD_HEIGHT2 } from 'configs/constants'
import * as Yup from 'yup'
import './index.scss'
import { useHistory, useParams } from 'react-router-dom'

let fileThumbnail: any

const drawCard = ({
  canvas,
  rank = 4,
  thumbnail,
  element = 0,
  type = CARD_TYPES.CIVILIAN,
}: {
  canvas: HTMLCanvasElement
  rank?: number
  thumbnail: HTMLImageElement | null
  element?: number
  type?: string
}) => {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, CARD_WIDTH2, CARD_HEIGHT2)
  ctx.drawImage(imgElements[element], 0, 0)
  thumbnail && ctx.drawImage(thumbnail, 17, 17, 275, 374)
  for (let i = 0; i <= rank; i += 1) {
    ctx.drawImage(imgStar, 94 + i * 32, 398)
  }
  ctx.drawImage(imgFrame, 0, 0)
  ctx.drawImage(mappingCardTypeImage[type], 13, 375)
  ctx.drawImage(imgTypeFrame, 9, 374)

  // ctx.font = '48px Card-Name'
  // ctx.fillStyle = '#fff'
  // ctx.textAlign = 'center'
  // ctx.fillText(name.toUpperCase(), centerX, 405)
}

let needUpload: boolean

const schema = (error: any) =>
  Yup.object().shape({
    name: Yup.string().trim().required('Tên lá bài không được để trống'),
    id: Yup.string().trim().required('Id không được để trống').notOneOf([error.value], error.text),
    thumbnail: Yup.string().required('Ảnh không được để trống'),
  })

interface Props {
  id?: string
}

const AddEditCard: React.FC<Props> = ({ id: cardId }) => {
  const { apiGet, request } = useApis()
  const history = useHistory()

  const [loaded, setLoaded] = useState(isLoadedImages)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ value: '', text: '' })

  const hasId = useRef(!!cardId)
  const nameRef = useRef<HTMLInputElement>()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    needUpload = !cardId

    let interval: any
    if (!loaded) {
      interval = setInterval(() => {
        if (isLoadedImages) {
          setLoaded(true)
          clearInterval(interval)
        }
      }, 100)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  const formik = useFormik({
    initialValues: defaultInitialValues,
    enableReinitialize: true,
    validationSchema: schema(error),
    onSubmit: (
      { name, id, type, element, description, attack, defend, army, probability_register },
      { validateForm }
    ) => {
      setLoading(true)

      element = Number(element)
      attack = Number(attack)
      defend = Number(defend)
      army = Number(army)
      probability_register = Number(probability_register)

      const canvas = document.createElement('canvas')
      canvas.width = CARD_WIDTH2
      canvas.height = CARD_HEIGHT2
      const canvasMini = document.createElement('canvas')
      canvasMini.width = CARD_WIDTH
      canvasMini.height = CARD_HEIGHT

      const ctx = canvasMini.getContext('2d')

      const done = () => {
        request(
          cardId ? 'put' : 'post',
          apiUrls.cards(cardId),
          {
            id: cardId ? undefined : id,
            name,
            description,
            type,
            element,
            attack,
            defend,
            army,
            probability_register,
          },
          ({ id: resId, status, text }) => {
            setLoading(false)
            if (status) {
              history.push('/admin/the-bai')
            } else {
              if (resId === '3') {
                setError({ value: id || '', text })
                validateForm()
              }
            }
          }
        )
      }

      if (!needUpload) {
        done()
        return
      }

      needUpload = false

      const images: any[] = []

      let countDone = 0
      const total = 5

      for (let rank = 0; rank < 5; rank += 1) {
        drawCard({ canvas, thumbnail: imgThumbnail, rank, type, element })
        ctx?.drawImage(canvas, 0, 0, CARD_WIDTH, CARD_HEIGHT)
        canvasMini.toBlob(
          (blob) => {
            const file = new File([blob as any], `${id}/${rank}.png`)
            images.push({ file, name: file.name })
            countDone += 1
            if (countDone === total) {
              images.push({ file: fileThumbnail, name: `${id}/thumbnail.png` })
              uploadMultiFiles({
                files: images,
                prefix: 'cards',
                onSuccess: done,
                contentType: 'image/png',
              })
            }
          },
          'image/png',
          0.85
        )
      }
    },
  })

  const {
    handleSubmit,
    getFieldProps,
    values,
    setFieldValue,
    setValues,
    handleChange,
    isSubmitting,
    touched,
    errors,
  } = formik

  const { name, type, thumbnail, imgThumbnail, element } = values

  useEffect(() => {
    if (cardId) {
      apiGet(apiUrls.cards(cardId), {}, ({ status, data }) => {
        if (status) {
          setValues({
            id: cardId,
            name: data.name,
            type: '' + data.type,
            element: '' + data.element,
            thumbnail: data.thumbnail,
            imgThumbnail: null,
            probability_register: '' + data.probability_register,
            description: data.description,
            attack: '' + data.attack,
            defend: '' + data.defend,
            army: '' + data.army,
          })
        }
      })
    }
  }, [cardId])

  useEffect(() => {
    if (!canvasRef.current || !loaded) return

    drawCard({ canvas: canvasRef.current, thumbnail: imgThumbnail, type, element })
  }, [canvasRef, loaded, type, imgThumbnail, element])

  useEffect(() => {
    if (!thumbnail) return

    const imgThumbnail = new Image()
    imgThumbnail.src = thumbnail
    imgThumbnail.onload = () => {
      setFieldValue('imgThumbnail', imgThumbnail)
    }
  }, [thumbnail])

  return (
    <>
      {!!cardId && <Title>Thẻ bài {name || cardId}</Title>}
      <FormikProvider value={formik}>
        <Form className="row pd-big" autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="col-8">
            <Card style={{ paddingBottom: 0 }}>
              <div className="row">
                <div className="col-6 form-stack">
                  <div className="form-title">Thông tin</div>
                  <Input
                    inputRef={nameRef}
                    label="Tên thẻ bài"
                    {...getFieldProps('name')}
                    onBlur={() => {
                      if (hasId.current) return
                      const value = nameRef.current?.value || ''
                      if (!value) return
                      setFieldValue('id', convertToId(value))
                      hasId.current = true
                    }}
                    disabled={loading}
                    maxLength={36}
                    error={errors.name}
                    errorEmpty={isSubmitting || touched.name}
                  />
                  <Input
                    label="ID thẻ bài"
                    {...getFieldProps('id')}
                    onChange={(e) => {
                      handleChange(e)
                      hasId.current = true
                    }}
                    maxLength={36}
                    error={errors.id}
                    errorEmpty={isSubmitting || touched.id}
                    errorFocused={!!error.value && values.id === error.value}
                    disabled={!!cardId}
                  />
                  <Select
                    fullWidth
                    label="Nhóm"
                    data={listTypes}
                    selected={type}
                    setSelected={(s) => {
                      needUpload = true
                      setFieldValue('type', s)
                    }}
                  />
                  <Select
                    fullWidth
                    label="Hệ"
                    data={listElements}
                    selected={element}
                    setSelected={(s) => {
                      needUpload = true
                      setFieldValue('element', s)
                    }}
                  />
                  <Input
                    label="Tỉ lệ xuất hiện"
                    {...getFieldProps('probability_register')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                  <Input label="Thông tin" rows={3} multiline {...getFieldProps('description')} />
                </div>
                <div className="col-6 d-f ai-c fd-c" style={{ marginBottom: 0 }}>
                  <div className="form-title">Ảnh thẻ bài</div>
                  <ChooseImage
                    image={thumbnail}
                    onChosen={(img, file) => {
                      fileThumbnail = file
                      needUpload = true
                      setFieldValue('thumbnail', img)
                    }}
                    className="AdminCards-chooseThumbnail"
                    error={(isSubmitting || touched.thumbnail) && (errors.thumbnail as any)}
                  />
                  <div className="form-title mt-2">Chỉ số</div>
                  <div className="row jc-c" style={{ width: '75%' }}>
                    <div className="col-6">
                      <Input label="Công" {...getFieldProps('attack')} />
                    </div>
                    <div className="col-6">
                      <Input label="Thủ" {...getFieldProps('defend')} />
                    </div>
                    <div className="col-6">
                      <Input label="Lính" {...getFieldProps('army')} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-title mt-1">Kỹ năng</div>
              <div className="row">
                <div className="col-6 form-stack">
                  <Input
                    label="Trưởng tài"
                    rows={3}
                    multiline
                    {...getFieldProps('primary_skill')}
                  />
                </div>
                <div className="col-6 form-stack">
                  <Input
                    label="Hiệu tài"
                    rows={3}
                    multiline
                    {...getFieldProps('secondary_skill')}
                  />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-4">
            <Card className="d-f ai-c jc-c">
              <canvas
                ref={canvasRef}
                width={CARD_WIDTH2}
                height={CARD_HEIGHT2}
                style={{ borderRadius: 8 }}
              />
            </Card>
            <div className="mt-3 d-f jc-c">
              <Button
                type="submit"
                variant="contained"
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  width: 160,
                  height: 38,
                }}
                loading={loading}
              >
                {cardId ? 'Sửa' : 'Thêm'} thẻ bài
              </Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </>
  )
}

export default AddEditCard
