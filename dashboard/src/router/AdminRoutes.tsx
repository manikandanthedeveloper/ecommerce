import { lazy } from "react";
import CategoryPage from "../views/admin/CategoryPage";

const AdminDashboard = lazy(() => import("../views/admin/AdminDashboard"));
const OrdersPage = lazy(() => import("../views/admin/OrdersPage"))

export const adminRoutes = [
    {
        path: "admin/dashboard",
        element: <AdminDashboard />,
        role: "admin",
    },
    {
        path: "admin/dashboard/orders",
        element: <OrdersPage />,
        role: "admin",
    },
    {
        path: "admin/dashboard/categories",
        element: <CategoryPage />,
        role: "admin",
    },
];