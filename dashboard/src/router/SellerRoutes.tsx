import { lazy } from "react";

const SellerDashboard = lazy(() => import("../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../views/seller/AddProduct"));
const Products = lazy(() => import("../views/seller/Products"));
const DiscountProducts = lazy(() => import("../views/seller/DiscountProducts"));
const OrdersPage = lazy(() => import("../views/seller/OrdersPage"));
const Payment = lazy(() => import("../views/seller/Payment"));
const SellerToAdmin = lazy(() => import("../views/seller/SellerToAdmin"));
const SellerToCustomer = lazy(() => import("../views/seller/SellerToCustomer"));
const Profile = lazy(() => import("../views/seller/Profile"));
const EditProduct = lazy(() => import("../views/seller/EditProduct"));
const OrderDetails = lazy(() => import("../views/seller/OrderDetails"));

export const sellerRoutes = [
    {
        path: "/sellers/dashboard",
        element: <SellerDashboard />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/add-product",
        element: <AddProduct />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/edit-product/:id",
        element: <EditProduct />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/products",
        element: <Products />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/discount-products",
        element: <DiscountProducts />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/orders",
        element: <OrdersPage />,
        role: "seller",
        ability: ["active", "inactive"],
    },
    {
        path: "/sellers/dashboard/orders/details/:id",
        element: <OrderDetails />,
        role: "seller",
        ability: ["active", "inactive"],
    },
    {
        path: "/sellers/dashboard/payments",
        element: <Payment />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/chat-support",
        element: <SellerToAdmin />,
        ability: ["active", "inactive", "pending"],
    },
    {
        path: "/sellers/dashboard/chat-customer/:id",
        element: <SellerToCustomer />,
        ability: ["active", "inactive", "pending"],
    },
    {
        path: "/sellers/dashboard/chat-customer",
        element: <SellerToCustomer />,
        role: "seller",
        status: "active",
    },
    {
        path: "/sellers/dashboard/profile",
        element: <Profile />,
        role: "seller",
        status: "active",
    },

];