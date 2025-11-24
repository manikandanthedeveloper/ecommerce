import { useEffect } from "react";
import type { AuthToastProps } from "../models/AuthToastProps";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthToast: (props: AuthToastProps) => void = ({
	errorMessage,
	successMessage,
	isAuthenticated,
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!errorMessage && !successMessage) return;

		if (errorMessage) {
			toast.error(errorMessage);
			return;
		}

		if (successMessage) {
			toast.success(successMessage);
		}
		if (isAuthenticated) {
			navigate("/");
		}
	}, [errorMessage, successMessage, isAuthenticated, navigate]);
};
