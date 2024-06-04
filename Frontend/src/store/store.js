import { configureStore } from '@reduxjs/toolkit'

import { expenseAPI } from './ExpenseAPI'
import { purchaseAPI } from '../api/PurchaseAPI'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [expenseAPI.reducerPath]: expenseAPI.reducer,
    [purchaseAPI.reducerPath]: purchaseAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expenseAPI.middleware,
      purchaseAPI.middleware,
    )
})

export default store
