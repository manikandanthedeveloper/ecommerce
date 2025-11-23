import { useState } from "react"
import { MdAccountBalance, MdCheckCircle, MdPending, MdCancel } from "react-icons/md"

interface PaymentHistory {
    id: string;
    amount: number;
    requestDate: string;
    approvalDate?: string;
    status: 'pending' | 'approved' | 'cancelled';
}

const Payment = () => {
    const [requestAmount, setRequestAmount] = useState('');

    const paymentHistory: PaymentHistory[] = [
        {
            id: '#WR001',
            amount: 5000,
            requestDate: '2024-11-15',
            approvalDate: '2024-11-18',
            status: 'approved'
        },
        {
            id: '#WR002',
            amount: 3500,
            requestDate: '2024-11-20',
            status: 'pending'
        },
        {
            id: '#WR003',
            amount: 2000,
            requestDate: '2024-11-10',
            approvalDate: '2024-11-12',
            status: 'cancelled'
        },
        {
            id: '#WR004',
            amount: 4200,
            requestDate: '2024-11-05',
            approvalDate: '2024-11-08',
            status: 'approved'
        },
    ];

    const handleSubmitRequest = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle request submission
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        <MdCheckCircle /> Approved
                    </span>
                );
            case 'pending':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <MdPending /> Pending
                    </span>
                );
            case 'cancelled':
                return (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <MdCancel /> Cancelled
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className="text-2xl font-bold mb-4">Seller Payments</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-start items-start text-black">
                        <h2 className="text-3xl font-bold">Rs 3500</h2>
                        <span className="text-md font-medium">Total Sales</span>
                    </div>
                    <div className="w-[47px] h-[47px] rounded-full bg-red-200 flex justify-center items-center text-xl">
                        <MdAccountBalance className="text-red-800 shadow-lg" />
                    </div>
                </div>
                <div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-start items-start text-black">
                        <h2 className="text-3xl font-bold">$5000</h2>
                        <span className="text-md font-medium">Available Amount</span>
                    </div>
                    <div className="w-[47px] h-[47px] rounded-full bg-green-800 flex justify-center items-center text-xl">
                        <MdAccountBalance className="text-white shadow-lg" />
                    </div>
                </div>
                <div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-start items-start text-black">
                        <h2 className="text-3xl font-bold">$2000</h2>
                        <span className="text-md font-medium">Withdrawals</span>
                    </div>
                    <div className="w-[47px] h-[47px] rounded-full bg-blue-700 flex justify-center items-center text-xl">
                        <MdAccountBalance className="text-white shadow-lg" />
                    </div>
                </div>
                <div className="p-2 bg-white border border-gray-200 flex justify-between items-center gap-4">
                    <div className="flex flex-col justify-start items-start text-black">
                        <h2 className="text-3xl font-bold">$0</h2>
                        <span className="text-md font-medium">Pending Amount</span>
                    </div>
                    <div className="w-[47px] h-[47px] rounded-full bg-orange-300 flex justify-center items-center text-xl">
                        <MdAccountBalance className="text-red-800 shadow-lg" />
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap gap-4 mt-7">
                {/* Send Request Section */}
                <div className="w-full lg:w-[calc(50%-0.5rem)]">
                    <div className="w-full border border-gray-200 bg-white rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MdAccountBalance className="text-2xl text-blue-600" />
                            <h3 className="text-lg font-bold">Send Withdrawal Request</h3>
                        </div>

                        <form onSubmit={handleSubmitRequest} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Request Amount</label>
                                <input
                                    type="number"
                                    value={requestAmount}
                                    onChange={(e) => setRequestAmount(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter amount to withdraw"
                                    required
                                    min={0}
                                />
                            </div>
                        </form>

                        <div className="mt-6">
                            <h3 className="text-lg font-bold mb-4">Pending Requests</h3>
                            <table className="w-full text-left border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 border-b border-gray-200">Request ID</th>
                                        <th className="px-4 py-2 border-b border-gray-200">Amount</th>
                                        <th className="px-4 py-2 border-b border-gray-200">Status</th>
                                        <th className="px-4 py-2 border-b border-gray-200">Request Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.filter(p => p.status === 'pending').map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-4 py-2 border-b border-gray-200">{payment.id}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">Rs {payment.amount.toLocaleString()}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{getStatusBadge(payment.status)}</td>
                                            <td className="px-4 py-2 border-b border-gray-200">{payment.requestDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Payment History Section */}
                <div className="w-full lg:w-[calc(50%-0.5rem)]">
                    <div className="w-full border border-gray-200 bg-white rounded-lg p-6">
                        <h3 className="text-lg font-bold mb-4">Payment History</h3>

                        <div className="space-y-3">
                            {paymentHistory.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-semibold text-gray-900 text-lg">
                                                Rs {payment.amount.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-500">{payment.id}</p>
                                        </div>
                                        {getStatusBadge(payment.status)}
                                    </div>

                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Request Date:</span>
                                            <span className="font-medium">{payment.requestDate}</span>
                                        </div>
                                        {payment.approvalDate && (
                                            <div className="flex justify-between text-gray-600">
                                                <span>
                                                    {payment.status === 'approved' ? 'Approved Date:' : 'Cancelled Date:'}
                                                </span>
                                                <span className="font-medium">{payment.approvalDate}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {paymentHistory.length === 0 && (
                            <div className="text-center py-12">
                                <MdAccountBalance className="mx-auto text-5xl text-gray-300 mb-3" />
                                <p className="text-gray-500">No payment history yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment