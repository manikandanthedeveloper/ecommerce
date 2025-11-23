import { lazy } from "react";

const Home = lazy(() => import("../views/HomePage"));
const SellerDashboard = lazy(() => import("../views/seller/SellerDashboard"));
const AddProduct = lazy(() => import("../views/seller/AddProduct"));
const Products = lazy(() => import("../views/seller/Products"));
const DiscountProducts = lazy(() => import("../views/seller/DiscountProducts"));

export const sellerRoutes = [
    {
        path: "/",
        element: <Home />,
        ability: ["seller", "admin"],
    },
    {
        path: "/sellers/dashboard",
        element: <SellerDashboard />,
        ability: ["seller"],
    },
    {
        path: "/sellers/dashboard/add-product",
        element: <AddProduct />,
        ability: ["seller"],
    },
    {
        path: "/sellers/dashboard/products",
        element: <Products />,
        ability: ["seller"],
    },
    {
        path: "/sellers/dashboard/discount-products",
        element: <DiscountProducts />,
        ability: ["seller"],
    },
];