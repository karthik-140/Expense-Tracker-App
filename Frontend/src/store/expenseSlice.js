import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: 'expense',
  initialState: { showLeaderboard: false },
  reducers: {
    setShowLeaderboard(state, action) {
      state.showLeaderboard = action.payload
    }
  }
})

export const expenseActions = expenseSlice.actions
export default expenseSlice
