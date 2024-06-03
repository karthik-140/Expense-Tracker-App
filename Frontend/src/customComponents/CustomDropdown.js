import { styled } from '@mui/material/styles';
import { MenuItem, Select, FormControl, FormHelperText } from '@mui/material'
import { Controller } from 'react-hook-form'
import CustomLabel from './CustomLabel'

export const StyledDropdown = styled(Select)(({ theme }) => ({
  borderRadius: 2,
  minWidth: '12px',
  textTransform: 'capitalize',
  '&.Mui-focused': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.primary.dark,
  },
}))

function CustomDropdown({
  options,
  label,
  control,
  name,
  className,
  defaultChecked,
  disabled,
  helperText,
  sx,
  defaultValue,
  isRequired,
}) {
  const generateSingleOptions = () => {
    return options.map((option, index) => (
      <MenuItem key={index} value={option.value}>
        {option.label}
      </MenuItem>
    ))
  }

  return (
    <div className="flex flex-col">
      <CustomLabel htmlFor={name} className="mt-2 mb-1 capitalize">
        {label}
        {isRequired && <span className="text-red-700"> *</span>}
      </CustomLabel>
      <FormControl>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ''}
          render={({
            field: { ref, onChange, value },
            fieldState: { error },
          }) => (
            <>
              <StyledDropdown
                inputRef={ref}
                defaultChecked={defaultChecked}
                disabled={disabled}
                defaultValue={''}
                className={className}
                value={value}
                sx={sx}
                onChange={(e) => onChange(e.target.value)}
                error={!!error}
                data-testid={`${name}-select-field`}
              >
                {generateSingleOptions()}
              </StyledDropdown>
              {error && (
                <FormHelperText error={!!error}>
                  {error ? error.message : helperText}
                </FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>
    </div>
  )
}

export default CustomDropdown
