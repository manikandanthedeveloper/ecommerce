import { lazy } from "react";

const AdminDashboard = lazy(() => import("../views/admin/AdminDashboard"));
const OrdersPage = lazy(() => import("../views/admin/OrdersPage"))
const CategoryPage = lazy(() => import("../views/admin/CategoryPage"))
const SellersPage = lazy(() => import("../views/admin/SellersPage"))
const PaymentRequest = lazy(() => import("../views/admin/PaymentRequest"))
const DeactiveSellers = lazy(() => import("../views/admin/DeactiveSellers"))
const SellerRequest = lazy(() => import("../views/admin/SellerRequest"))
const SellerDetailsPage = lazy(() => import("../views/admin/SellerDetailsPage"))
const ChatSellersPage = lazy(() => import("../views/admin/ChatSellersPage"))

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
    {
        path: "admin/dashboard/sellers/details/:id",
        element: <SellerDetailsPage />,
        role: "admin",
    },
    {
        path: "admin/dashboard/chat-sellers",
        element: <ChatSellersPage />,
        role: "admin",
    },
];