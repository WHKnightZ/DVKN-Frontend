/* eslint-disable */
import React, { useState } from 'react'
import './index.scss'

import 'components/datePicker/index.scss'
import 'react-datepicker/dist/react-datepicker.css'

const mappingMonth: any = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec',
}

const months = Array.from({ length: 12 }).map((_, i) => ({
  value: i + 1,
  label: mappingMonth[i + 1],
}))

interface Props {
  [key: string]: any
}

const MonthPicker: React.FC<Props> = () => {
  const [start, setStart] = useState(null)

  return (
    <div className="MonthPicker">
      <div className="MonthPicker-wrapper">
        {months.map(({ label, value }) => (
          <div className="MonthPicker-month">{label}</div>
        ))}
      </div>
      <div className="MonthPicker-wrapper">
        {months.map(({ label, value }) => (
          <div className="MonthPicker-month">{label}</div>
        ))}
      </div>
    </div>
  )
}

export default MonthPicker
