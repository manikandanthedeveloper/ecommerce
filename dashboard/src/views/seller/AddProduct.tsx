import { useState, useRef, useEffect } from 'react';
import { MdClose, MdCloudUpload, MdImage, MdSearch, MdKeyboardArrowDown } from 'react-icons/md';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        discount: '',
        stock: '',
        description: '',
    });
    const [images, setImages] = useState<string[]>([]);
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [categorySearch, setCategorySearch] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);

    const categories = [
        'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 'Toys',
        'Automotive', 'Beauty & Personal Care', 'Health & Wellness', 'Jewelry',
        'Pet Supplies', 'Office Supplies', 'Music & Instruments', 'Baby Products',
        'Food & Beverages', 'Art & Crafts', 'Outdoor & Camping'
    ];

    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(categorySearch.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setImageFiles(prev => [...prev, ...newFiles]);

            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleCategorySelect = (category: string) => {
        setFormData(prev => ({ ...prev, category }));
        setIsCategoryDropdownOpen(false);
        setCategorySearch('');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
                setIsCategoryDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        console.log('Images:', imageFiles);
        // Handle form submission
    };

    return (
        <div className="px-2 md:px-7 py-5">
            <h1 className="text-2xl font-bold mb-6">Add Product</h1>

            <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-wrap gap-4">
                    {/* Left Column - Product Images */}
                    <div className="w-full lg:w-[calc(35%-0.5rem)]">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                            <h2 className="text-lg font-semibold mb-4">Product Images</h2>

                            {/* Image Upload Area */}
                            <div className="mb-4">
                                <label className="block w-full">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors">
                                        <MdCloudUpload className="mx-auto text-5xl text-gray-400 mb-2" />
                                        <p className="text-gray-600 mb-1">Click to upload images</p>
                                        <p className="text-sm text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </label>
                            </div>

                            {/* Image Preview Grid */}
                            {images.length > 0 && (
                                <div className="grid grid-cols-2 gap-3">
                                    {images.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                            >
                                                <MdClose className="text-lg" />
                                            </button>
                                            {index === 0 && (
                                                <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                                    Main
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {images.length === 0 && (
                                <div className="text-center py-8 border border-dashed border-gray-200 rounded-lg">
                                    <MdImage className="mx-auto text-4xl text-gray-300 mb-2" />
                                    <p className="text-sm text-gray-400">No images uploaded yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="w-full lg:w-[calc(65%-0.5rem)]">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Product Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Product Name */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Enter product name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Category with Search */}
                                <div className="relative" ref={categoryDropdownRef}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <div
                                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between"
                                    >
                                        <span className={formData.category ? 'text-gray-900' : 'text-gray-400'}>
                                            {formData.category || 'Select Category'}
                                        </span>
                                        <MdKeyboardArrowDown className={`text-xl text-gray-400 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''
                                            }`} />
                                    </div>

                                    {/* Dropdown Menu */}
                                    {isCategoryDropdownOpen && (
                                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
                                            {/* Search Input */}
                                            <div className="p-2 border-b border-gray-200">
                                                <div className="relative">
                                                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={categorySearch}
                                                        onChange={(e) => setCategorySearch(e.target.value)}
                                                        placeholder="Search categories..."
                                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
                                            </div>

                                            {/* Category List */}
                                            <div className="max-h-48 overflow-y-auto">
                                                {filteredCategories.length > 0 ? (
                                                    filteredCategories.map(cat => (
                                                        <div
                                                            key={cat}
                                                            onClick={() => handleCategorySelect(cat)}
                                                            className={`px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${formData.category === cat ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                                                                }`}
                                                        >
                                                            {cat}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
                                                        No categories found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Brand <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        placeholder="Enter brand name"
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Price */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Discount */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Discount (%)
                                    </label>
                                    <input
                                        type="number"
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                        max="100"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Stock */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stock Quantity <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter product description"
                                        required
                                        rows={5}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6 justify-end">
                                <button
                                    type="button"
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddProduct