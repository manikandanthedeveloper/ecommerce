import type { User } from "./../../models/User";
import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../auth/adminLoginThunks";
import { sellerRegister } from "../auth/sellerRegisterThunks";
import { sellerLogin } from "../auth/sellerLoginThunks";
import getUser from "../auth/getUserThunks";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		token: null as string | null,
		errorMessage: null as string | null,
		successMessage: null as string | null,
		loader: false,
		role: null as string | null,
		user: null as User | null,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.errorMessage = null;
			state.successMessage = action.payload.successMessage || null;
			state.role = action.payload.user?.role || null;
		},
		loginFailure: (state, action) => {
			state.isAuthenticated = false;
			state.token = null;
			state.errorMessage = action.payload.error;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.errorMessage = null;
		},
		messageClear: (state) => {
			state.errorMessage = null;
			state.successMessage = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(adminLogin.pending, (state) => {
				state.loader = true;
				state.errorMessage = null;
			})
			.addCase(adminLogin.fulfilled, (state, action) => {
				state.loader = false;
				state.isAuthenticated = true;
				state.token = action.payload.token;
				state.errorMessage = null;
				state.successMessage = action.payload.successMessage;
				state.role = action.payload.user?.role || null;
			})
			.addCase(adminLogin.rejected, (state, action) => {
				state.loader = false;
				state.isAuthenticated = false;
				state.token = null;
				state.errorMessage =
					(action.payload as string) || "Login failed";
			});
		builder
			.addCase(sellerRegister.pending, (state) => {
				state.loader = true;
				state.errorMessage = null;
				state.successMessage = null;
				state.isAuthenticated = false;
			})
			.addCase(sellerRegister.fulfilled, (state, action) => {
				state.loader = false;
				state.errorMessage = null;
				state.successMessage = action.payload.successMessage;
				state.isAuthenticated = true;
				state.token = action.payload.token;
				state.role = action.payload.user?.role || null;
			})
			.addCase(sellerRegister.rejected, (state, action) => {
				state.loader = false;
				state.errorMessage =
					(action.payload as string) || "Registration failed";
				state.successMessage = null;
				state.isAuthenticated = false;
			});
		builder
			.addCase(sellerLogin.pending, (state) => {
				state.loader = true;
				state.errorMessage = null;
			})
			.addCase(sellerLogin.fulfilled, (state, action) => {
				state.loader = false;
				state.isAuthenticated = true;
				state.token = action.payload.token;
				state.errorMessage = null;
				state.successMessage = action.payload.successMessage;
				state.role = action.payload.user?.role || null;
			})
			.addCase(sellerLogin.rejected, (state, action) => {
				state.loader = false;
				state.isAuthenticated = false;
				state.token = null;
				state.errorMessage =
					(action.payload as string) || "Login failed";
			});
		builder.addCase(getUser.pending, (state) => {
			state.loader = true;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.loader = false;
			state.user = action.payload.user;
			state.isAuthenticated = true;
			state.role = action.payload.user?.role || null;
		});
		builder.addCase(getUser.rejected, (state) => {
			state.loader = false;
			state.user = null;
			state.isAuthenticated = false;
			state.role = null;
		});
	},
});
export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, messageClear } =
	authSlice.actions;
