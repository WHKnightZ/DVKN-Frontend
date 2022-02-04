import { Button, TableCell, TableRow } from '@mui/material'
import MaxLine from '../maxLine/MaxLine'
import { DEFAULT_AVATAR } from 'configs/constants'
import moment from 'moment'
import React from 'react'
import { RowType, TableFieldsType } from 'types'

interface Props {
  fields: TableFieldsType
  row: RowType
}

const Row: React.FC<Props> = ({ row, fields }) => {
  return (
    <TableRow>
      {Object.keys(fields).map((cell: string, index: number) => {
        const columnName = cell
        const field = fields[columnName]
        const newContent = row[columnName]

        const { style = {}, bodyStyle = {} } = field

        if (field.actions) field.type = 'actions'

        let newRenderContent
        switch (field.type) {
          case 'date':
            newRenderContent = !newContent ? '-' : moment(newContent * 1000).format('DD/MM/YYYY')
            break

          case 'avatar':
            newRenderContent = (
              <img alt="" src={newContent || DEFAULT_AVATAR} className="Row-avatar" />
            )
            break

          case 'image':
            newRenderContent = <img alt="" src={newContent} className="Row-image" />
            break

          case 'image-ver':
            newRenderContent = <img alt="" src={newContent} className="Row-image ver" />
            break

          case 'actions':
            newRenderContent = (
              <div className="Row-actions">
                {field.actions?.map((i) => (
                  <Button
                    style={{ visibility: i.hidden ? 'hidden' : 'visible' }}
                    disabled={i.disabled}
                    key={i.icon}
                    onClick={() => i.action(row)}
                    title={i.title}
                  >
                    <i className={`fas fa-${i.icon}`} />
                  </Button>
                ))}
              </div>
            )
            break

          default:
            if (field.renderContent) newRenderContent = field.renderContent(row)
            else newRenderContent = newContent
            break
        }

        return (
          <TableCell key={index} style={{ ...style, ...bodyStyle }}>
            {field.disableMaxLine ? (
              newRenderContent
            ) : (
              <MaxLine
                title={field.defaultTitle ? newContent : undefined}
                text={newRenderContent}
                numberOfLines={field.maxLine}
              />
            )}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default Row
