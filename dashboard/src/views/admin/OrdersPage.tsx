import { useState } from 'react';
import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';

const OrdersPage = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [show, setShow] = useState(false)


    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-white border border-gray-200'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 outline-none bg-white border border-gray-200 text-black'>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className='px-4 py-2 outline-none bg-white border border-gray-200 rounded-md text-black' type="text" placeholder='search' />
                </div>


                <div className='relative mt-5 overflow-x-auto'>
                    <div className='w-full text-sm text-left text-black'>
                        <div className='text-sm text-black uppercase border-b border-gray-200'>
                            <div className='flex justify-between items-center'>
                                <div className='py-3 w-[25%] font-bold'>Order id</div>
                                <div className='py-3 w-[13%] font-bold'>Price</div>
                                <div className='py-3 w-[18%] font-bold'>Payment Status</div>
                                <div className='py-3 w-[18%] font-bold'>Order Status</div>
                                <div className='py-3 w-[18%] font-bold'>Action </div>
                                <div className='py-3 w-[8%] font-bold'></div>
                            </div>
                        </div>

                        {
                            <div className='text-black'>
                                <div className='flex justify-between items-start border-b border-gray-200 font-normal'>
                                    <div className='py-3 w-[25%] font-medium whitespace-nowrap'>#123456</div>
                                    <div className='py-3 w-[13%] font-medium'>Rs. 422</div>
                                    <div className='py-3 w-[18%] font-medium'>Pending</div>
                                    <div className='py-3 w-[18%] font-medium'>Shipped</div>
                                    <div className='py-3 w-[18%] font-medium'>
                                        <Link to={`/admin/dashboard/order/details/`} >View</Link>
                                    </div>
                                    <div onClick={() => setShow(!show)} className='py-3 w-[8%] font-medium text-xl'>{show ? <LuChevronDown /> : <LuChevronRight />}
                                    </div>
                                </div>

                                <div className={show ? 'block border-b border-gray-200 bg-white' : 'hidden'}>

                                    <div className=' flex justify-start items-start border-b border-gray-200'>
                                        <div className='py-3 w-[25%] font-medium whitespace-nowrap pl-3'>#123456</div>
                                        <div className='py-3 w-[13%] font-medium'>Rs. 422</div>
                                        <div className='py-3 w-[18%] font-medium'>Pending</div>
                                        <div className='py-3 w-[18%] font-medium'>Shipped</div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
                <div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                    <Pagination
                        pageNumber={currentPage}
                        setPageNumber={setCurrentPage}
                        totalItem={10}
                        parPage={parPage}
                        showItem={4}
                    />
                </div>




            </div>
        </div>
    );
};

export default OrdersPage;