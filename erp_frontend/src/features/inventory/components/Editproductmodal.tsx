// src/components/EditProductModal.tsx
import { useState, useRef } from 'react';
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode: 'add' | 'edit';
    product?: {
        id: number;
        name: string;
        sku: string;
        category: string;
        branch: string;
        quantity: number;
        cost: number;
        price: number;
        status: string;
        image?: string;
    } | null;
}

export default function EditProductModal({ isOpen, onClose, mode, product }: EditProductModalProps) {
    const [productName, setProductName] = useState(product?.name || '');
    const [sku, setSku] = useState(product?.sku || '');
    const [category, setCategory] = useState(product?.category || '');
    const [branch, setBranch] = useState(product?.branch || '');
    const [quantity, setQuantity] = useState(product?.quantity.toString() || '');
    const [costPrice, setCostPrice] = useState(product?.cost.toString() || '');
    const [sellingPrice, setSellingPrice] = useState(product?.price.toString() || '');
    const [status, setStatus] = useState(product?.status || 'In Stock');
    const [images, setImages] = useState<Array<{ file: File | null; preview: string }>>([]);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!isOpen) return null;

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages: Array<{ file: File; preview: string }> = [];
        const remainingSlots = 10 - images.length;
        const filesToProcess = Math.min(files.length, remainingSlots);

        for (let i = 0; i < filesToProcess; i++) {
            const file = files[i];
            if (file.type.startsWith('image/')) {
                const preview = URL.createObjectURL(file);
                newImages.push({ file, preview });
            }
        }

        setImages([...images, ...newImages]);
        
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    const handleSaveProduct = () => {
        // Handle save logic here
        console.log('Save Product:', {
            productName,
            sku,
            category,
            branch,
            quantity,
            costPrice,
            sellingPrice,
            status,
            images,
        });
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-opacity-50 z-[60] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col h-[90vh]">
                {/* Header */}
                <div className="px-8 pt-6 flex-shrink-0">
                    <h2 className="text-lg   font-bold text-gray-900 text-center">
                        {mode === 'add' ? 'ADD PRODUCT' : 'EDIT PRODUCT'}
                    </h2>
                </div>

                {/* Scrollable Content */}
                <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-3">
                            Product Images (Max 10)
                        </label>
                        
                        {/* Upload Area */}
                        <div className="mb-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageSelect}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                            >
                                <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-sm text-gray-600">Click to upload images</span>
                                <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
                                <span className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (Max 10 images)</span>
                            </label>
                        </div>

                        {/* Image Preview Grid */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-5 gap-3">
                                {images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-all"
                                    >
                                        <img
                                            src={image.preview}
                                            alt={`Product ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        
                                        {/* Remove Button - Shows on hover */}
                                        <button
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        {/* Image number indicator */}
                                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                                            {index + 1}
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Show remaining slots */}
                                {images.length < 10 && (
                                    <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                        <span className="text-xs text-gray-400">
                                            {10 - images.length} more
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* First Row - Product Name and SKU */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Product Name
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                placeholder="Enter product name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                SKU
                            </label>
                            <input
                                type="text"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                placeholder="Enter SKU"
                            />
                        </div>
                    </div>

                    {/* Second Row - Category and Branch */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                <option>Furniture</option>
                                <option>Electronics</option>
                                <option>Lighting</option>
                                <option>Stationery</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Branch
                            </label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                            >
                                <option value="">Select Branch</option>
                                <option>Main Warehouse</option>
                                <option>Downtown Store</option>
                                <option>Tech Store</option>
                                <option>Online Store</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Third Row - Quantity and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Quantity
                            </label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                min="0"
                                placeholder="Enter quantity"
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                            >
                                <option>In Stock</option>
                                <option>Low Stock</option>
                                <option>Out of Stock</option>
                                <option>Pre Order</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Fourth Row - Cost Price and Selling Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Cost Price (KWD)
                            </label>
                            <input
                                type="number"
                                value={costPrice}
                                onChange={(e) => setCostPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Selling Price (KWD)
                            </label>
                            <input
                                type="number"
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Buttons - Fixed at Bottom */}
                <div className="px-8 py-6 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-[#1773CF33] cursor-pointer text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveProduct}
                            className="px-6 py-3 bg-[#1773CF] cursor-pointer text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {mode === 'add' ? 'Add Product' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}