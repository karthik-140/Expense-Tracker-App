import { CircularProgress } from '@mui/material'

function CustomLoading() {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-400 bg-opacity-50">
      <div className="backdrop-filter backdrop-blur-lg">
        <CircularProgress color="primary" size={30} thickness={5} />
      </div>
    </div>
  )
}

export default CustomLoading
