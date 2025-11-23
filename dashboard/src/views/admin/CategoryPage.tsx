import { useState } from "react"
import Pagination from "../../components/Pagination"
import { Link } from "react-router-dom"
import { FaEdit, FaImage, FaTrash } from "react-icons/fa"
import { v4 as uuidv4 } from 'uuid';
import { IoMdCloseCircle } from "react-icons/io";

const CategoryPage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [parPage, setParPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [show, setShow] = useState(false)

    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <button onClick={() => setShow(!show)} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4 lg:hidden">
                {show ? 'Close' : 'Add New Category'}
            </button>
            <div className="w-full flex flex-wrap mt-4">
                <div className="w-full lg:w-7/12 lg:pr-3">
                    <div className="w-full border border-gray-200 bg-white p-4">
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
                                        <th scope='col' className='py-3 px-4'>Image</th>
                                        <th scope='col' className='py-3 px-4'>Name</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {[1, 2, 3, 4, 5].map((_, i) => (
                                        <tr key={uuidv4()} className="border-b border-gray-300">
                                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                                <img src={`/category/${i + 1}.jpg`} alt="category" className="w-10 h-10 object-cover" />
                                            </td>
                                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>T shirt</td>
                                            <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                                                <div className="flex gap-2">
                                                    <Link to={'/'}><FaEdit className="bg-green-500 text-white p-1 text-2xl" /></Link>
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
                <div className={`w-[360px] lg:w-5/12 absolute lg:static ${show ? 'right-0' : '-right-[340px]'} z-9999 top-0 transition-all duration-500`} >
                    <div className="border border-gray-200 bg-white w-full h-full">
                        <div className="p-4 h-screen lg:h-auto overflow-y-auto">
                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold mb-4">Add New Category</h2>
                                <div onClick={() => setShow(false)} className='flex lg:hidden justify-end mb-4'>
                                    <IoMdCloseCircle className="text-2xl cursor-pointer" />
                                </div>
                            </div>
                            <form className="flex flex-col gap-4 w-full h-full">
                                <div>
                                    <label htmlFor="categoryName" className="text-black font-medium mb-2 block">Category Name</label>
                                    <input type="text" id="categoryName" placeholder="Category Name" className="w-full px-4 py-2 border border-gray-300  outline-none text-black" name="categoryName" />
                                </div>
                                <div>
                                    <label htmlFor="categoryImage" className="text-black font-medium border border-gray-300 mb-2 h-[282px] w-full  overflow-hidden cursor-pointer flex flex-col justify-center items-center">
                                        <span ><FaImage /></span>
                                        <span className="ml-2">Select category image</span>
                                    </label>
                                </div>
                                <input type="file" id="categoryImage" className="hidden" name="categoryImage" />
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Add Category</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage