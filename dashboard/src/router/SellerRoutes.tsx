import { lazy } from "react";
import AddProduct from "../views/seller/AddProduct";

const Home = lazy(() => import("../views/HomePage"));
const SellerDashboard = lazy(() => import("../views/seller/SellerDashboard"));

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
];