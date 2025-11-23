import { useState, useRef, useEffect } from 'react';
import { MdClose, MdCloudUpload, MdImage, MdSearch, MdKeyboardArrowDown, MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
    const navigate = useNavigate();

    // Mock existing product data (in real app, this would come from API/route params)
    const existingProduct = {
        id: 'PROD-001',
        name: 'Wireless Bluetooth Headphones',
        category: 'Electronics',
        brand: 'TechPro',
        price: '79.99',
        discount: '10',
        stock: '50',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        images: [
            '/products/1.jpg',
            '/products/2.jpg',
            '/products/3.jpg',
        ]
    };

    const [formData, setFormData] = useState({
        name: existingProduct.name,
        category: existingProduct.category,
        brand: existingProduct.brand,
        price: existingProduct.price,
        discount: existingProduct.discount,
        stock: existingProduct.stock,
        description: existingProduct.description,
    });
    const [images, setImages] = useState<string[]>(existingProduct.images);
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
        console.log('Updated Form Data:', formData);
        console.log('Updated Images:', imageFiles);
        // Handle form submission - API call to update product
        alert('Product updated successfully!');
        // navigate('/seller/products'); // Uncomment when products page is ready
    };

    return (
        <div className="px-2 md:px-7 py-5">
            <div className="flex items-center mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                    <MdArrowBack className="text-2xl text-gray-700" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
                    <p className="text-sm text-gray-600">Product ID: {existingProduct.id}</p>
                </div>
            </div>

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
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                                        <MdCloudUpload className="text-5xl text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-600 mb-1">Click to upload images</p>
                                        <p className="text-sm text-gray-500">or drag and drop</p>
                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </label>
                            </div>

                            {/* Image Preview Grid */}
                            {images.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                                        <MdImage className="mr-1" />
                                        Uploaded Images ({images.length})
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`Product ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                                />
                                                {index === 0 && (
                                                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                                        Main
                                                    </span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                >
                                                    <MdClose className="text-lg" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        * First image will be used as the main product image
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="w-full lg:w-[calc(65%-0.5rem)]">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Product Details</h2>

                            <div className="space-y-4">
                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                {/* Category with Search */}
                                <div ref={categoryDropdownRef}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between bg-white text-left"
                                        >
                                            <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
                                                {formData.category || 'Select a category'}
                                            </span>
                                            <MdKeyboardArrowDown className={`text-xl transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isCategoryDropdownOpen && (
                                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                                <div className="p-2 border-b border-gray-200">
                                                    <div className="relative">
                                                        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={categorySearch}
                                                            onChange={(e) => setCategorySearch(e.target.value)}
                                                            placeholder="Search categories..."
                                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="max-h-60 overflow-y-auto">
                                                    {filteredCategories.length > 0 ? (
                                                        filteredCategories.map((category) => (
                                                            <button
                                                                key={category}
                                                                type="button"
                                                                onClick={() => handleCategorySelect(category)}
                                                                className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${formData.category === category ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                                                                    }`}
                                                            >
                                                                {category}
                                                            </button>
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
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter brand name"
                                    />
                                </div>

                                {/* Price and Discount */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Price (Rs) <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Discount (%)
                                        </label>
                                        <input
                                            type="number"
                                            name="discount"
                                            value={formData.discount}
                                            onChange={handleInputChange}
                                            min="0"
                                            max="100"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="0"
                                        />
                                    </div>
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
                                        required
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        placeholder="Enter product description..."
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Update Product
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="flex-1 sm:flex-none px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;