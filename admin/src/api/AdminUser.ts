import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postApiCall, getApiCall, putApiCall, ErrorResponse } from "./index"
const initialState: AdminInitialState = {
    admins: [],
    auth: false,
}
export const LoginAdmin = createAsyncThunk<{ success: true, adminUser: User, token: string } | ErrorResponse, { email: string, password: string }>('LoginAdmin', (body) => postApiCall<{ success: true, adminUser: User, token: string }>('admin/login', body))
export const TokenLoginAdmin = createAsyncThunk<{ success: true, adminUser: User } | ErrorResponse, { token: string }>('TokenLoginAdmin', (body) => postApiCall<{ success: true, adminUser: User }>('admin/token', body))
export const GetAdminUsers = createAsyncThunk<{ success: true, adminUsers: User[] } | ErrorResponse>('GetAdminUsers', () => getApiCall<{ success: true, adminUsers: User[] }>('admin/users'))
export const AddAdminUsers = createAsyncThunk<{ success: true } | ErrorResponse, { name: string, email: string, password: string, role: string }>('AddAdminUsers', (body) => postApiCall<{ success: true }>('admin', body))
export const UpdateAdminUsers = createAsyncThunk<{ success: true, adminUsers: User[] } | ErrorResponse, { name: string, userId: string, email: string, password?: string, role: string }>('UpdateAdminUsers', (body) => putApiCall<{ success: true, adminUsers: User[] }>('admin', body))
const adminUserSlice = createSlice({
    name: "AdminUser",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(LoginAdmin.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.user = payload.adminUser
                state.auth = true
                localStorage.setItem('token', payload.token);
            }
        }).addCase(TokenLoginAdmin.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.user = payload.adminUser
                state.auth = true
            }
        }).addCase(GetAdminUsers.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.admins = payload.adminUsers
            }
        }).addCase(UpdateAdminUsers.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.admins = payload.adminUsers
            }
        })
    }

}
)
export default adminUserSlice.reducer
