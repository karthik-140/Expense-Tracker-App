import { createApi } from '@reduxjs/toolkit/query/react'

import CustomFetchBaseQuery from './CustomFetchBaseQuery';

export const purchaseAPI = createApi({
  reducerPath: 'purchaseAPI',
  baseQuery: CustomFetchBaseQuery,
  endpoints: (builder) => ({
    getPremium: builder.query({
      query: () => ({
        url: 'purchase/premiumMembership',
      }),
    }),
    updateTransactionStatus: builder.mutation({
      query: (data) => ({
        url: 'purchase/updateTransactionStatus',
        method: 'POST',
        body: data,
      })
    })
  })
})

export const {
  useLazyGetPremiumQuery,
  useUpdateTransactionStatusMutation,
} = purchaseAPI;
