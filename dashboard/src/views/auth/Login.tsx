import { FaFacebook, FaGoogle } from "react-icons/fa"
import { Link } from "react-router-dom"
import UserInput from "../../components/UI/UserInput"
import { useRef, useState } from "react";
import type { Login } from "../../models/Login";
import type { LoginErrorState } from "../../models/LoginErrorState";
import { messageClear } from "../../store/reducers/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isValidLogin } from "../../util/util";
import { useAuthToast } from "../../hooks/useAuthToast";
import Buttont from "../../components/UI/Buttont";
import { sellerLogin } from "../../store/auth/sellerLoginThunks";

const initialError: LoginErrorState = {
    email: "",
    password: ""
};

const initialData = { email: "", password: "" };

const Login = () => {
    const [formData, setFormData] = useState<Login>(initialData);
    const [error, setError] = useState<LoginErrorState>(initialError);
    const dispatch = useAppDispatch();
    const { loader, errorMessage, isAuthenticated, successMessage } = useAppSelector((state) => state.auth);

    const emailRef = useRef<HTMLInputElement>(null!);
    const passwordRef = useRef<HTMLInputElement>(null!);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, type, value, checked } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: type === "checkbox" ? checked : value }))
    }

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!isValidLogin(formData, setError, emailRef, passwordRef, initialError)) return
        console.log(formData, 'form submitted!!!');
        dispatch(sellerLogin({ email: formData.email, password: formData.password })).unwrap().then(() => {
            setFormData(initialData);
            dispatch(messageClear());
        });
    }

    useAuthToast({
        errorMessage,
        successMessage,
        isAuthenticated,
    });

    return (
        <div className='min-w-screen min-h-screen bg-[#ecebff] flex justify-center items-center overflow-hidden'>
            <div className="md:w-[500px] sm:[350px] bg-blue-500 text-white sm:2 md:p-4">
                <h2 className="text-xl mb-2 font-bold">Welcome to Ecommerce</h2>
                <p className="text-sm mb-3 font-medium">Please Sign In your account</p>

                <form onSubmit={onSubmitHandler}>
                    <UserInput label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} error={error.email} onChange={onChangeHandler} inputRef={emailRef} />
                    <UserInput label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} error={error.password} onChange={onChangeHandler} inputRef={passwordRef} />
                    <Buttont loader={loader} text="Sign In" />

                    <div className='flex items-center mb-3 gap-3 justify-center'>
                        <p>Don't Have an account ? <Link className='font-bold' to="/register">Sing Up</Link> </p>
                    </div>

                    <div className='w-full flex justify-center items-center mb-3'>
                        <div className='w-[45%] bg-amber-50 h-px'></div>
                        <div className='w-[10%] flex justify-center items-center'>
                            <span className='pb-1'>Or</span>
                        </div>
                        <div className='w-[45%] bg-amber-50 h-px'></div>
                    </div>

                    <div className='flex justify-center items-center gap-3'>
                        <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><FaGoogle /></span>
                        </div>

                        <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                            <span><FaFacebook /></span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login