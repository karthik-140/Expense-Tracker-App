import React from 'react'
import { Button } from '@mui/material'

const CustomButton = ({ actionText, onClick, variant, children, className }) => {
  return (
    <Button className={className} onClick={onClick} variant={variant}>
      {children}
      {actionText}
    </Button>
  )
}

export default CustomButton
