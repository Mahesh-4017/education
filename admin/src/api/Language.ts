/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

interface Language {
    _id: string
    name: string
}

interface LanguageInitialState {
    languages: Language[]
}

const url = import.meta.env.VITE_API_URL

const initialState: LanguageInitialState = {
    languages: [],
}

// ➕ Add Language
export const AddLanguage = createAsyncThunk<
    { success: true } | ErrorResponse,
    { name: string }
>(
    "AddLanguage",
    async (body) => {
        try {
            const response = await axios.post(`${url}language`, body)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

// 📥 Get Languages
export const GetLanguages = createAsyncThunk<
    { success: true; languages: Language[] } | ErrorResponse
>(
    "GetLanguages",
    async () => {
        try {
            const response = await axios.get(`${url}language`)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

// ✏️ Update Language
export const UpdateLanguage = createAsyncThunk<
    { success: true } | ErrorResponse,
    { name: string; id: string }
>(
    "UpdateLanguage",
    async (body) => {
        try {
            const response = await axios.put(`${url}language`, body)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

// 🗑️ Delete Language
export const DeleteLanguage = createAsyncThunk<
    { success: true } | ErrorResponse,
    { id: string }
>(
    "DeleteLanguage",
    async ({ id }) => {
        try {
            const response = await axios.delete(`${url}language?id=${id}`)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

const languageSlice = createSlice({
    name: "LanguageManager",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetLanguages.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.languages = payload.languages
            }
        })
    },
})

export default languageSlice.reducer
