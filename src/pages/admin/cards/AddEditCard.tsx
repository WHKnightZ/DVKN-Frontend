/* eslint-disable */
import { Card, InputAdornment } from '@mui/material'
import { Button, ChooseImage, Input, InputNumber, Select, Title } from 'components'
import { Form, FormikProvider, useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import {
  imgElements,
  imgFrame,
  imgInactiveStars,
  imgStar,
  imgTypeFrame,
  isLoadedImages,
  mappingCardTypeImage,
} from './utils'
import { defaultInitialValues, listTypes, CARD_TYPES, listElements } from './constants'
import { convertToId, resizeImage } from 'utils'
import { uploadMultiFiles } from 'components/uploadImage/utils'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { CARD_WIDTH, CARD_HEIGHT, CARD_WIDTH2, CARD_HEIGHT2 } from 'configs/constants'
import * as Yup from 'yup'
import './index.scss'
import { useHistory } from 'react-router-dom'
import defaultCardThumbnail from 'assets/images/default_card_thumbnail.jpg'

let fileThumbnail: any

const drawCard = ({
  canvas,
  rank = 2,
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

  const drawStar = (img: any, i: number) => ctx.drawImage(img, 94 + i * 33, 398)
  for (let i = 0; i <= rank; i += 1) drawStar(imgStar, i)
  for (let i = rank + 1; i <= 4; i += 1) drawStar(imgInactiveStars[element], i)

  ctx.drawImage(imgFrame, 0, 0)
  ctx.drawImage(mappingCardTypeImage[type], 13, 376)
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
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (
      {
        name,
        id,
        type,
        element,
        description,
        attack,
        defend,
        army,
        probability_register,
        captain_skill,
        specific_skill,
      },
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
          apiUrls.adminCards(cardId),
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
            captain_skill,
            specific_skill,
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
              const upload = () =>
                uploadMultiFiles({
                  files: images,
                  prefix: 'cards',
                  onSuccess: done,
                  contentType: 'image/png',
                })

              if (fileThumbnail)
                resizeImage(URL.createObjectURL(fileThumbnail), 275, 374, (file) => {
                  images.push({ file, name: `${id}/thumbnail.png` })
                  upload()
                })
              else upload()
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
    handleBlur,
  } = formik

  const { name, type, thumbnail, imgThumbnail, element } = values

  useEffect(() => {
    if (cardId) {
      apiGet(apiUrls.adminCards(cardId), {}, ({ status, data }) => {
        if (status) {
          setValues({
            ...data,
            id: cardId,
            type: '' + data.type,
            element: '' + data.element,
            imgThumbnail: null,
            probability_register: '' + data.probability_register,
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
    const imgThumbnail = new Image()
    imgThumbnail.setAttribute('crossorigin', 'anonymous')
    imgThumbnail.src = thumbnail || defaultCardThumbnail
    imgThumbnail.onload = () => {
      setFieldValue('imgThumbnail', imgThumbnail)
    }
  }, [thumbnail])

  const autoGenId = () => {
    if (hasId.current) return
    const value = nameRef.current?.value || ''
    if (!value) return
    setFieldValue('id', convertToId(value))
    hasId.current = true
  }

  return (
    <>
      <Title hasGoBack>{cardId ? `Thẻ bài ${name || cardId}` : 'Thêm Thẻ bài'}</Title>
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') autoGenId()
                    }}
                    onBlur={(e) => {
                      handleBlur(e)
                      autoGenId()
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
                    error={!values.id ? errors.id : ''}
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
                  <InputNumber
                    label="Tỉ lệ xuất hiện"
                    {...getFieldProps('probability_register')}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                    min={0}
                    max={100}
                  />
                  <Input
                    label="Thông tin"
                    rows={3}
                    multiline
                    maxLength={500}
                    {...getFieldProps('description')}
                  />
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
                      <InputNumber label="Công" {...getFieldProps('attack')} min={10} max={50} />
                    </div>
                    <div className="col-6">
                      <InputNumber label="Thủ" {...getFieldProps('defend')} min={10} max={50} />
                    </div>
                    <div className="col-6">
                      <InputNumber label="Lính" {...getFieldProps('army')} min={10} max={50} />
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
                    maxLength={500}
                    {...getFieldProps('captain_skill')}
                  />
                </div>
                <div className="col-6 form-stack">
                  <Input
                    label="Hiệu tài"
                    rows={3}
                    multiline
                    maxLength={500}
                    {...getFieldProps('specific_skill')}
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
