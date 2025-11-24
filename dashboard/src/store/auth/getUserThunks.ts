import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

const getUser = createAsyncThunk(
	"auth/getUser",
	async (_, { rejectWithValue, fulfillWithValue }) => {
		try {
			const { data } = await api.get("/getuser", {
				withCredentials: true,
				headers: { "Content-Type": "application/json" },
			});

			// Backend wraps response in { success: true, data: { user } }
			const user = data.data?.user || data.user || null;
			
			return fulfillWithValue({
				user,
			});
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export default getUser;
