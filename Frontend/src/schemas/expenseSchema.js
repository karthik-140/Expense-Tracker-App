import * as yup from "yup"

export const expenseSchema = yup
  .object({
    amount: yup
      .number()
      .typeError('Amount must be a number')
      .transform((value, amount) => (amount.trim() === "" ? null : value))
      .required('Amount is a required field')
      .positive('Amount should be a postive number')
      .integer('Amount should be an Integer'),
    description: yup
      .string()
      .required('Description is a required field')
      .matches(/^[a-zA-Z\s]+$/, 'Only Alphabets are allowed for this field'),
    category: yup
      .string()
      .required('Category is a required field')
  })
