import * as yup from "yup"

export const signupSchema = yup
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

export const loginSchema = yup
  .object({
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

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is a required field')
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide valid email id'
      ),
  })

export const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required('New Password is a required field'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm New Password is a required field'),
  })
