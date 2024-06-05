import { configureStore } from '@reduxjs/toolkit'

import { expenseAPI } from '../api/ExpenseAPI'
import { purchaseAPI } from '../api/PurchaseAPI'
import { userAPI } from '../api/UserAPI'
import { premiumAPI } from '../api/PremiumAPI'
import userSlice from './userSlice'
import expenseSlice from './expenseSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    expense: expenseSlice.reducer,
    [expenseAPI.reducerPath]: expenseAPI.reducer,
    [purchaseAPI.reducerPath]: purchaseAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [premiumAPI.reducerPath]: premiumAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      expenseAPI.middleware,
      purchaseAPI.middleware,
      userAPI.middleware,
      premiumAPI.middleware,
    )
})

export default store
