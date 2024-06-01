import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const expenseAPI = createApi({
  reducerPath: 'expenseAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'user/signup',
        method: 'POST',
        body: data
      }),
    })
  })
})

export const { useSignupMutation } = expenseAPI
