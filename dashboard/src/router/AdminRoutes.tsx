import { lazy } from "react";
import CategoryPage from "../views/admin/CategoryPage";
import SellersPage from "../views/admin/SellersPage";
import PaymentRequest from "../views/admin/PaymentRequest";
import DeactiveSellers from "../views/admin/DeactiveSellers";
import SellerRequest from "../views/admin/SellerRequest";

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
    {
        path: "admin/dashboard/sellers",
        element: <SellersPage />,
        role: "admin",
    },
    {
        path: "admin/dashboard/payment-request",
        element: <PaymentRequest />,
        role: "admin",
    },
    {
        path: "admin/dashboard/deactive-sellers",
        element: <DeactiveSellers />,
        role: "admin",
    },
    {
        path: "admin/dashboard/sellers-request",
        element: <SellerRequest />,
        role: "admin",
    },
];