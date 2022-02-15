import { CSSProperties } from 'react'

// For redux types
export type { RootState } from 'store'

export type ObjectType = { [key: string]: any }

export interface ActionType {
  type: string
  payload?: any
}

export type DispatchType = (action?: ActionType) => void

export type ModalConfirmType = {
  show?: boolean
  title: string
  content: any
  confirm?: { text: string; action: any }
  cancel?: { text: string; action: any }
  center?: boolean
  small?: boolean
}

export type ToastType = {
  message?: { title?: string; content?: string }
  type?: boolean
  duration?: number
}

export type AuthType = {
  username?: string
  access_token?: string
  refresh_token?: string
  card_images?: { id: string; image: string }[]
  is_admin?: boolean
  avatar?: string
  barrel?: number
  diamond?: number
  exp?: number
  gold?: number
  current_health?: number
  max_health?: number
  full_health_seconds?: number
  full_health_timestamp?: number
  level?: number
  total_battle?: number
  win_battle?: number
}

export type SelectType = { value: any; label: string }

export type RowType = {
  [key: string]: any
}

export type TableFieldsType = {
  [key: string]: {
    label?: string
    style?: CSSProperties
    bodyStyle?: CSSProperties
    className?: string
    type?: 'date' | 'avatar' | 'text' | 'image' | 'actions' | 'image-ver'
    renderContent?: (item: any) => any
    disableMaxLine?: boolean
    maxLine?: number
    defaultTitle?: boolean
    sort?: 'asc' | 'desc'
    actions?: {
      icon: string
      action: (item: any) => any
      disabled?: boolean
      hidden?: boolean
      title?: string
    }[]
  }
}

export type TableDataType<Type> = {
  items: Type[]
  loading: boolean
  total: number
}

export type ModalType = {
  type: 'create' | 'update'
  show: boolean
  initialValues: any
}

export type CategoryType = {
  id: string
  count: number
  created_date: number
  type_key: 'top_topic' | null
  name: string
  total_article: number
}

export type AccountType = {
  username?: string
  card_images?: { id: string; image: string }[]
  is_admin?: boolean
  avatar?: string
  barrel?: number
  diamond?: number
  exp?: number
  gold?: number
  health?: number
  level?: number
  total_battle?: number
  win_battle?: number
}

export type CardType = {
  id: string
  name: string
  type: any
  element: any
  thumbnail: any
  imgThumbnail: HTMLImageElement | null
  probability_register: any
  description: string
  attack: any
  defend: any
  army: any
  level?: any
  is_in_deck?: boolean
  captain_skill?: string
  specific_skill?: string
}
