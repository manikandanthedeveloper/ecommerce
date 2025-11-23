const OrderDetailsPage = () => {


    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-4"> Order Details</h1>
            <div className='w-full flex flex-wrap gap-4'>
                <div className="w-full md:w-[calc(33.33%-0.5rem)] bg-white border border-gray-200 p-4 mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold mb-4">Order #123456</h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
                        <p className="text-gray-600 mb-1"><strong>Name:</strong> Jane Smith</p>
                        <p className="text-gray-600 mb-1"><strong>Email:</strong> jane.smith@example.com</p>
                        <p className="text-gray-600 mb-1"><strong>Payment Status:</strong> Paid</p>
                        <p className="text-gray-600 mb-1"><strong>Price:</strong> $120.00</p>
                    </div>
                    <div className="w-full mb-4 flex items-center gap-4 content-center">
                        <div className="w-16 h-16">
                            <img src="/products/1.jpg" alt="Product" className="object-cover border border-gray-300" />
                        </div>
                        <div>
                            <p>Product Name here</p>
                            <p>Brand: Easy</p>
                            <p>Quantity: 2</p>
                        </div>
                    </div>
                    <div className="w-full mb-4 flex items-center gap-4 content-center">
                        <div className="w-16 h-16">
                            <img src="/products/1.jpg" alt="Product" className="object-cover border border-gray-300" />
                        </div>
                        <div>
                            <p>Product Name here</p>
                            <p>Brand: Easy</p>
                            <p>Quantity: 2</p>
                        </div>
                    </div>
                    <div className="w-full mb-4 flex items-center gap-4 content-center">
                        <div className="w-16 h-16">
                            <img src="/products/1.jpg" alt="Product" className="object-cover border border-gray-300" />
                        </div>
                        <div>
                            <p>Product Name here</p>
                            <p>Brand: Easy</p>
                            <p>Quantity: 2</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[calc(66.67%-0.5rem)] bg-white border border-gray-200 p-4 relative">
                    <h3><strong>Seller One Order:</strong> Pending</h3>
                    <div className="w-full mb-4 flex items-center gap-4 content-center">
                        <div className="w-16 h-16">
                            <img src="/products/1.jpg" alt="Product" className="object-cover border border-gray-300" />
                        </div>
                        <div>
                            <p>Product Name here</p>
                            <p>Brand: Easy</p>
                            <p>Quantity: 2</p>
                        </div>
                    </div>
                    <h3><strong>Seller two Order:</strong> Pending</h3>
                    <div className="w-full mb-4 flex items-center gap-4 content-center">
                        <div className="w-16 h-16">
                            <img src="/products/1.jpg" alt="Product" className="object-cover border border-gray-300" />
                        </div>
                        <div>
                            <p>Product Name here</p>
                            <p>Brand: Easy</p>
                            <p>Quantity: 2</p>
                        </div>
                    </div>
                    <div className="mt-4 right-4 bottom-4 absolute">
                        <select className="px-4 py-2 border border-gray-300 rounded-md outline-none">
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="warehouse">Warehouse</option>
                            <option value="placed">Placed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailsPage