import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: { isPremiumUser: false },
  reducers: {
    setPremiumUser(state, action) {
      state.isPremiumUser = action.payload
    }
  }
})

export const userActions = userSlice.actions
export default userSlice
