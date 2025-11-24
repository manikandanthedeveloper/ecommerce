import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../../models/DecodedToken";

export const adminLogin = createAsyncThunk(
	"auth/adminLogin",
	async (
		credentials: { email: string; password: string },
		{ rejectWithValue, fulfillWithValue }
	) => {
		try {
			const { data } = await api.post("/admin/login", credentials, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});

			const token = data.token || data.data?.token;
			if (token) {
				return fulfillWithValue({
					token,
					user: data.user || data.data?.user || null,
					successMessage:
						data.message ||
						data.data?.message ||
						"Login successful",
				});
			} else {
				return rejectWithValue(data.message || "Login failed");
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return rejectWithValue(
					error.response.data?.message || "Invalid credentials"
				);
			}

			return rejectWithValue("Something went wrong. Please try again.");
		}
	}
);

export const sellerRegister = createAsyncThunk(
	"auth/sellerRegister",
	async (
		userData: {
			name: string;
			email: string;
			password: string;
		},
		{ rejectWithValue, fulfillWithValue }
	) => {
		try {
			const { data } = await api.post("/seller/register", userData, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});

			return fulfillWithValue({
				successMessage:
					data.message ||
					data.data?.message ||
					"Registration successful",
			});
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return rejectWithValue(
					error.response.data?.message || "Registration failed"
				);
			}

			return rejectWithValue("Something went wrong. Please try again.");
		}
	}
);

export const sellerLogin = createAsyncThunk(
	"auth/sellerLogin",
	async (
		credentials: { email: string; password: string },
		{ rejectWithValue, fulfillWithValue }
	) => {
		try {
			const { data } = await api.post("/seller/login", credentials, {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});

			const token = data.token || data.data?.token;
			if (token) {
				return fulfillWithValue({
					token,
					user: data.user || data.data?.user || null,
					successMessage:
						data.message ||
						data.data?.message ||
						"Login successful",
				});
			} else {
				return rejectWithValue(data.message || "Login failed");
			}
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				return rejectWithValue(
					error.response.data?.message || "Invalid credentials"
				);
			}

			return rejectWithValue("Something went wrong. Please try again.");
		}
	}
);

const returnRole = (token: string | null): string => {
	if (token) {
		const decodeToken = jwtDecode<DecodedToken>(token);
		const expireTime = new Date(decodeToken.exp * 1000);
		if (new Date() > expireTime) {
			localStorage.removeItem("accessToken");
			return "";
		} else {
			return decodeToken.role;
		}
	} else {
		return "";
	}
};

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		token: localStorage.getItem("accessToken") || null,
		errorMessage: null as string | null,
		successMessage: null as string | null,
		loader: false,
		role: returnRole(localStorage.getItem("accessToken")),
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
	},
});
export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout, messageClear } =
	authSlice.actions;
