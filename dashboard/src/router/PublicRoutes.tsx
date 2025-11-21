import { lazy } from "react";

const Login = lazy(() => import("../views/auth/Login"));
const Register = lazy(() => import("../views/auth/Register"));
const AdminLogin = lazy(() => import("../views/auth/AdminLogin"));
const HomePage = lazy(() => import("../views/HomePage"));

const publicRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/admin/login', element: <AdminLogin /> }
];

export default publicRoutes;