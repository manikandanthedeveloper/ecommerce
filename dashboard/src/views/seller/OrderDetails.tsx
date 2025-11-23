import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack, MdLocalShipping, MdPayment, MdPerson, MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';

interface OrderItem {
    id: string;
    productId: string;
    name: string;
    brand: string;
    image: string;
    quantity: number;
    price: number;
    total: number;
}

const OrderDetails = () => {
    const navigate = useNavigate();

    // Mock order data (in real app, this would come from API/route params)
    const orderData = {
        orderId: '#ORD-2024-001234',
        orderDate: 'November 20, 2025',
        status: 'processing',
        customer: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1 234 567 8900',
            address: '123 Main Street, Apt 4B, New York, NY 10001',
        },
        payment: {
            method: 'Credit Card',
            status: 'Paid',
            transactionId: 'TXN-789456123',
            amount: 234.97,
        },
        items: [
            {
                id: '1',
                productId: 'PROD-001',
                name: 'Wireless Bluetooth Headphones',
                brand: 'TechPro',
                image: '/products/1.jpg',
                quantity: 2,
                price: 79.99,
                total: 159.98,
            },
            {
                id: '2',
                productId: 'PROD-002',
                name: 'Smart Watch Series 5',
                brand: 'WatchTech',
                image: '/products/2.jpg',
                quantity: 1,
                price: 74.99,
                total: 74.99,
            },
        ] as OrderItem[],
        shipping: {
            method: 'Standard Shipping',
            cost: 0.00,
            estimatedDelivery: 'November 25-27, 2025',
        },
        totals: {
            subtotal: 234.97,
            shipping: 0.00,
            tax: 0.00,
            total: 234.97,
        },
    };

    const [orderStatus, setOrderStatus] = useState(orderData.status);

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderStatus(e.target.value);
        // API call to update order status
        console.log('Updating order status to:', e.target.value);
    };

    const getStatusBadge = (status: string) => {
        const statusConfig: { [key: string]: { bg: string; text: string; label: string } } = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
            processing: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Processing' },
            shipped: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Shipped' },
            delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="px-2 md:px-7 py-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <MdArrowBack className="text-2xl text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
                        <p className="text-sm text-gray-600">
                            {orderData.orderId} • {orderData.orderDate}
                        </p>
                    </div>
                </div>
                <div>
                    {getStatusBadge(orderStatus)}
                </div>
            </div>

            <div className="flex flex-wrap gap-4">
                {/* Left Column - Customer & Payment Info */}
                <div className="w-full lg:w-[calc(40%-0.5rem)] space-y-4">
                    {/* Customer Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <MdPerson className="text-2xl text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-800">Customer Information</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <MdPerson className="text-gray-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Name</p>
                                    <p className="font-medium text-gray-900">{orderData.customer.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MdEmail className="text-gray-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Email</p>
                                    <p className="font-medium text-gray-900">{orderData.customer.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MdPhone className="text-gray-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Phone</p>
                                    <p className="font-medium text-gray-900">{orderData.customer.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MdLocationOn className="text-gray-400 mr-3 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-600">Shipping Address</p>
                                    <p className="font-medium text-gray-900">{orderData.customer.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <MdPayment className="text-2xl text-green-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Method</span>
                                <span className="font-medium text-gray-900">{orderData.payment.method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Payment Status</span>
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                    {orderData.payment.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Transaction ID</span>
                                <span className="font-medium text-gray-900 font-mono text-sm">{orderData.payment.transactionId}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="text-gray-600">Total Amount</span>
                                <span className="font-bold text-gray-900">Rs {orderData.payment.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <MdLocalShipping className="text-2xl text-purple-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-800">Shipping Information</h2>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping Method</span>
                                <span className="font-medium text-gray-900">{orderData.shipping.method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Shipping Cost</span>
                                <span className="font-medium text-gray-900">
                                    {orderData.shipping.cost === 0 ? 'Free' : `Rs ${orderData.shipping.cost.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Estimated Delivery</span>
                                <span className="font-medium text-gray-900">{orderData.shipping.estimatedDelivery}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Items & Status */}
                <div className="w-full lg:w-[calc(60%-0.5rem)]">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h2>

                        {/* Order Items List */}
                        <div className="space-y-4 mb-6">
                            {orderData.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                                    <div className="w-20 h-20 shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                                        <p className="text-sm text-gray-600">Brand: {item.brand}</p>
                                        <p className="text-sm text-gray-600">Product ID: {item.productId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        <p className="text-sm text-gray-600">Rs {item.price.toFixed(2)} each</p>
                                        <p className="font-semibold text-gray-900">Rs {item.total.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>Rs {orderData.totals.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{orderData.totals.shipping === 0 ? 'Free' : `Rs ${orderData.totals.shipping.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>Rs {orderData.totals.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>Rs {orderData.totals.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Status Update */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Update Order Status
                            </label>
                            <div className="flex gap-3">
                                <select
                                    value={orderStatus}
                                    onChange={handleStatusChange}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <button
                                    onClick={() => console.log('Status updated to:', orderStatus)}
                                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;