import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import axios from "axios";

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
