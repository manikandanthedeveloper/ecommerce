import { useState } from 'react'
import {
    MdSearch
} from 'react-icons/md'

const SearchBar: React.FC<{ cssClass?: string }> = ({ cssClass }) => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Implement search logic here
    }

    return <div className={cssClass}>
        <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
                <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, orders, customers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name="search"
                />
            </div>
        </form>
    </div>
}

export default SearchBar

{/* <div className="md:hidden px-4 pb-3">
                <form onSubmit={handleSearch}>
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div> */}