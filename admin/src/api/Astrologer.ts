/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from 'axios'
const url = import.meta.env.VITE_API_URL
const initialState: AstrologerInitialState = {
    newApplication: []
}
export const GetNewApplication = createAsyncThunk<{ success: true, astrologer: Astrologer[] } | ErrorResponse, string | void>(
    'GetNewApplication',
    async (statusQuery) => {
        try {
            const urlString = statusQuery ? `${url}astro/adminGetAstrologers?status=${statusQuery}` : `${url}astro/adminGetAstrologers`;
            const response = await axios.get(urlString)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

export const AdminAstrologerStatus = createAsyncThunk<{ success: true } | ErrorResponse, { _id: string, status: boolean | string }>(
    'AdminAstrologerStatus',
    async (body) => {
        try {
            const response = await axios.patch(`${url}astro/adminAstrologerStatus`, body)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

export const GetProfileDrafts = createAsyncThunk<{ success: true, drafts: any[] } | ErrorResponse>(
    'GetProfileDrafts',
    async () => {
        try {
            const response = await axios.get(`${url}astro/admin/profile-drafts`)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)

export const ReviewProfileDraft = createAsyncThunk<{ success: true } | ErrorResponse, { draftId: string, action: 'approve' | 'reject', rejectionReason?: string }>(
    'ReviewProfileDraft',
    async (body) => {
        try {
            const response = await axios.post(`${url}astro/admin/profile-drafts/review`, body)
            return response.data
        } catch (err: any) {
            return err.response.data
        }
    }
)


const astrologerSlice = createSlice({
    name: "astrologerSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetNewApplication.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.newApplication = payload.astrologer
            }
        })

    }

}
)
export default astrologerSlice.reducer