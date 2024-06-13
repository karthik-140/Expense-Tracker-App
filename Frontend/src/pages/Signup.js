import React, { useEffect, useState } from 'react'
import CustomTextField from '../customComponents/CustomTextField'
import { useForm } from 'react-hook-form'
import CustomButton from '../customComponents/CustomButton'
import CustomPaper from '../customComponents/CustomPaper'
import { Link, Typography } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useSignupMutation, useLoginMutation } from '../api/UserAPI'
import CustomLoading from '../customComponents/CustomLoading'
import Toast from '../customComponents/Toast'
import { signupSchema, loginSchema } from '../schemas/signupSchema'
import { userActions } from '../store/userSlice'
import ForgotPassword from '../components/landing/ForgotPassword'

const Signup = () => {
  const [login, setLogin] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { control, handleSubmit, reset, register, unregister } = useForm({
    resolver: yupResolver(!login ? signupSchema : loginSchema)
  },)

  const [signupUser, {
    isSuccess: signupIsSuccess,
    isLoading: signupIsLoading,
    isError: signupIsError,
  }] = useSignupMutation()

  const [loginUser, {
    isSuccess: loginIsSuccess,
    isLoading: loginIsLoading,
    isError: loginIsError,
    error: loginError
  }] = useLoginMutation()

  useEffect(() => {
    if (login) {
      unregister('name')
    } else {
      register('name')
    }
  }, [login, register, unregister])

  const onSubmit = async (data) => {
    if (login) {
      const loginResponse = await loginUser(data)
      const token = loginResponse?.data?.token
      localStorage.setItem('token', token)
      const isPremiumUser = loginResponse?.data?.response?.isPremiumUser === true
      dispatch(userActions.setUserLogin(true))
      dispatch(userActions.setPremiumUser(isPremiumUser))
    } else {
      await signupUser(data)
      setLogin(true)
      reset()
    }
  }

  useEffect(() => {
    if (loginIsError) {
      setErrorMessage(loginError?.data?.message)
    }
  }, [loginIsError, loginError])

  useEffect(() => {
    if (loginIsSuccess) {
      navigate('/expense')
    }
  }, [loginIsSuccess, navigate])

  const loginHandler = () => {
    setLogin(!login)
  }

  const modalCloseHandler = () => {
    setForgotPassword(false)
  }

  return (
    <>
      {(signupIsLoading || loginIsLoading) && <CustomLoading />}
      {(signupIsError || signupIsSuccess || loginIsError || loginIsSuccess)
        &&
        <Toast
          message={`${(signupIsError || loginIsError) ? 'Failed!!' : 'Successful!!'}`}
          severity={`${(signupIsError || loginIsError) ? 'failed' : 'success'}`}
        />}
      <CustomPaper className='flex flex-col gap-4'>
        <Typography align='center' color='blue' variant='h5'>{login ? 'Login' : 'Signup'}</Typography>
        {(login && loginIsError) && <span className='self-center text-red-500'>{errorMessage}</span>}
        {!login && <CustomTextField
          className={'w-full'}
          name={'name'}
          label={'Name'}
          control={control}
          isRequired={true}
        />}
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
        <div className='self-center'>
          {login
            ?
            <div className='flex flex-col gap-2 items-center'>
              <Typography>Forgot password? <Link component={'button'} onClick={() => setForgotPassword(true)}>Click here</Link></Typography>
              <Typography>New user? <Link component={'button'} onClick={loginHandler}>Signup</Link></Typography>
            </div>
            :
            <Typography>Existing user? <Link component={'button'} onClick={loginHandler}>Login</Link></Typography>}
        </div>
        {forgotPassword && <ForgotPassword modalOpen={forgotPassword} modalCloseHandler={modalCloseHandler} />}
      </CustomPaper>
    </>
  )
}

export default Signup
