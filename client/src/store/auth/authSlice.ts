import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';

interface AuthState {
    user: IUser;
    isAuth: boolean;
}

const initialState: AuthState = {
    user: {} as IUser,
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
    },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
