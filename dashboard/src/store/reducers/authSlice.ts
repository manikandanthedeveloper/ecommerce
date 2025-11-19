import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const adminLogin = createAsyncThunk(
	"auth/adminLogin",
	async (credentials: { email: string; password: string }, thunkAPI) => {
		console.log("Admin login thunk called with:", credentials);
		try {
			// Simulate an API call
			const response = await new Promise<{
				user: unknown;
				token: string;
			}>((resolve) =>
				setTimeout(
					() =>
						resolve({
							user: { id: 1, email: credentials.email },
							token: "fake-jwt-tokenstring",
						}),
					1000
				)
			);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue({
				error: "Login failed - " + error,
			});
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isAuthenticated: false,
		user: null,
		token: null,
		error: null,
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
});
export default authSlice.reducer;
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
