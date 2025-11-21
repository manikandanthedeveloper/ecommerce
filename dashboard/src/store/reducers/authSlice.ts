import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import axios from "axios";

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

			if (data.token) {
				return fulfillWithValue(data);
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

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		user: null,
		token: null,
		error: null as string | null,
		loader: false,
	},
	reducers: {
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.error = action.payload.error;
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(adminLogin.pending, (state) => {
				state.loader = true;
				state.error = null;
			})
			.addCase(adminLogin.fulfilled, (state, action) => {
				state.loader = false;
				state.isAuthenticated = true;
				state.token = action.payload.token;
				state.error = null;
			})
			.addCase(adminLogin.rejected, (state, action) => {
				state.loader = false;
				state.isAuthenticated = false;
				state.token = null;
				state.error = (action.payload as string) || "Login failed";
			});
	},
});
export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
