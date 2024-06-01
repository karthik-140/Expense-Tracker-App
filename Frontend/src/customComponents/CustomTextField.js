import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form'
import CustomLabel from './CustomLabel';

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: 5,
    },
    '&:hover fieldset': {
      borderColor: error
        ? theme.palette.error.light
        : theme.palette.primary.light,
    },
    '&.Mui-focused fieldset': {
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.primary.main,
    },
  },
}))

const CustomTextField = ({
  name, control, defaultValue, sx, type, placeholder, variant, className, label, isRequired
}) => {
  return (
    <div className='flex flex-col'>
      <CustomLabel>
        {label}
        {isRequired && <span className='text-red-500'> *</span>}
      </CustomLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({
          field: { ref, onChange, value },
          fieldState: { error }
        }) => (
          <StyledTextField
            sx={sx}
            placeholder={placeholder}
            type={type}
            variant={variant}
            inputRef={ref}
            onChange={onChange}
            value={value}
            helperText={error ? error.message : null}
            error={!!error}
            className={className}
          // inputProps={{
          // 	'data-testid': `${name}-text-field`,
          // }}
          />
        )}
      />
    </div>
  )
}

export default CustomTextField
