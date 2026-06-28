/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const url = import.meta.env.VITE_API_URL

export type RechargeType = {
  _id: string
  price: number
  coin: number
  getCoin: number

  // new fields (not required in UI table)
  bonusCoin?: number
  discountPercent?: number
  startsAt?: string | null
  endsAt?: string | null
  isActive?: boolean
}

type RechargeBody = {
  price: number
  coin: number
  bonusCoin?: number
  discountPercent?: number
  startsAt?: string | null
  endsAt?: string | null
  validityDays?: number // optional helper (backend can convert to endsAt)
  isActive?: boolean
}

export const AddRecharge = createAsyncThunk<
  { success: true; message?: string } | ErrorResponse,
  RechargeBody
>("AddRecharge", async (body) => {
  try {
    const response = await axios.post(`${url}recharge`, body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
})

export const GetRecharge = createAsyncThunk<
  { success: true; recharge: RechargeType[] } | ErrorResponse
>("GetRecharge", async () => {
  try {
    const response = await axios.get(`${url}recharge`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
})

export const UpdateRecharge = createAsyncThunk<
  { success: true; message?: string } | ErrorResponse,
  RechargeBody & { id: string }
>("UpdateRecharge", async ({ id, ...body }) => {
  try {
    const response = await axios.patch(`${url}recharge/${id}`, body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
})

export const DeleteRecharge = createAsyncThunk<
  { success: true; message?: string } | ErrorResponse,
  { id: string }
>("DeleteRecharge", async ({ id }) => {
  try {
    const response = await axios.delete(`${url}recharge/${id}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
})

interface RechargeState {
  recharge: RechargeType[]
}

const initialState: RechargeState = {
  recharge: [],
}

const rechargeSlice = createSlice({
  name: "RechargePlans",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetRecharge.fulfilled, (state, { payload }) => {
      if (payload.success) {
        state.recharge = payload.recharge
      }
    })
  },
})

export default rechargeSlice.reducer
