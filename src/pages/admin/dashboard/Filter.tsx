/* eslint-disable */
import { Popover, Radio } from '@mui/material'
import { Button, MonthPicker } from 'components'
import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { FILTER_TYPES, listFilterTypes, mappingFilterType } from './constants'

import 'components/datePicker/index.scss'
import 'react-datepicker/dist/react-datepicker.css'

const { DATE } = FILTER_TYPES

interface Props {
  [key: string]: any
}

const Filter: React.FC<Props> = () => {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(DATE)
  const [dates, setDates] = useState<[any, any] | any>([null, null])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div className="DashboardFilter">
      <Button
        innerRef={anchorRef}
        className="ButtonFilter"
        variant="contained"
        onClick={handleOpen}
        color="info"
      >
        <i className="fas fa-filter" /> Filters
      </Button>
      <Popover
        className="MenuPopover"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1,
            width: 690,
            borderRadius: '4px',
            display: 'flex',
          },
        }}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 690 }}
      >
        <div className="DatePicker no-shadow">
          <DatePicker
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            portalId="root-portal"
            onChange={(dates) => setDates(dates)}
            inline
            monthsShown={2}
            selectsRange
            startDate={dates[0]}
            endDate={dates[1]}
            showMonthYearPicker
          />
          <MonthPicker />
        </div>
        <div className="DashboardFilter-filter">
          <div className="DashboardFilter-filterLabel dark w-100 ta-c">Filter</div>
          <div>
            {listFilterTypes.map((item) => (
              <div key={item}>
                <Radio checked={type === item} onChange={() => setType(item)} />{' '}
                {mappingFilterType[item]}
              </div>
            ))}
          </div>
        </div>
      </Popover>
    </div>
  )
}

export default Filter
