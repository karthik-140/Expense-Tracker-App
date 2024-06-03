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
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: data
      })
    }),
    getExpenses: builder.query({
      query: (filters) => ({
        url: 'expense',
        params: filters
      }),
      providesTags: ['Expenses']
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: 'expense/addExpense',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Expenses']
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expense/${id}`,
        method: 'DELETE',
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
