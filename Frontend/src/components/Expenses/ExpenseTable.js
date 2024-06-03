import { Table, TableHead, TableBody, TableCell, TableRow, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteExpenseMutation, useGetExpensesQuery } from "../../store/ExpenseAPI"
import CustomPaper from "../../customComponents/CustomPaper";

const ExpenseTable = ({ setShowExpenseTable }) => {

  const { data: expenses = [] } = useGetExpensesQuery()
  const [deleteExpense] = useDeleteExpenseMutation()

  if (expenses?.response?.length === 0) {
    return <h1 className="text-center font-bold">No Expenses Found!!</h1>
  }

  const deleteExpenseHandler = (id) => {
    deleteExpense(id)
  }

  const displayExpenses = expenses?.response?.map((expense, idx) => {
    return (
      <TableRow key={`expense-${idx}`}>
        <TableCell align="center">{expense.amount}</TableCell>
        <TableCell align="center">{expense.description}</TableCell>
        <TableCell align="center">{expense.category}</TableCell>
        <TableCell align="center">
          <DeleteIcon
            className='cursor-pointer text-red-500 hover:text-red-600'
            onClick={() => deleteExpenseHandler(expense.id)}
          />
        </TableCell>
      </TableRow>
    )
  })

  return (
    <CustomPaper className='flex flex-col gap-8'>
      <Table
        stickyHeader
        aria-label="sticky table"
        className="border table-auto"
      >
        <TableHead className="uppercase" >
          <TableRow>
            <TableCell
              align="center"
              style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
            >
              Amount
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
            >
              Description
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
            >
              Category
            </TableCell>
            <TableCell
              align="center"
              style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayExpenses}
        </TableBody>
      </Table>
      <Button
        className='self-center'
        variant="outlined"
        onClick={() => setShowExpenseTable(false)}
      >
        Close
      </Button>
    </CustomPaper>
  )
}

export default ExpenseTable
