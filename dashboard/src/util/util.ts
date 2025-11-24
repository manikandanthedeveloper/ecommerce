import type { User } from "../models/User";
import type { ErrorState } from "../models/UserErrorState";
import type { Login } from "../models/Login";
import type { LoginErrorState } from "../models/LoginErrorState";

export const isValid = (
	formData: User,
	setError: React.Dispatch<React.SetStateAction<ErrorState>>,
	nameRef: React.RefObject<HTMLInputElement> | null,
	emailRef: React.RefObject<HTMLInputElement>,
	passwordRef: React.RefObject<HTMLInputElement>,
	confirmPasswordRef: React.RefObject<HTMLInputElement>,
	policyAcceptedRef: React.RefObject<HTMLInputElement>,
	initialError: ErrorState
) => {
	let isValid: boolean = true;
	const name = formData.name.trim();
	const email = formData.email.trim();
	const password = formData.password.trim();
	const confirmpassword = formData.confirmpassword.trim();
	const policyAccepted = formData.policyAccepted;

	setError(initialError);

	if (name === "" || name.length < 3) {
		setError((prevState) => ({ ...prevState, name: "Enter valid name" }));
		nameRef?.current?.focus();
		isValid = false;
	} else if (
		email === "" ||
		!email.includes("@") ||
		!email.includes(".") ||
		email.length < 7
	) {
		setError((prevState) => ({ ...prevState, email: "Enter valid email" }));
		emailRef.current?.focus();
		isValid = false;
	} else if (password === "" || password.length < 5) {
		setError((prevState) => ({
			...prevState,
			password: "Enter valid password",
		}));
		passwordRef.current?.focus();
		isValid = false;
	} else if (confirmpassword === "" || confirmpassword !== password) {
		setError((prevState) => ({
			...prevState,
			confirmpassword: "Password and Confirm password not match",
		}));
		confirmPasswordRef.current?.focus();
		isValid = false;
	} else if (!policyAccepted) {
		setError((prevState) => ({
			...prevState,
			policyAccepted: "Please agree privacy policy and terms",
		}));
		policyAcceptedRef.current?.focus();
		isValid = false;
	}

	return isValid;
};

export const isValidLogin = (
	formData: Login,
	setError: React.Dispatch<React.SetStateAction<LoginErrorState>>,
	emailRef: React.RefObject<HTMLInputElement>,
	passwordRef: React.RefObject<HTMLInputElement>,
	initialError: LoginErrorState
) => {
	let isValid: boolean = true;
	const email = formData.email.trim();
	const password = formData.password.trim();

	setError(initialError);

	if (
		email === "" ||
		!email.includes("@") ||
		!email.includes(".") ||
		email.length < 7
	) {
		setError((prevState) => ({ ...prevState, email: "Enter valid email" }));
		emailRef.current?.focus();
		isValid = false;
	} else if (password === "" || password.length < 5) {
		setError((prevState) => ({
			...prevState,
			password: "Enter valid password",
		}));
		passwordRef.current?.focus();
		isValid = false;
	}

	return isValid;
};
