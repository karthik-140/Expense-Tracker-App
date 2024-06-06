import { Table, TableHead, TableBody, TableCell, TableRow, Button } from "@mui/material"
import { useDispatch } from "react-redux"

import CustomPaper from "../../customComponents/CustomPaper"
import { useGetLeaderboardQuery } from "../../api/ExpenseAPI"
import { expenseActions } from "../../store/expenseSlice"

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Name', field: 'name' },
  { label: 'Total Expense', field: 'totalExpenses' },
]

const Leaderboard = () => {
  const dispatch = useDispatch()
  const { data: leaderboard = [] } = useGetLeaderboardQuery()

  const leaderboardCloseHandler = () => {
    dispatch(expenseActions.setShowLeaderboard(false))
  }

  const displayLeaderboardRows = leaderboard?.map((user, index) => {
    return (
      <TableRow key={`expense-${index}`}>
        {headers.map((header, idx) => (
          header.field === 's.no'
            ? <TableCell key={'row'} align="center">{index + 1}</TableCell>
            : <TableCell key={`row-${idx}`} align="center">{user[header.field]}</TableCell>
        ))}
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
            {headers.map((header, idx) => {
              return (
                <TableCell
                  key={`header-${idx}`}
                  align="center"
                  style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
                >
                  {header.label}
                </TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {displayLeaderboardRows}
        </TableBody>
      </Table>
      <Button
        className='self-center'
        variant="outlined"
        onClick={leaderboardCloseHandler}
      >
        Close
      </Button>
    </CustomPaper>
  )
}

export default Leaderboard
