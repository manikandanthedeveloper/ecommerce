import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { FaFacebook, FaGoogle } from "react-icons/fa"
import type { User } from "../../models/User";
import type { ErrorState } from "../../models/UserErrorState";
import UserInput from "../../components/UI/UserInput";

const initialError: ErrorState = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    policyAccepted: "",
};

const initialData = { name: "", email: "", password: "", confirmpassword: "", policyAccepted: false };

const Register = () => {
    const [formData, setFormData] = useState<User>(initialData);
    const [error, setError] = useState<ErrorState>(initialError);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const policyAcceptedRef = useRef<HTMLInputElement | null>(null);

    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { name, type, value, checked } = event.target;

        setFormData((prevState) => ({ ...prevState, [name]: type === "checkbox" ? checked : value }))
    }

    const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (!isValid()) return
        console.log(formData, 'form submitted!!!');
    }

    const isValid = () => {
        let isValid: boolean = true;
        const name = formData.name.trim();
        const email = formData.email.trim();
        const password = formData.password.trim();
        const confirmpassword = formData.confirmpassword.trim();
        const policyAccepted = formData.policyAccepted;

        setError(initialError);

        if (name === "" || name.length < 3) {
            setError((prevState) => ({ ...prevState, name: "Enter valid name" }));
            nameRef.current?.focus();
            isValid = false;
        } else if (email === "" || !email.includes('@') || !email.includes('.') || email.length < 7) {
            setError((prevState) => ({ ...prevState, email: "Enter valid email" }));
            emailRef.current?.focus();
            isValid = false;
        } else if (password === "" || password.length < 5) {
            setError((prevState) => ({ ...prevState, password: "Enter valid password" }));
            passwordRef.current?.focus();
            isValid = false;
        } else if (confirmpassword === "" || confirmpassword !== password) {
            setError((prevState) => ({ ...prevState, confirmpassword: "Password and Confirm password not match" }));
            confirmPasswordRef.current?.focus();
            isValid = false;
        } else if (!policyAccepted) {
            setError((prevState) => ({ ...prevState, policyAccepted: "Please agree privacy policy and terms", }));
            policyAcceptedRef.current?.focus();
            isValid = false;
        }

        return isValid;
    }

    return (
        <div className='min-w-screen min-h-screen bg-[#ecebff] flex justify-center items-center overflow-hidden'>
            <div className="md:w-[500px] sm:[350px] bg-blue-500 text-white sm:2 md:p-4">
                <h2 className="text-xl mb-2 font-bold">Welcome to Ecommerce</h2>
                <p className="text-sm mb-3 font-medium">Please register your account</p>

                <form onSubmit={onSubmitHandler}>

                    <UserInput label="Name" name="name" placeholder="Enter your name" value={formData.name} error={error.name} onChange={onChangeHandler} inputRef={nameRef} />
                    <UserInput label="Email" type="email" name="email" placeholder="Enter your email" value={formData.email} error={error.email} onChange={onChangeHandler} inputRef={emailRef} />
                    <UserInput label="Password" type="password" name="password" placeholder="Enter your password" value={formData.password} error={error.password} onChange={onChangeHandler} inputRef={passwordRef} />
                    <UserInput label="Confirm Password" type="password" name="confirmpassword" placeholder="Confirm your password" value={formData.confirmpassword} error={error.confirmpassword} onChange={onChangeHandler} inputRef={confirmPasswordRef} />
                    <UserInput label="I agree to privacy policy & terms" type="checkbox" name="policyAccepted" value={formData.policyAccepted} error={error.policyAccepted} onChange={onChangeHandler} inputRef={policyAcceptedRef} />

                    <button className='bg-slate-800 w-full hover:shadow-blue-300/ hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>Sign Up</button>

                    <div className='flex items-center mb-3 gap-3 justify-center'>
                        <p>Already Have an account ? <Link className='font-bold' to="/login">Sing In</Link> </p>
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

export default Register