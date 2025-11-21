import { PrivateRoutes } from "./PrivateRoutes";
import MainLayout from "../layout/MainLayout";

export const getRoutes = () => {
	return {
		path: "/",
		element: <MainLayout />,
		children: PrivateRoutes,
	};
};
