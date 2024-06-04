import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const token = localStorage.getItem('token')
const getToken = () => localStorage.getItem('token')

export const purchaseAPI = createApi({
  reducerPath: 'purchaseAPI',
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
    getPremium: builder.query({
      query: () => ({
        url: 'purchase/premiumMembership',
        headers: { 'Authorization': getToken() }
      }),
    }),
    updateTransactionStatus: builder.mutation({
      query: (data) => ({
        url: 'purchase/updateTransactionStatus',
        method: 'POST',
        body: data,
        headers: { 'Authorization': getToken() }
      })
    })
  })
})

export const {
  useLazyGetPremiumQuery,
  useUpdateTransactionStatusMutation,
} = purchaseAPI;
