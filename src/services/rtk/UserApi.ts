import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const UsersApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://gorest.co.in/public/v2/" }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (id: number) => `/${id}`,
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: "users"
            })
        })
    }),
})

export const { useGetAllUsersQuery } = UsersApi