import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const UsersApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8001/api/v1/" }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (id: number) => `/${id}`,
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "users"
            })
        }),
        getExportCSV: builder.query({
            query: () => ({
                url: "exportCSV",
                responseHandler: (response) => response.blob()
            })
        }),
        CreateUser: builder.mutation({
            query: (args) => ({
                url: "/user/:id",
                body: args
            })
        })
    }),
})

export const { useGetAllUsersQuery, useLazyGetExportCSVQuery } = UsersApi