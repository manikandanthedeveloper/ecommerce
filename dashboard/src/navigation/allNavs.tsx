import {
	MdDashboard,
	MdShoppingCart,
	MdPeople,
	MdCategory,
	MdPayment,
	MdViewList,
} from "react-icons/md";

import { IoIosChatbubbles, IoMdAdd } from "react-icons/io";
import { FaUserTimes, FaCodeBranch } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbBasketDiscount } from "react-icons/tb";
import { BsCartCheck, BsFillChatQuoteFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import type { MenuItem } from "../models/MenuItem";

export const allNavs: MenuItem[] = [
	{
		id: 1,
		title: "Dashboard",
		path: "/admin/dashboard",
		icon: <MdDashboard className="text-xl" />,
		role: "admin",
	},
	{
		id: 2,
		title: "Orders",
		path: "/admin/dashboard/orders",
		icon: <MdShoppingCart className="text-xl" />,
		badge: 5,
		role: "admin",
	},
	{
		id: 3,
		title: "Categories",
		path: "/admin/dashboard/categories",
		icon: <MdCategory className="text-xl" />,
		role: "admin",
	},
	{
		id: 4,
		title: "Sellers",
		icon: <MdPeople className="text-xl" />,
		role: "admin",
		path: "/admin/dashboard/sellers",
	},
	{
		id: 5,
		title: "Payment Request",
		icon: <MdPayment />,
		role: "admin",
		path: "/admin/dashboard/payment-request",
	},
	{
		id: 6,
		title: "Deactive Sellers",
		icon: <FaUserTimes className="text-xl" />,
		role: "admin",
		path: "/admin/dashboard/deactive-sellers",
	},
	{
		id: 7,
		title: "Seller Request",
		icon: <FaCodeBranch className="text-xl" />,
		role: "admin",
		path: "/admin/dashboard/sellers-request",
	},
	{
		id: 8,
		title: "Live Chat",
		icon: <IoIosChatbubbles className="text-xl" />,
		role: "admin",
		path: "/admin/dashboard/chat-sellers",
	},
	{
		id: 9,
		title: "Dashboard",
		icon: <AiOutlineDashboard className="text-xl" />,
		role: "seller",
		path: "/sellers/dashboard",
	},
	{
		id: 10,
		title: "Add Product",
		icon: <IoMdAdd />,
		role: "seller",
		path: "/sellers/dashboard/add-product",
	},
	{
		id: 11,
		title: "All Product",
		icon: <MdViewList />,
		role: "seller",
		path: "/sellers/dashboard/products",
	},
	{
		id: 12,
		title: "Discount Product",
		icon: <TbBasketDiscount />,
		role: "seller",
		path: "/sellers/dashboard/discount-products",
	},
	{
		id: 13,
		title: "Orders",
		icon: <BsCartCheck />,
		role: "seller",
		path: "/sellers/dashboard/orders",
	},
	{
		id: 14,
		title: "Payments",
		icon: <MdPayment />,
		role: "seller",
		path: "/sellers/dashboard/payments",
	},
	{
		id: 15,
		title: "Chat-Customer",
		icon: <IoIosChatbubbles />,
		role: "seller",
		path: "/sellers/dashboard/chat-customer",
	},
	{
		id: 16,
		title: "Chat-Support",
		icon: <BsFillChatQuoteFill />,
		role: "seller",
		path: "/sellers/dashboard/chat-support",
	},
	{
		id: 17,
		title: "Profile",
		icon: <CgProfile />,
		role: "seller",
		path: "/sellers/dashboard/profile",
	},
];
