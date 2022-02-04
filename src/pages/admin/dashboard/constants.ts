export const FILTER_TYPES = {
  DATE: '0',
  MONTH: '1',
  YEAR: '2',
}

const { DATE, MONTH, YEAR } = FILTER_TYPES

export const listFilterTypes = Object.values(FILTER_TYPES)

export const mappingFilterType = {
  [DATE]: 'By date',
  [MONTH]: 'By month',
  [YEAR]: 'By year',
}
