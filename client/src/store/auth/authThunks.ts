import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import AuthService from '../../services/AuthService';
import { setAuth, setUser } from './authSlice';
import { IUser } from '../../models/IUser';

export const login = createAsyncThunk(
    'auth/login',
    async (params: { email: string; password: string }, { dispatch }) => {
        try {
            const response = await AuthService.login(params.email, params.password);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }

            if (error instanceof Error) {
                console.log(error.message);
            }
            throw error;
        }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async (params: { email: string; password: string }, { dispatch }) => {
        try {
            const response = await AuthService.registration(params.email, params.password);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data.message);
            }

            if (error instanceof Error) {
                console.log(error.message);
            }
            throw error;
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        dispatch(setAuth(false));
        dispatch(setUser({} as IUser));
        return response;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data.message);
        }

        if (error instanceof Error) {
            console.log(error.message);
        }

        throw error;
    }
});
