import { adminRoutes } from "./AdminRoutes";
import { sellerRoutes } from "./SellerRoutes";

export const PrivateRoutes = [...adminRoutes, ...sellerRoutes];