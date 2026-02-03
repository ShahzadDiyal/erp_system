// src/components/EditProductModal.tsx
import { useState, useRef, useEffect } from 'react';
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import { useCreateProductMutation } from '../../../services/inventoryApi';

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

interface Variant {
    variant_name: string;
    variant_value: string;
    cost_price: number;
    selling_price: number;
    additional_price: number;
}

export default function EditProductModal({ isOpen, onClose, mode, product }: EditProductModalProps) {
    // Basic product fields
    const [productName, setProductName] = useState(product?.name || '');
    const [sku, setSku] = useState(product?.sku || '');
    const [category, setCategory] = useState(product?.category || '');
    const [branch, setBranch] = useState(product?.branch || '');
    const [quantity, setQuantity] = useState(product?.quantity.toString() || '0');
    const [costPrice, setCostPrice] = useState(product?.cost.toString() || '');
    const [sellingPrice, setSellingPrice] = useState(product?.price.toString() || '');
    const [status, setStatus] = useState(product?.status || 'In Stock');
    const [description, setDescription] = useState(''); // New field
    const [unit, setUnit] = useState('piece'); // New field
    const [lowStockAlert, setLowStockAlert] = useState('3'); // New field
    
    // Variants management
    const [hasVariants, setHasVariants] = useState(false); // New field
    const [variants, setVariants] = useState<Variant[]>([{
        variant_name: '',
        variant_value: '',
        cost_price: 0,
        selling_price: 0,
        additional_price: 0
    }]); // New field
    
    // Images
    const [images, setImages] = useState<Array<{ file: File | null; preview: string }>>([]);
    
    // Success and error states
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [createProduct, { isLoading }] = useCreateProductMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset messages when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setShowSuccess(false);
            setShowError(false);
            setSuccessMessage('');
            setErrorMessage('');
        }
    }, [isOpen]);

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
        const imageToRemove = images[indexToRemove];
        if (imageToRemove.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    // Variant management functions
    const handleAddVariant = () => {
        setVariants([...variants, {
            variant_name: '',
            variant_value: '',
            cost_price: 0,
            selling_price: 0,
            additional_price: 0
        }]);
    };

    const handleRemoveVariant = (index: number) => {
        if (variants.length > 1) {
            setVariants(variants.filter((_, i) => i !== index));
        }
    };

    const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
        const updatedVariants = [...variants];
        updatedVariants[index] = {
            ...updatedVariants[index],
            [field]: value
        };
        
        // If variant_name is 'Storage', auto-calculate additional_price
        if (field === 'variant_name' && value === 'Storage') {
            updatedVariants[index].variant_name = 'Storage';
        }
        
        // Calculate additional_price based on selling_price and base cost price
        if (field === 'selling_price') {
            const costPriceNum = parseFloat(costPrice) || 0;
            const sellingPriceNum = typeof value === 'number' ? value : parseFloat(value as string) || 0;
            updatedVariants[index].additional_price = sellingPriceNum - costPriceNum;
        }
        
        // Calculate selling_price based on additional_price
        if (field === 'additional_price') {
            const costPriceNum = parseFloat(costPrice) || 0;
            const additionalPriceNum = typeof value === 'number' ? value : parseFloat(value as string) || 0;
            updatedVariants[index].selling_price = costPriceNum + additionalPriceNum;
        }
        
        setVariants(updatedVariants);
    };

  const handleSaveProduct = async () => {
    // Reset messages
    setShowSuccess(false);
    setShowError(false);
    setSuccessMessage('');
    setErrorMessage('');

    // Basic validation
    if (!productName.trim()) {
        setErrorMessage('Product name is required');
        setShowError(true);
        return;
    }

    if (!category) {
        setErrorMessage('Category is required');
        setShowError(true);
        return;
    }

    if (!costPrice || parseFloat(costPrice) <= 0) {
        setErrorMessage('Valid cost price is required');
        setShowError(true);
        return;
    }

    if (!sellingPrice || parseFloat(sellingPrice) <= 0) {
        setErrorMessage('Valid selling price is required');
        setShowError(true);
        return;
    }

    // Variant validation if hasVariants is true
    if (hasVariants) {
        for (const variant of variants) {
            if (!variant.variant_name || !variant.variant_value) {
                setErrorMessage('All variants must have a name and value');
                setShowError(true);
                return;
            }
            if (!variant.cost_price || variant.cost_price <= 0) {
                setErrorMessage('All variants must have a valid cost price');
                setShowError(true);
                return;
            }
            if (!variant.selling_price || variant.selling_price <= 0) {
                setErrorMessage('All variants must have a valid selling price');
                setShowError(true);
                return;
            }
        }
    }

    try {
    // Create the payload according to CreateProductPayload type
    const payload = {
        product_name: productName.trim(),
        category_id: parseInt(category) || 0,
        description: description,
        unit: unit,
        cost_price: parseFloat(costPrice) || 0,
        selling_price: parseFloat(sellingPrice) || 0,
        has_variants: hasVariants,
        low_stock_alert: parseInt(lowStockAlert) || 3,
        is_active: status !== 'Out of Stock',
        images: [], // If your API expects image URLs or base64 strings here
        variants: hasVariants ? variants.filter(v => v.variant_name && v.variant_value) : []
    };

    // Call the mutation with the correct JSON payload
    const result = await createProduct(payload).unwrap(); // LINE 252 - FIXED
    console.log('API Response:', result);
        
    } catch (error: any) {
        console.error('Product creation failed:', error);
        
        // Extract error message from API response
        let errorMsg = 'Failed to create product';
        
        if (error?.data?.errors) {
            // Handle validation errors
            const errors = error.data.errors;
            if (typeof errors === 'object') {
                const errorMessages = Object.values(errors).flat().join(', ');
                errorMsg = `Validation failed: ${errorMessages}`;
            } else {
                errorMsg = `Validation failed: ${JSON.stringify(errors)}`;
            }
        } else if (error?.data?.message) {
            errorMsg = error.data.message;
        } else if (error?.error) {
            errorMsg = error.error;
        }
        
        setErrorMessage(errorMsg);
        setShowError(true);
    }
};

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] bg-white rounded-2xl shadow-2xl z-[70] flex flex-col h-[90vh]">
                {/* Header */}
                <div className="px-8 pt-6 flex-shrink-0">
                    <h2 className="text-lg font-bold text-gray-900 text-center">
                        {mode === 'add' ? 'ADD PRODUCT' : 'EDIT PRODUCT'}
                    </h2>
                </div>

                {/* Scrollable Content */}
                <div className="px-8 py-6 space-y-6 overflow-y-auto flex-1">
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-green-700 font-medium">{successMessage}</p>
                            </div>
                            <p className="text-sm text-green-600 mt-1">Closing modal in a moment...</p>
                        </div>
                    )}

                    {/* Error Message */}
                    {showError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-700 font-medium">{errorMessage}</p>
                            </div>
                        </div>
                    )}

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
                                disabled={isLoading}
                            />
                            <label
                                htmlFor="image-upload"
                                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                            disabled={isLoading}
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

                    {/* Description Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium min-h-[100px]"
                            placeholder="Enter product description"
                            disabled={isLoading}
                        />
                    </div>

                    {/* First Row - Product Name and SKU */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                placeholder="Enter product name"
                                disabled={isLoading}
                                required
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
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Second Row - Category, Unit, and Branch */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Category *
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                                disabled={isLoading}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="1">Furniture</option>
                                <option value="2">Electronics</option>
                                <option value="3">Lighting</option>
                                <option value="4">Stationery</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Unit
                            </label>
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white text-gray-900 font-medium cursor-pointer"
                                disabled={isLoading}
                            >
                                <option value="piece">Piece</option>
                                <option value="kg">Kilogram</option>
                                <option value="meter">Meter</option>
                                <option value="liter">Liter</option>
                                <option value="box">Box</option>
                                <option value="pack">Pack</option>
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
                                disabled={isLoading}
                            >
                                <option value="">Select Branch</option>
                                <option value="Main Warehouse">Main Warehouse</option>
                                <option value="Downtown Store">Downtown Store</option>
                                <option value="Tech Store">Tech Store</option>
                                <option value="Online Store">Online Store</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 top-8 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>
                    </div>

                    {/* Third Row - Quantity, Low Stock Alert, and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Low Stock Alert
                            </label>
                            <input
                                type="number"
                                value={lowStockAlert}
                                onChange={(e) => setLowStockAlert(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                min="0"
                                placeholder="Alert when stock is below"
                                disabled={isLoading}
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
                                disabled={isLoading}
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                                <option value="Pre Order">Pre Order</option>
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
                                Cost Price (KWD) *
                            </label>
                            <input
                                type="number"
                                value={costPrice}
                                onChange={(e) => setCostPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-2">
                                Selling Price (KWD) *
                            </label>
                            <input
                                type="number"
                                value={sellingPrice}
                                onChange={(e) => setSellingPrice(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                disabled={isLoading}
                                required
                            />
                        </div>
                    </div>

                    {/* Variants Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <label className="block text-sm font-medium text-gray-600">
                                Has Variants
                            </label>
                            <button
                                type="button"
                                onClick={() => setHasVariants(!hasVariants)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${hasVariants ? 'bg-blue-600' : 'bg-gray-300'}`}
                                disabled={isLoading}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${hasVariants ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>

                        {hasVariants && (
                            <div className="space-y-4 border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium text-gray-700">Product Variants</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddVariant}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        disabled={isLoading}
                                    >
                                        + Add Variant
                                    </button>
                                </div>

                                {variants.map((variant, index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-100 rounded-lg bg-gray-50">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Variant Name
                                            </label>
                                            <select
                                                value={variant.variant_name}
                                                onChange={(e) => handleVariantChange(index, 'variant_name', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm"
                                                disabled={isLoading}
                                            >
                                                <option value="">Select Name</option>
                                                <option value="Storage">Storage</option>
                                                <option value="Color">Color</option>
                                                <option value="Size">Size</option>
                                                <option value="RAM">RAM</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Variant Value
                                            </label>
                                            <input
                                                type="text"
                                                value={variant.variant_value}
                                                onChange={(e) => handleVariantChange(index, 'variant_value', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm"
                                                placeholder="e.g., 128GB"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Cost Price
                                            </label>
                                            <input
                                                type="number"
                                                value={variant.cost_price}
                                                onChange={(e) => handleVariantChange(index, 'cost_price', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm"
                                                min="0"
                                                step="0.01"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                Selling Price
                                            </label>
                                            <input
                                                type="number"
                                                value={variant.selling_price}
                                                onChange={(e) => handleVariantChange(index, 'selling_price', parseFloat(e.target.value) || 0)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm"
                                                min="0"
                                                step="0.01"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className="flex items-end space-x-2">
                                            <div className="flex-1">
                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                    Additional Price
                                                </label>
                                                <input
                                                    type="number"
                                                    value={variant.additional_price}
                                                    onChange={(e) => handleVariantChange(index, 'additional_price', parseFloat(e.target.value) || 0)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 text-sm"
                                                    step="0.01"
                                                    disabled={isLoading}
                                                />
                                            </div>

                                            {variants.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveVariant(index)}
                                                    className="p-2 text-red-600 hover:text-red-800"
                                                    disabled={isLoading}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Buttons - Fixed at Bottom */}
                <div className="px-8 py-6 border-t border-gray-200 flex-shrink-0 bg-white rounded-b-2xl">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onClose}
                            disabled={isLoading}
                            className={`px-6 py-3 bg-[#1773CF33] text-gray-700 font-semibold rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveProduct}
                            disabled={isLoading}
                            className={`px-6 py-3 bg-[#1773CF] text-white font-semibold rounded-lg transition-colors flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-700'}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                mode === 'add' ? 'Add Product' : 'Save Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}