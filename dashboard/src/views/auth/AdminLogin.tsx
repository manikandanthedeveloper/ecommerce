import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { Login } from "../../models/Login";
import type { LoginErrorState } from "../../models/LoginErrorState";
import UserInput from "../../components/UI/UserInput"
import { adminLogin, messageClear } from "../../store/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PropagateLoader } from "react-spinners";
import LogoImage from '../../../public/logo.svg';

const initialError: LoginErrorState = {
    email: "",
    password: ""
};

const initialData = {
    email: "",
    password: ""
};

const AdminLogin = () => {
    const [formData, setFormData] = useState<Login>(initialData);
    const [error, setError] = useState<LoginErrorState>(initialError);
    const dispatch = useAppDispatch();
    const { loader, errorMessage } = useAppSelector((state) => state.auth);

    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, type, value, checked } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: type === "checkbox" ? checked : value }))
    }

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!isValid()) return;

        dispatch(adminLogin({ email: formData.email, password: formData.password }));
    }

    const isValid = () => {
        let isValid: boolean = true;
        const email = formData.email.trim();
        const password = formData.password.trim();

        setError(initialError);

        if (email === "" || !email.includes('@') || !email.includes('.') || email.length < 7) {
            setError((prevState) => ({ ...prevState, email: "Enter valid email" }));
            emailRef.current?.focus();
            isValid = false;
        } else if (password === "" || password.length < 5) {
            setError((prevState) => ({ ...prevState, password: "Enter valid password" }));
            passwordRef.current?.focus();
            isValid = false;
        }

        return isValid;
    }

    const overideStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        height: "24px"
    }

    useEffect(() => {
        if (errorMessage) {
            const lowerErrorMessage = errorMessage.toLowerCase();
            const newError = { ...initialError };

            if (lowerErrorMessage.includes("email")) {
                newError.email = errorMessage;
                setError(newError);
                emailRef.current?.focus();
            } else if (lowerErrorMessage.includes("password")) {
                newError.password = errorMessage;
                setError(newError);
                passwordRef.current?.focus();
            }
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [errorMessage, dispatch]);

    return (
        <div className='min-w-screen min-h-screen bg-[#ecebff] flex justify-center items-center overflow-hidden'>
            <div className="md:w-[500px] sm:[350px] bg-blue-500 text-white sm:2 md:p-4">
                <div className="w-[100px] h-[100px] mx-auto">
                    <img src={LogoImage} alt="Logo" className="h-full w-full" />
                </div>

                <form onSubmit={onSubmitHandler}>
                    <UserInput label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} error={error.email} onChange={onChangeHandler} inputRef={emailRef} />
                    <UserInput label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} error={error.password} onChange={onChangeHandler} inputRef={passwordRef} />
                    <button disabled={loader} className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3' type="submit">{loader ? <PropagateLoader cssOverride={overideStyle} color="#ffffff" /> : "Login"}</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin