import { Table, TableHead, TableBody, TableCell, TableRow, Button, TableContainer, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";

import { useDeleteExpenseMutation, useLazyDownloadExpensesQuery, useGetExpensesQuery } from "../../api/ExpenseAPI"
import CustomPaper from "../../customComponents/CustomPaper";
import Toast from "../../customComponents/Toast";

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Amount', field: 'amount' },
  { label: 'Description', field: 'description' },
  { label: 'Category', field: 'category' },
]

const ExpenseTable = ({ setShowExpenseTable }) => {
  const { isPremiumUser } = useSelector((state) => state.user)

  const { data: expenses = [] } = useGetExpensesQuery()
  const [deleteExpense] = useDeleteExpenseMutation()
  const [downloadExpenses, { isSuccess, isError }] = useLazyDownloadExpensesQuery()

  if (expenses?.response?.length === 0) {
    return <h1 className="text-center font-bold">No Expenses Found!!</h1>
  }

  const deleteExpenseHandler = async (expense) => {
    try {
      await deleteExpense(expense)
    } catch (err) {
      console.log('Failed to delete expense!!', err)
    }
  }

  const downloadExpensesHandler = async () => {
    try {
      const response = await downloadExpenses()
      if (response.isSuccess) {
        let a = document.createElement('a')
        a.href = response.data.fileUrl
        a.download = 'myexpenses.csv'
        a.click()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const displayExpenseRows = expenses?.response?.map((expense, index) => {
    return (
      <TableRow key={`expense-${index}`}>
        {headers.map((header, idx) => (
          header.field === 's.no'
            ? <TableCell key={'row'} align="center">{index + 1}</TableCell>
            : <TableCell key={`row-${idx}`} align="center">{expense[header.field]}</TableCell>
        ))}
        <TableCell align="center">
          <DeleteIcon
            className='cursor-pointer text-red-500 hover:text-red-600'
            onClick={() => deleteExpenseHandler(expense)}
          />
        </TableCell>
      </TableRow>
    )
  })

  return (
    <CustomPaper className='flex flex-col gap-6'>
      <div className="flex justify-between">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 15, sm: 15, md: 20, lg: 20 },
          }}
          variant="h6"
          color='blue'
        >
          Expense Table
        </Typography>
        <Button
          variant="outlined"
          className="self-end"
          disabled={!isPremiumUser}
          onClick={downloadExpensesHandler}
        >
          Download
        </Button>
      </div>
      <TableContainer className="flex flex-col justify-center gap-8">
        <Table
          stickyHeader
          aria-label="sticky table"
          className="border table-auto"
        >
          <TableHead className="uppercase" >
            <TableRow>
              {headers.map((header, idx) => (
                <TableCell
                  key={`header-${idx}`}
                  align="center"
                  style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
                >
                  {header.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayExpenseRows}
          </TableBody>
        </Table>
        <Button
          className='self-center'
          variant="outlined"
          onClick={() => setShowExpenseTable(false)}
        >
          Close
        </Button>
      </TableContainer>
      {(isError || isSuccess)
        &&
        <Toast
          message={`${isError ? 'Failed!!' : 'Successful!!'}`}
          severity={`${isError ? 'failed' : 'success'}`}
        />}
    </CustomPaper>
  )
}

export default ExpenseTable
