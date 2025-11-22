import { Link } from "react-router-dom"

const RecentOrders = () => {
    return <div className='w-full mt-4'>
        <div className='flex justify-between items-center'>
            <h2 className='font-semibold text-2xl text-black pb-0'>Recent Orders</h2>
            <Link to={'/'} className='font-semibold text-sm text-black'>View All</Link>
        </div>

        <div className='relative overflow-x-auto bg-white border border-gray-200 mt-4'>
            <table className='w-full text-sm text-left text-black'>
                <thead className='text-sm text-black uppercase border-b border-gray-200'>
                    <tr>
                        <th scope='col' className='py-3 px-4'>Order Id</th>
                        <th scope='col' className='py-3 px-4'>Price</th>
                        <th scope='col' className='py-3 px-4'>Payment Status</th>
                        <th scope='col' className='py-3 px-4'>Order Status</th>
                        <th scope='col' className='py-3 px-4'>Active</th>
                    </tr>
                </thead>

                <tbody>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <tr key={i}>
                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>#34344</td>
                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>$454</td>
                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Pending</td>
                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Pending</td>
                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'><Link to={'/'}>View</Link></td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>

    </div>
}

export default RecentOrders