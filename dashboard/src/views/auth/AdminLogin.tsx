import { useRef, useState } from "react";
import type { Login } from "../../models/Login";
import type { LoginErrorState } from "../../models/LoginErrorState";
import UserInput from "../../components/UI/UserInput"
import { adminLogin, messageClear } from "../../store/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LogoImage from '../../../public/logo.svg';
import Buttont from "../../components/UI/Buttont";
import { useAuthToast } from "../../hooks/useAuthToast";
import { isValidLogin } from "../../util/util";

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
    const { loader, errorMessage, isAuthenticated, successMessage } = useAppSelector((state) => state.auth);
    const emailRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, type, value, checked } = event.target;
        dispatch(messageClear());
        setFormData((prevState) => ({ ...prevState, [name]: type === "checkbox" ? checked : value }))
    }

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!isValidLogin(formData, setError, emailRef, passwordRef, initialError)) return;

        dispatch(adminLogin({ email: formData.email, password: formData.password }))
            .unwrap()
            .then(() => {
                setFormData(initialData);
                dispatch(messageClear());
            });
    }

    useAuthToast({
        errorMessage,
        successMessage,
        isAuthenticated,
        redirectTo: isAuthenticated ? '/admin/dashboard' : undefined,
    });

    // const isValid = () => {
    //     let isValid: boolean = true;
    //     const email = formData.email.trim();
    //     const password = formData.password.trim();

    //     setError(initialError);

    //     if (email === "" || !email.includes('@') || !email.includes('.') || email.length < 7) {
    //         setError((prevState) => ({ ...prevState, email: "Enter valid email" }));
    //         emailRef.current?.focus();
    //         isValid = false;
    //     } else if (password === "" || password.length < 5) {
    //         setError((prevState) => ({ ...prevState, password: "Enter valid password" }));
    //         passwordRef.current?.focus();
    //         isValid = false;
    //     }

    //     return isValid;
    // }

    return (
        <div className='min-w-screen min-h-screen bg-[#ecebff] flex justify-center items-center overflow-hidden'>
            <div className="md:w-[500px] sm:[350px] bg-blue-500 text-white sm:2 md:p-4">
                <div className="w-[100px] h-[100px] mx-auto">
                    <img src={LogoImage} alt="Logo" className="h-full w-full" />
                </div>

                <form onSubmit={onSubmitHandler}>
                    <UserInput label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} error={error.email} onChange={onChangeHandler} inputRef={emailRef} />
                    <UserInput label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} error={error.password} onChange={onChangeHandler} inputRef={passwordRef} />
                    <Buttont loader={loader} text="Login" />
                </form>
            </div>
        </div>
    )
}

export default AdminLogin