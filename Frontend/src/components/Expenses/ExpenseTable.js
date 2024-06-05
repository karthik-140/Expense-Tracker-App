import { Table, TableHead, TableBody, TableCell, TableRow, Button } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteExpenseMutation, useGetExpensesQuery } from "../../api/ExpenseAPI"
import { useGetLeaderboardQuery } from "../../api/PremiumAPI";
import CustomPaper from "../../customComponents/CustomPaper";

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Amount', field: 'amount' },
  { label: 'Description', field: 'description' },
  { label: 'Category', field: 'category' },
]

const ExpenseTable = ({ setShowExpenseTable }) => {

  const { data: expenses = [] } = useGetExpensesQuery()
  const [deleteExpense] = useDeleteExpenseMutation()
  const { refetch: refetchLeaderboard } = useGetLeaderboardQuery()

  if (expenses?.response?.length === 0) {
    return <h1 className="text-center font-bold">No Expenses Found!!</h1>
  }

  const deleteExpenseHandler = async (id) => {
    try {
      await deleteExpense(id)
      refetchLeaderboard()
    } catch (err) {
      console.log('Failed to delete expense!!', err)
    }
  }

  const displayExpenseRows = expenses?.response?.map((expense, index) => {
    return (
      <TableRow key={`expense-${index}`}>
        {headers.map((header,idx) => (
          header.field === 's.no'
          ? <TableCell key={'row'} align="center">{index + 1}</TableCell>
          : <TableCell key={`row-${idx}`} align="center">{expense[header.field]}</TableCell>
        ))}
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
    </CustomPaper>
  )
}

export default ExpenseTable
