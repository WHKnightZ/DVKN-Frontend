import { SelectType } from 'types'

export const ACCOUNT_TYPES = {
  ALL_TYPES: '0',
  USER: '1',
  ADMIN: '2',
}

const { ALL_TYPES, USER, ADMIN } = ACCOUNT_TYPES

export const mappingTypes: any = {
  [ALL_TYPES]: 'Tất cả',
  [USER]: 'Người chơi',
  [ADMIN]: 'Quản trị viên',
}

export const listTypes: SelectType[] = Object.keys(mappingTypes).map((key) => ({
  value: key,
  label: mappingTypes[key],
}))
