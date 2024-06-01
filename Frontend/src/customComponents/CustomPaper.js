import { Paper } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  // backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1rem 3rem rgba(0,0,0,.175)',
}))

function CustomPaper(props) {
  const { className, ...rest } = props
  return (
    <div className="flex justify-center max-w-full">
      <StyledPaper
        className={`${className} lg:w-7/12 rounded-lg lg:mx-20 mt-4 mb-20 md:mx-10 sm:mx-5 sm:w-3/4 w-10/12`}
        {...rest}
      />
    </div>
  )
}

export default CustomPaper

