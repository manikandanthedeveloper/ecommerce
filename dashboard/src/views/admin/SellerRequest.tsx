import Pagination from '../../components/Pagination'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const SellerRequest = () => {
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)

    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-4">Seller Requests</h1>
            <div className='w-full p-4 bg-white border border-gray-200'>
                <div className='flex justify-between items-center'>
                    <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-4 py-2 outline-none bg-white border border-gray-200 text-black' name="parPage" id="parPage" value={parPage}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                    <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className='px-4 py-2 outline-none bg-white border border-gray-200 rounded-md text-black' type="text" placeholder='search' name="search" />
                </div>

                <div className='relative overflow-x-auto bg-white border border-gray-200 border-b-0 mt-4'>
                    <table className='w-full text-sm text-left text-black'>
                        <thead className='text-sm text-black uppercase border-b border-gray-200'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Email</th>
                                <th scope='col' className='py-3 px-4'>Payment Status</th>
                                <th scope='col' className='py-3 px-4'>Status</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <tr key={uuidv4()} className="border-b border-gray-300">
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>John Doe</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>easyshop@example.com</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Active</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Pending</td>
                                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                        <div className="flex gap-2">
                                            <Link to={`/admin/dashboard/sellers/details/${i + 1}`}><FaEdit className="bg-green-500 text-white p-1 text-2xl" /></Link>
                                            <Link to={'/'}><FaTrash className="bg-red-500 text-white p-1 text-2xl" /></Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
    )
}

export default SellerRequest