import React from 'react';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import { Typography, Box, Container } from '@material-ui/core';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function Navigator() {
  const location = useLocation()

  return (
    <Container style={{ 'paddingTop': '20px' }}>
      <Typography component='h2'>
        <Box fontWeight="fontWeightBold" textAlign='left' style={{ 'display': 'flex' }}>
          <Link to='/' className='router-link'>Dashboard</Link>
          {location.currency ? <ChevronRightRoundedIcon /> : ''}
          {location.currency?.symbol}
        </Box>
      </Typography>
    </Container>
  )
}