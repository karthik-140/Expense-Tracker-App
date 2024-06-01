import { configureStore } from '@reduxjs/toolkit'

import { expenseAPI } from './ExpenseAPI'

const store = configureStore({
  reducer: {
    [expenseAPI.reducerPath]: expenseAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(expenseAPI.middleware)
})

export default store
