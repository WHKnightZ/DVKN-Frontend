import { CardType, SelectType } from 'types'

export const CARD_ELEMENTS = {
  METAL: '0',
  WOOD: '1',
  EARTH: '2',
  WATER: '3',
  FIRE: '4',
}

const { METAL, WOOD, EARTH, WATER, FIRE } = CARD_ELEMENTS

export const mappingElements: any = {
  [METAL]: 'Kim',
  [WOOD]: 'Mộc',
  [EARTH]: 'Thổ',
  [WATER]: 'Thủy',
  [FIRE]: 'Hỏa',
}

export const listElements: SelectType[] = Object.keys(mappingElements).map((key) => ({
  value: key,
  label: mappingElements[key],
}))

export const CARD_TYPES = {
  CIVILIAN: '0',
  WORKER: '1',
  DIGNITARY: '2',
  DIVINE: '3',
  WILD: '4',
  INVADER: '5',
  DEMON: '6',
}

const { CIVILIAN, WORKER, DIGNITARY, DIVINE, WILD, INVADER, DEMON } = CARD_TYPES

export const mappingTypes: any = {
  [CIVILIAN]: 'Dân thường',
  [WORKER]: 'Sản xuất',
  [DIGNITARY]: 'Chức sắc',
  [DIVINE]: 'Thần tộc',
  [WILD]: 'Hoang dã',
  [INVADER]: 'Giặc',
  [DEMON]: 'Ma tộc',
}

export const listTypes: SelectType[] = Object.keys(mappingTypes).map((key) => ({
  value: key,
  label: mappingTypes[key],
}))

export const defaultInitialValues: CardType = {
  id: '',
  name: '',
  type: CIVILIAN,
  element: METAL,
  thumbnail: '',
  imgThumbnail: null,
  probability_register: '100',
  description: '',
  attack: '50',
  defend: '50',
  army: '50',
}

export const defaultModal: {
  show: boolean
  type: string
  initialValues: CardType
} = { show: false, type: 'create', initialValues: defaultInitialValues }
