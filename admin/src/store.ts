import { configureStore } from '@reduxjs/toolkit'
import AdminUser from './api/AdminUser.ts';
import RoleSlice from './api/RoleReducers.ts';
import AstrologerSlice from './api/Astrologer.ts';
import RechargeSlice from './api/Recharge.ts';
import CategorySlice from './api/Category.ts';
import LanguageSlice from './api/Language.ts';

const store = configureStore({
    reducer: {
        adminUserReducer: AdminUser,
        RoleStore: RoleSlice,
        AstrologerStore: AstrologerSlice,
        RechargeStore: RechargeSlice,
        CategoryStore:CategorySlice,
        LanguageStore:LanguageSlice,

    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch