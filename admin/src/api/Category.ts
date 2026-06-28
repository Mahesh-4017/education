/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
interface Category {
    _id: string
    name: string
}

interface CategoryInitialState {
    categories: Category[]
}

const url = import.meta.env.VITE_API_URL

const initialState: CategoryInitialState = {
    categories: [],
}
 

// ➕ Add Category
export const AddCategory = createAsyncThunk<
    { success: true } | ErrorResponse,
    { name: string }
>(
    "AddCategory",
    async (body) => {
        try {
            const response = await axios.post(`${url}category`, body)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

// 📥 Get Categories
export const GetCategories = createAsyncThunk<
    { success: true; categories: Category[] } | ErrorResponse
>(
    "GetCategories",
    async () => {
        try {
            const response = await axios.get(`${url}category`)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

// ✏️ Update Category
export const UpdateCategory = createAsyncThunk<
    { success: true } | ErrorResponse,
    { name: string; id: string }
>(
    "UpdateCategory",
    async (body) => {
        try {
            const response = await axios.put(`${url}category`, body)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)
export const DeleteCategory = createAsyncThunk<
    { success: true } | ErrorResponse,
    {  id: string}
>(
    "DeleteCategory",
    async ({id}) => {
        try {
            const response = await axios.delete(`${url}category?id=${id}`, )
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

const categorySlice = createSlice({
    name: "CategoryManager",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetCategories.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.categories = payload.categories
            }
        })
    },
})

export default categorySlice.reducer
