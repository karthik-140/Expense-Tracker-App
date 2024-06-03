import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const token = localStorage.getItem('token')
const getToken = () => localStorage.getItem('token')

export const expenseAPI = createApi({
  reducerPath: 'expenseAPI',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001/',
    // prepareHeaders: (headers) => {
    //   const token = getToken()
    //   if (token) {
    //     headers.set('Authorization', token)
    //   }
    //   return headers
    // }
   }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'user/signup',
        method: 'POST',
        body: data
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: data
      })
    }),
    getExpenses: builder.query({
      query: () => ({
        url: 'expense',
        headers: { 'Authorization': getToken() },
      }),
      providesTags: ['Expenses']
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: 'expense/addExpense',
        method: 'POST',
        body: data,
        headers: { 'Authorization': getToken() },
      }),
      invalidatesTags: ['Expenses']
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expense/${id}`,
        method: 'DELETE',
        headers: { 'Authorization': getToken() },
      }),
      invalidatesTags: ['Expenses']
    }),
  })
})

export const {
  useSignupMutation,
  useLoginMutation,
  useAddExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpenseMutation,
} = expenseAPI
