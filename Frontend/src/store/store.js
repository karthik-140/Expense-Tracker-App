import { configureStore } from '@reduxjs/toolkit'

import { expenseAPI } from '../api/ExpenseAPI'
import { purchaseAPI } from '../api/PurchaseAPI'
import { userAPI } from '../api/UserAPI'
import userSlice from './userSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [expenseAPI.reducerPath]: expenseAPI.reducer,
    [purchaseAPI.reducerPath]: purchaseAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expenseAPI.middleware,
      purchaseAPI.middleware,
      userAPI.middleware,
    )
})

export default store
