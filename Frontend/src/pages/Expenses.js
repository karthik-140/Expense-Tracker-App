import { useState } from "react"

import ExpenseForm from "../components/Expenses/ExpenseForm"
import ExpenseTable from "../components/Expenses/ExpenseTable"
import DowloadedFiles from "../components/Expenses/DowloadedFiles"

const Expenses = () => {
  const [showExpenseTable, setShowExpenseTable] = useState(false)

  const showExpensesHandler = () => {
    setShowExpenseTable(true)
  }

  return (
    <>
      <ExpenseForm
        showExpensesHandler={showExpensesHandler}
      />
      {showExpenseTable &&
        <>
          <ExpenseTable setShowExpenseTable={setShowExpenseTable} />
          <DowloadedFiles />
        </>
      }
    </>
  )
}

export default Expenses