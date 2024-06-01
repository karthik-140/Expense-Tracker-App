import React from 'react'
import CustomTextField from '../customComponents/CustomTextField'
import { useForm } from 'react-hook-form'
import CustomButton from '../customComponents/CustomButton'
import CustomPaper from '../customComponents/CustomPaper'
import { Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

import { useSignupMutation } from '../store/ExpenseAPI'
import CustomLoading from '../customComponents/CustomLoading'
import Toast from '../customComponents/Toast'

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is a required field')
      .matches(/^[a-zA-Z\s]+$/, 'Only Alphabets are allowed for this field'),
    email: yup
      .string()
      .required('Email is a required field')
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide valid email id'
      ),
    password: yup
      .string()
      .required('Password is a required field')
  })

const Signup = () => {
  const { control, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) })

  const [signup, { isSuccess, isLoading, isError }] = useSignupMutation()

  const onSubmit = (data) => {
    signup(data)
    reset()
  }
  return (
    <>
      {isLoading && <CustomLoading />}
      {isError && <Toast
        message={'Failed!!'}
        severity={'failed'}
      />}
      <CustomPaper className='flex flex-col gap-4'>
        <Typography align='center' color='blue' variant='h5'>Signup</Typography>
        <CustomTextField
          className={'w-full'}
          name={'name'}
          label={'Name'}
          control={control}
          isRequired={true}
        />
        <CustomTextField
          name={'email'}
          label={'Email'}
          control={control}
          isRequired={true}
        />
        <CustomTextField
          name={'password'}
          label={'Password'}
          control={control}
          isRequired={true}
        />
        <CustomButton
          className='self-center'
          actionText={'Submit'}
          variant={'contained'}
          onClick={handleSubmit(onSubmit)}
        />
      </CustomPaper>
    </>
  )
}

export default Signup
