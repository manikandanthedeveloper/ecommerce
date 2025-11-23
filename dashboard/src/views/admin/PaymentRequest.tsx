import { Virtuoso } from "react-virtuoso"

interface PaymentItem {
    id: number
    amount: number
    status: string
    date: string
}

const PaymentRequest = () => {
    // Mock data - replace with actual data from API
    const pendingWithdrawals: PaymentItem[] = [
        { id: 1, amount: 3434, status: 'Pending', date: '25 Dec 2023' },
        { id: 2, amount: 5600, status: 'Approved', date: '26 Dec 2023' },
        { id: 3, amount: 2100, status: 'Pending', date: '27 Dec 2023' },
        { id: 4, amount: 8900, status: 'Completed', date: '28 Dec 2023' },
        { id: 5, amount: 4300, status: 'Pending', date: '29 Dec 2023' },
        { id: 6, amount: 6700, status: 'Approved', date: '30 Dec 2023' },
        { id: 7, amount: 3200, status: 'Pending', date: '31 Dec 2023' },
        { id: 8, amount: 9100, status: 'Completed', date: '01 Jan 2024' },
        { id: 9, amount: 5400, status: 'Pending', date: '02 Jan 2024' },
        { id: 10, amount: 7800, status: 'Approved', date: '03 Jan 2024' },
    ]

    const handleConfirm = (id: number) => {
        console.log('Confirming payment request:', id)
        // Add your confirmation logic here
    }

    const RowContent = (index: number, item: PaymentItem) => {
        return (
            <div className='flex text-sm text-black font-medium border border-gray-200'>
                <div className='w-[25%] p-2 whitespace-nowrap'>{index + 1}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>${item.amount.toLocaleString()}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <span className='py-px px-[5px] bg-white text-black text-sm'>
                        {item.status}
                    </span>
                </div>
                <div className='w-[25%] p-2 whitespace-nowrap'>{item.date}</div>
                <div className='w-[25%] p-2 whitespace-nowrap'>
                    <button
                        onClick={() => handleConfirm(item.id)}
                        className='bg-green-500 shadow-lg hover:shadow-green-500/50 px-3 py-0.5 cursor-pointer text-white rounded-sm text-sm'
                    >
                        Confirm
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-4"> Payment Requests</h1>
            <div className='w-full bg-white p-4 border border-gray-200'>
                <div className='w-full overflow-x-auto'>
                    <div className='flex bg-blue-500 uppercase text-xs font-bold text-white min-w-[500px]'>
                        <div className='w-[25%] p-4'> No </div>
                        <div className='w-[25%] p-4'> Amount </div>
                        <div className='w-[25%] p-4'> Status </div>
                        <div className='w-[25%] p-4'> Date </div>
                        <div className='w-[25%] p-4'> Action </div>
                    </div>
                    <Virtuoso
                        style={{ height: '350px', minWidth: '500px' }}
                        data={pendingWithdrawals}
                        itemContent={RowContent}
                        className='List'
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentRequest;