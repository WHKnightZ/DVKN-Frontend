import { Box } from '@mui/material'
import React from 'react'

const Title: React.FC = ({ children }) => {
  return (
    <Box mt={5.5} mb={2.5} ml={4}>
      <h2>{children}</h2>
    </Box>
  )
}

export default Title
