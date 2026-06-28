import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postApiCall, getApiCall, putApiCall, deleteApiCall, ErrorResponse } from "./index"
const initialState: RoleInitialState & { permissions: string[] } = {
    roles: [],
    permissions: [],
}
export const AddRole = createAsyncThunk<{ success: true } | ErrorResponse, { name: string, permissions: string[] }>('AddRole', (body) => postApiCall<{ success: true }>('admin/role', body))
export const GetRoles = createAsyncThunk<{ success: true, roles: Role[] } | ErrorResponse>('GetRoles', () => getApiCall<{ success: true, roles: Role[] }>('admin/roles'))
export const UpdateRole = createAsyncThunk<{ success: true } | ErrorResponse, { name: string, permissions: string[], id: string }>('UpdateRole', (body) => putApiCall<{ success: true }>(`admin/role/${body.id}`, body))
export const DelRole = createAsyncThunk<{ success: true } | ErrorResponse, { id: string }>('DelRole', (body) => deleteApiCall<{ success: true }>(`admin/role/${body.id}`))
export const GetPermissions = createAsyncThunk<{ success: true, permissions: string[] } | ErrorResponse>('GetPermissions', () => getApiCall<{ success: true, permissions: string[] }>('admin/permissions'))

const adminUserSlice = createSlice({
    name: "RoleManager",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRoles.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.roles = payload.roles
            }
        }).addCase(GetPermissions.fulfilled, (state, { payload }) => {
            if (payload.success) {
                state.permissions = payload.permissions
            }
        })
    }

}
)
export default adminUserSlice.reducer
