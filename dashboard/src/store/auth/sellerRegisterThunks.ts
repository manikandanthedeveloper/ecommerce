import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import axios from "axios";

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

			const token = data.token || data.data?.token;
			return fulfillWithValue({
				token: token || null,
				user: data.user || data.data?.user || null,
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
