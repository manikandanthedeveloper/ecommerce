const SellerDetailsPage = () => {
    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-4">Seller Details</h1>
            <div className='w-full flex flex-wrap p-4 bg-white border border-gray-200'>
                <div className="w-full md:w-4/12 flex justify-center items-center p-4">
                    <img className="w-48 h-48 object-cover border border-gray-300" src={'/seller.png'} alt="Seller Avatar" />
                </div>
                <div className="w-full md:w-4/12 p-4">
                    <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                    <p className="text-gray-600 mb-1"><strong>Name:</strong> John Doe</p>
                    <p className="text-gray-600 mb-1"><strong>Email:</strong> john.doe@example.com</p>
                    <p className="text-gray-600 mb-1"><strong>Role:</strong> Seller</p>
                    <p className="text-gray-600 mb-1"><strong>Status:</strong> Pending</p>
                    <p className="text-gray-600 mb-1"><strong>Payment Status:</strong> Active</p>
                </div>
                <div className="w-full md:w-4/12 p-4">
                    <h2 className="text-xl font-semibold mb-2">Shop Information</h2>
                    <p className="text-gray-600 mb-1"><strong>Shop Name:</strong> John's Store</p>
                    <p className="text-gray-600 mb-1"><strong>Shop Address:</strong> 123 Market St, Cityville</p>
                    <p className="text-gray-600 mb-1"><strong>Contact Number:</strong> (123) 456-7890</p>
                </div>
                <div className="w-full mt-4 flex justify-end items-center">
                    <button className="bg-green-500 text-white px-4 py-2 mr-2 cursor-pointer hover:bg-green-600">Approve Seller</button>
                    <button className="bg-red-500 text-white px-4 py-2 cursor-pointer hover:bg-red-600">Reject Seller</button>
                </div>
            </div>
        </div>
    )
}

export default SellerDetailsPage