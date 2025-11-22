import { Link } from 'react-router-dom'

const RecentSellerMessages = () => {
    return (
        <div className='w-full p-4'>
            <div className='flex items-center justify-between'>
                <h2 className='text-xl font-normal'>Recent Seller Messages</h2>
                <Link to={'messages'} className='text-sm'>View All</Link>
            </div>
            <div className='flex flex-col gap-2 pt-4 text-[#d0d2d6]'>
                <ul className='w-full'>
                    <li className='mb-5 relative'>
                        <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center absolute">
                            <span className="text-white font-semibold text-sm">
                                A
                            </span>
                        </div>
                        <div className='p-3 border border-gray-200 shadow-sm ml-15'>
                            <div className='flex items-center justify-between'>
                                <Link to={'/'} className='text-md font-normal text-black'>Admin</Link>
                                <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0 text-black'> 2 day ago</time>
                            </div>
                            <div className='p-3 border border-gray-200 bg-gray-50 mt-2 text-black'>
                                How are you?
                            </div>
                        </div>
                    </li>
                    <li className='mb-5 relative'>
                        <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center absolute">
                            <span className="text-white font-semibold text-sm">
                                A
                            </span>
                        </div>
                        <div className='p-3 border border-gray-200 shadow-sm ml-15'>
                            <div className='flex items-center justify-between'>
                                <Link to={'/'} className='text-md font-normal text-black'>Admin</Link>
                                <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0 text-black'> 2 day ago</time>
                            </div>
                            <div className='p-3 border border-gray-200 bg-gray-50 mt-2 text-black'>
                                How are you?
                            </div>
                        </div>
                    </li>
                    <li className='mb-5 relative'>
                        <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center absolute">
                            <span className="text-white font-semibold text-sm">
                                A
                            </span>
                        </div>
                        <div className='p-3 border border-gray-200 shadow-sm ml-15'>
                            <div className='flex items-center justify-between'>
                                <Link to={'/'} className='text-md font-normal text-black'>Admin</Link>
                                <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0 text-black'> 2 day ago</time>
                            </div>
                            <div className='p-3 border border-gray-200 bg-gray-50 mt-2 text-black'>
                                How are you?
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default RecentSellerMessages