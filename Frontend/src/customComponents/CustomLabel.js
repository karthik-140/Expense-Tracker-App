import { styled, InputLabel } from '@mui/material'

const CustomLabel = styled(InputLabel)(({ theme }) => ({
  '&.MuiInputLabel-root': {
    color: theme.palette.primary.main
  }
}))

export default CustomLabel
