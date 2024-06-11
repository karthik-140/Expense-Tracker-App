import { useState } from "react"
import { Button } from "@mui/material"
import { useSelector } from "react-redux"

import ExpenseForm from "../components/Expenses/ExpenseForm"
import ExpenseTable from "../components/Expenses/ExpenseTable"
import DowloadedFiles from "../components/Expenses/DowloadedFiles"

const Expenses = () => {
  const [showExpenseTable, setShowExpenseTable] = useState(false)
  const { isPremiumUser } = useSelector((state) => state.user)

  const showExpensesHandler = () => {
    setShowExpenseTable(true)
  }

  return (
    <>
      {showExpenseTable
        ?
        <>
          <ExpenseTable />
          {isPremiumUser && <DowloadedFiles />}
          <div className="flex justify-center gap-4 mb-20">
            <Button
              className='self-center'
              variant="outlined"
              onClick={() => setShowExpenseTable(false)}
            >
              Close
            </Button>
          </div>
        </>
        :
        <ExpenseForm showExpensesHandler={showExpensesHandler} />
      }
    </>
  )
}

export default Expenses