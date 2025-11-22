import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import DashboardChart from "../../components/DashboardChart";
import RecentSellerMessages from "../../components/RecentSellerMessages";
import RecentOrders from "../../components/RecentOrders";

const AdminDashboard = () => {
	return (
		<div className="px-2 md:px-7 py-5">
			<h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
					<div className="flex flex-col justify-start items-start text-black">
						<h2 className="text-3xl font-bold">Rs 3500</h2>
						<span className="text-md font-medium">Total Sales</span>
					</div>
					<div className="w-[47px] h-[47px] rounded-full bg-red-200 flex justify-center items-center text-xl">
						<MdCurrencyExchange className="text-red-800 shadow-lg" />
					</div>
				</div>
				<div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
					<div className="flex flex-col justify-start items-start text-black">
						<h2 className="text-3xl font-bold">50</h2>
						<span className="text-md font-medium">Products</span>
					</div>
					<div className="w-[47px] h-[47px] rounded-full bg-green-800 flex justify-center items-center text-xl">
						<MdProductionQuantityLimits className="text-white shadow-lg" />
					</div>
				</div>
				<div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
					<div className="flex flex-col justify-start items-start text-black">
						<h2 className="text-3xl font-bold">10</h2>
						<span className="text-md font-medium">Sellers</span>
					</div>
					<div className="w-[47px] h-[47px] rounded-full bg-blue-700 flex justify-center items-center text-xl">
						<FaUser className="text-white shadow-lg" />
					</div>
				</div>
				<div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
					<div className="flex flex-col justify-start items-start text-black">
						<h2 className="text-3xl font-bold">54</h2>
						<span className="text-md font-medium">Orders</span>
					</div>
					<div className="w-[47px] h-[47px] rounded-full bg-orange-300 flex justify-center items-center text-xl">
						<FaCartShopping className="text-red-800 shadow-lg" />
					</div>
				</div>
			</div>
			<div className="w-full flex flex-wrap mt-7">
				<div className="w-full lg:w-7/12 lg:pr-3">
					<div className="w-full border border-gray-200 bg-white">
						<DashboardChart />
					</div>
				</div>
				<div className="w-full lg:w-5/12">
					<div className="border border-gray-200 bg-white">
						<RecentSellerMessages />
					</div>
				</div>
			</div>
			<RecentOrders />
		</div>
	);
};

export default AdminDashboard;