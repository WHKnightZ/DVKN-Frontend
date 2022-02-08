import { Box } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
  hasGoBack?: boolean
}

const Title: React.FC<Props> = ({ hasGoBack, children }) => {
  const history = useHistory()

  return (
    <Box mt={5.5} mb={2.5} ml={2} className="d-f ai-c">
      {hasGoBack && (
        <div
          className="a"
          style={{ padding: '5px 4px 2px', margin: '0 10px 0 -4px', fontSize: 19 }}
          onClick={() => history.goBack()}
        >
          <i className="fas fa-chevron-left" />{' '}
        </div>
      )}
      <h2>{children}</h2>
    </Box>
  )
}

export default Title
