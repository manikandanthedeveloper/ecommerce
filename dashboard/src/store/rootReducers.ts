import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";

const rootReducers = combineReducers({
	auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducers>;
export default rootReducers;
