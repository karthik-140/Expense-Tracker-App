import { fetchBaseQuery } from "@reduxjs/toolkit/query"

const getToken = () => localStorage.getItem('token')

const CustomFetchBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/',
  prepareHeaders: (headers, { endpoint }) => {

    const excludedEndpoints = ['signup', 'login']

    if (!excludedEndpoints.includes(endpoint)) {
      const token = getToken()
      if (token) {
        headers.set('Authorization', token)
      }
    }
    return headers
  }
})

export default CustomFetchBaseQuery
