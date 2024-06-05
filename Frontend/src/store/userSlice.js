import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode';

const getToken = () => localStorage.getItem('token')
const decodedToken = jwtDecode(getToken())

const isPremiumUser = decodedToken.isPremiumUser

const userSlice = createSlice({
  name: 'user',
  initialState: { isPremiumUser: isPremiumUser },
  reducers: {
    setPremiumUser(state, action) {
      state.isPremiumUser = action.payload
    }
  }
})

export const userActions = userSlice.actions
export default userSlice
