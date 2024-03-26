import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetKpisResponse,GetProductsResponse, GetTransactionsResponse } from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis","Products","Transactions"],
  endpoints: (build) => ({
                        //res , req 
    getKpis: build.query<Array<GetKpisResponse>,void>({
      query: () => "kpis/",
      providesTags: ["Kpis"]
    }),
    getProducts: build.query<Array<GetProductsResponse>,void>({
      query: () => "products/",
      providesTags: ["Products"]
    }),
    getTransactions: build.query<Array<GetTransactionsResponse>,void>({
      query: () => "transactions/",
      providesTags: ["Transactions"]
    })
  })
})

export const {useGetKpisQuery,useGetProductsQuery,useGetTransactionsQuery} = api;
