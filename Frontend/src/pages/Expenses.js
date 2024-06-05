import { useState } from "react"
import { useSelector } from "react-redux"

import ExpenseForm from "../components/Expenses/ExpenseForm"
import ExpenseTable from "../components/Expenses/ExpenseTable"
import Leaderboard from "../components/Expenses/Leaderboard"

const Expenses = () => {
  const [showExpenseTable, setShowExpenseTable] = useState(false)

  const { showLeaderboard } = useSelector((state) => state.expense)

  const showExpensesHandler = () => {
    setShowExpenseTable(true)
  }

  return (
    <>
      {showLeaderboard
        ? <Leaderboard />
        : <>
          <ExpenseForm
            showExpensesHandler={showExpensesHandler}
          />
          {showExpenseTable &&
            <ExpenseTable
              setShowExpenseTable={setShowExpenseTable}
            />}
        </>
      }
    </>
  )
}

export default Expenses