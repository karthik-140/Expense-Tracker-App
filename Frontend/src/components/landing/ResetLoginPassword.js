import React from 'react'
import { Alert, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import CustomPaper from '../../customComponents/CustomPaper'
import CustomTextField from '../../customComponents/CustomTextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { resetPasswordSchema } from '../../schemas/signupSchema'
import { useResetPasswordMutation } from '../../api/UserAPI'

const ResetLoginPassword = () => {
  const { id } = useParams()

  const [resetPassword, { isSuccess, isError }] = useResetPasswordMutation()

  const { control, handleSubmit, reset } = useForm(
    { resolver: yupResolver(resetPasswordSchema) }
  )

  const onSubmit = async (data) => {
    try {
      await resetPassword({ data, id })
      reset()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <CustomPaper className='flex flex-col gap-4'>
      <Typography
        className='self-center'
        variant='h6'
        component='h2'
        color='blue'
      >
        Reset Password
      </Typography>
      {(isSuccess || isError) &&
        <Alert className='self-center' severity={`${isSuccess ? 'success' : 'error'}`}>
          {isSuccess
            ? 'Password changed successfully!!. Now login with your New Password.'
            : 'Bad request!!'
          }
        </Alert>}
      <CustomTextField
        name={'password'}
        label={'New Password'}
        control={control}
        isRequired
      />
      <CustomTextField
        name={'confirmPassword'}
        label={'Confirm New Password'}
        control={control}
        isRequired
      />
      <Button className='self-center' variant='contained' onClick={handleSubmit(onSubmit)} >Reset Password</Button>
    </CustomPaper>
  )
}

export default ResetLoginPassword
