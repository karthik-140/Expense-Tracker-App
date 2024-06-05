import { useForm } from "react-hook-form"
import { Button, Typography } from "@mui/material"
import { yupResolver } from "@hookform/resolvers/yup"

import { expenseSchema } from "../../schemas/expenseSchema"
import CustomPaper from "../../customComponents/CustomPaper"
import CustomTextField from "../../customComponents/CustomTextField"
import CustomDropdown from "../../customComponents/CustomDropdown"
import { useAddExpenseMutation } from "../../api/ExpenseAPI"
import Toast from '../../customComponents/Toast'
import CustomLoading from "../../customComponents/CustomLoading"

const categoryOptions = [
  { label: 'Travel', value: 'travel' },
  { label: 'Food', value: 'food' },
  { label: 'Movie', value: 'movie' },
  { label: 'Fuel', value: 'fuel' },
  { label: 'Rent', value: 'rent' },
  { label: 'Other Miscallaneous Expenses', value: 'other' }
]

const ExpenseForm = ({ showExpensesHandler }) => {

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(expenseSchema)
  })

  const [addExpense, { isError, isLoading, isSuccess }] = useAddExpenseMutation()

  const onSubmit = (expense) => {
    addExpense(expense)
    reset()
  }

  return (
    <CustomPaper className='flex flex-col gap-4'>
      {isLoading && <CustomLoading />}
      <Typography color={'blue'} align="center" component={'h6'} variant="h5">Add Expense</Typography>
      <CustomTextField
        name={'amount'}
        label={'Amount'}
        control={control}
      />
      <CustomTextField
        name={'description'}
        label={'Description'}
        control={control}
      />
      <CustomDropdown
        options={categoryOptions}
        name={'category'}
        label={'Category'}
        control={control}
      />
      <div className="flex gap-4 self-center">
        <Button variant="outlined" onClick={handleSubmit(onSubmit)}>Add Expense</Button>
        <Button variant="outlined" onClick={() => showExpensesHandler()}>View Expenses</Button>
      </div>
      {(isError || isSuccess)
        &&
        <Toast
          message={`${isError ? 'Failed!!' : 'Successful!!'}`}
          severity={`${isError ? 'failed' : 'success'}`}
        />}
    </CustomPaper>
  )
}

export default ExpenseForm
