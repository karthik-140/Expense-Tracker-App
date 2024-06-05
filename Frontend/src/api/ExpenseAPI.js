import { createApi } from '@reduxjs/toolkit/query/react'

import CustomFetchBaseQuery from './CustomFetchBaseQuery'

export const expenseAPI = createApi({
  reducerPath: 'expenseAPI',
  baseQuery: CustomFetchBaseQuery,
  tagTypes: ['Expenses', 'Leaderboard'],
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => ({
        url: 'expense',
      }),
      providesTags: ['Expenses']
    }),
    addExpense: builder.mutation({
      query: (data) => ({
        url: 'expense/addExpense',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Expenses', 'Leaderboard']
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `expense/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expenses', 'Leaderboard']
    }),
  })
})

export const {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpenseMutation,
} = expenseAPI
