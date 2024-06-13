import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from 'jwt-decode';

const getToken = () => localStorage.getItem('token')
const decodedToken = getToken() && jwtDecode(getToken())

const isPremiumUser = decodedToken?.isPremiumUser

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false, isPremiumUser: isPremiumUser },
  reducers: {
    setPremiumUser(state, action) {
      state.isPremiumUser = action.payload
    },
    setUserLogin(state, action) {
      state.isLoggedIn = action.payload
    },
  }
})

export const userActions = userSlice.actions
export default userSlice
