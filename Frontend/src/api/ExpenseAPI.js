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
      query: (expense) => ({
        url: `expense/${expense.id}`,
        method: 'DELETE',
        body: expense,
      }),
      invalidatesTags: ['Expenses', 'Leaderboard']
    }),
    getLeaderboard: builder.query({
      query: () => ({
        url: 'premium/leaderboard'
      }),
      providesTags: ['Leaderboard']
    })
  })
})

export const {
  useAddExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpenseMutation,
  useGetLeaderboardQuery,
} = expenseAPI
