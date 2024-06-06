import { Box, Button, Modal } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"

import CustomTextField from "../../customComponents/CustomTextField"
import { forgotPasswordSchema } from "../../schemas/signupSchema"
import { useForgotPasswordMutation } from "../../api/UserAPI";

const ForgotPassword = ({ modalOpen, modalCloseHandler }) => {

  const { control, handleSubmit } = useForm(
    { resolver: yupResolver(forgotPasswordSchema) }
  )

  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      await forgotPassword(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Modal
      open={modalOpen}
      onClose={modalCloseHandler}
    >
      <Box
        className='w-1/2 flex flex-col border border-blue-600 rounded gap-4 absolute p-12 m-auto shadow-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 min-h-fit bg-slate-50'
      >
        <CloseIcon
          className="absolute right-4 top-4 text-gray-500 cursor-pointer"
          onClick={modalCloseHandler}
        />
        <CustomTextField
          name={'email'}
          label={'Enter your email'}
          control={control}
          isRequired
        />
        <Button className="self-center" variant="contained" onClick={handleSubmit(onSubmit)} >Submit</Button>
      </Box>
    </Modal>
  )
}

export default ForgotPassword
