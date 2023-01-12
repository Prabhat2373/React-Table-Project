import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const UsersApi = createApi({
    reducerPath: 'UsersApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_ENVIROMENT === "developement" ? process.env.REACT_APP_DEV_BASE_URL : process.env.REACT_APP_BASE_URL_PROD }),
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
                url: "/user",
                body: args,
                method:"POST",
            })
        })
    }),
})

export const { useGetAllUsersQuery, useLazyGetExportCSVQuery,useCreateUserMutation } = UsersApi