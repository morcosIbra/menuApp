import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Category } from '../../models/Categories';

export const categoryApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query() {
        return 'categories?_embed=items';
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Categories' as const,
                id
              })),
              { type: 'Categories', id: 'LIST' }
            ]
          : [{ type: 'Categories', id: 'LIST' }]
    }),
    getCategory: builder.query<Category, string>({
      query(id) {
        return `products/${id}`;
      },
      transformResponse: (response: { data: { product: Category } }, args, meta) =>
        response.data.product,
      providesTags: (result, error, id) => [{ type: 'Categories', id }]
    }),
    createCategory: builder.mutation({
      //builder.mutation({<Category, FormData>
      query(data) {
        return {
          url: 'categories',
          method: 'POST',
          credentials: 'include',
          body: data
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    updateCategory: builder.mutation({
      query({ id, formData }) {
        return {
          url: `categories/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: formData
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Categories', id },
              { type: 'Categories', id: 'LIST' }
            ]
          : [{ type: 'Categories', id: 'LIST' }]
      // transformResponse: (response: { data: { product: Category } }) => response.data.product
    }),
    deleteCategory: builder.mutation<null, string>({
      query(id) {
        return {
          url: `categories/${id}`,
          method: 'DELETE',
          credentials: 'include'
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    createCategoryItem: builder.mutation({
      //builder.mutation({<Category, FormData>
      query({ categoryId, categoryItemData }) {
        return {
          url: `categories/${categoryId}/items`,
          method: 'POST',
          credentials: 'include',
          body: categoryItemData
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    updateCategoryItem: builder.mutation({
      //builder.mutation<Category, { id: string; formData: FormData }>({
      query({ id, data }) {
        return {
          url: `items/${id}`,
          method: 'PATCH',
          credentials: 'include',
          body: data
        };
      },
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: 'Categories', id },
              { type: 'Categories', id: 'LIST' }
            ]
          : [{ type: 'Categories', id: 'LIST' }]
      // transformResponse: (response: { data: { product: Category } }) => response.data.product
    }),
    deleteCategoryItem: builder.mutation<null, string>({
      query(id) {
        return {
          url: `items/${id}`,
          method: 'DELETE',
          credentials: 'include'
        };
      },
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    })
  })
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useGetCategoriesQuery,
  usePrefetch,
  useCreateCategoryItemMutation,
  useUpdateCategoryItemMutation,
  useDeleteCategoryItemMutation
} = categoryApi;
