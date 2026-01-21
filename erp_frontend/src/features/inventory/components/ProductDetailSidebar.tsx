// src/components/ProductDetailsSidebar.tsx
import { useState } from 'react';
import TransferStockModal from '../components/Transferstockmodal';
import ReportDamageModal from '../components/Reportdamagemodal';
import EditProductModal from '../components/Editproductmodal';
import InventoryMovementModal from '../components/ViewInventoryMovementModel';
import edit_icon from '../../../assets/icons/edit_icon.svg';
import restock_icon from '../../../assets/icons/restock_icon.svg';
import transfer_stock_icon from '../../../assets/icons/transfer_stock.svg';
import view_inventory from '../../../assets/icons/view_inventory.svg';
import low_inventory from '../../../assets/icons/low_stock.svg';

interface Product {
    id: number;
    name: string;
    sku: string;
    category: string;
    branch: string;
    quantity: number;
    cost: number;
    price: number;
    status: string;
    image: string;
}

interface ProductDetailsSidebarProps {
    isOpen: boolean;
    product: Product | null;
    onClose: () => void;
}

export default function ProductDetailsSidebar({ isOpen, product, onClose }: ProductDetailsSidebarProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [showDamageModal, setShowDamageModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showInventoryModal, setShowInventoryModal] = useState(false);

    if (!product) return null;

    // Mock data for demonstration - you can replace with actual data from your product
    const productImages = [
        product.image,
        product.image,
        product.image,
        product.image,
    ];

    const specifications = [
        { label: 'Category', value: 'Mobiles / Smartphones' },
        { label: 'Unit', value: 'Piece' },
        { label: 'Weight', value: '210 g' },
        { label: 'Dimensions', value: '146.7 × 71.5 × 7.7 mm' },
        { label: 'Color', value: 'Space Black' },
        { label: 'SKU', value: product.sku },
    ];

    const otherSpecifications = [
        { label: 'Storage', value: '256GB' },
        { label: 'Network', value: '5G' },
        { label: 'Warranty', value: '1 Year' },
    ];

    // Mock branch stock data - replace with actual data
    const branchStock = [
        { name: 'Warehouse', available: 120, reserved: 0, total: 120 },
        { name: 'Expo Branch', available: 15, reserved: 0, total: 15 },
        { name: 'Ardia Branch', available: 0, reserved: 0, total: 0 },
        { name: 'Qerain Branch', available: 42, reserved: 5, total: 47 },
    ];

    const profitMargin = (((product.price - product.cost) / product.cost) * 100).toFixed(1);

    const handleThumbnailClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleTransferStockClick = () => {
        setShowTransferModal(true);
    };

    const handleCloseTransferModal = () => {
        setShowTransferModal(false);
    };

    const handleReportDamageClick = () => {
        setShowDamageModal(true);
    };

    const handleCloseDamageModal = () => {
        setShowDamageModal(false);
    };

    const handleEditProductClick = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleInventoryMovementClick = () => {
        setShowInventoryModal(true);
    };

    const handleCloseInventoryModal = () => {
        setShowInventoryModal(false);
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-opacity-30 z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed right-0 top-0 bottom-0 w-full md:w-[700px] lg:w-[850px] xl:w-[950px] bg-[#F8F8F8] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="h-full overflow-y-auto">
                    {/* Sidebar Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Product Details Content */}
                    <div className="p-6 space-y-6">
                        {/* First Row: Main Image, Thumbnails, Product Details */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            {/* First Column - Main Image (Equal size with third column) */}
                            <div className="md:col-span-5 lg:col-span-5">
                                <div className="relative bg-gray-50 border border-[#0000001A] rounded-xl h-full min-h-[350px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center overflow-hidden">
                                    <img
                                        src={productImages[selectedImageIndex]}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-6"
                                    />

                                    {/* Barcode */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-md">
                                        <div className="flex flex-col items-center">
                                            <div className="flex space-x-0.5 mb-1">
                                                {[...Array(30)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className="w-0.5 bg-black"
                                                        style={{ height: `${Math.random() * 20 + 20}px` }}
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-xs font-mono">3232348462</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Second Column - Vertical Thumbnails (Smaller width) */}
                            <div className="md:col-span-2 lg:col-span-2">
                                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto h-full">
                                    {productImages.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleThumbnailClick(index)}
                                            className={`flex-shrink-0 w-20 h-20 md:w-full md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                                                selectedImageIndex === index
                                                    ? 'border-blue-500 ring-2 ring-blue-200'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <div className="w-full h-full bg-gray-50 p-2">
                                                <img
                                                    src={img}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Third Column - Product Details (Equal size with first column) */}
                            <div className="md:col-span-5 lg:col-span-5 bg-white p-4 rounded-xl">
                                <div className="space-y-4">
                                    {/* Product Title */}
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <h2 className="text-2xl font-bold text-gray-900">{product.name.toUpperCase()}</h2>
                                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                            Apple iPhone 14 Pro with A16 Bionic chip, ProMotion display, and advanced camera system.
                                        </p>
                                    </div>

                                    {/* Specifications */}
                                    <div className="space-y-3">
                                        {specifications.map((spec, index) => (
                                            <div key={index} className="flex flex-col items-start">
                                                <span className="text-sm text-gray-500 min-w-[120px]">{spec.label}</span>
                                                <span className="text-sm text-gray-900 font-semibold">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Other Specifications */}
                                    <div className="pt-3 border-t border-gray-200">
                                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Other Specifications</h4>
                                        <div className="space-y-2">
                                            {otherSpecifications.map((spec, index) => (
                                                <div key={index} className="flex items-start">
                                                    <span className="text-sm text-gray-900 font-medium min-w-[100px]">
                                                        {spec.label}:
                                                    </span>
                                                    <span className="text-sm text-gray-900 font-medium">{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Second Row: Price Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">Cost Price</p>
                                <p className="text-xl font-semibold text-gray-900 border border-[#0088FF] p-2 rounded-md text-center">
                                    KWD {product.cost}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">Selling Price</p>
                                <p className="text-xl font-semibold text-gray-900 border border-[#0088FF] p-2 rounded-md text-center">
                                    KWD {product.price}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">Profit</p>
                                <p className="text-xl font-semibold text-gray-900 border border-[#0088FF] p-2 rounded-md text-center">
                                    KWD {product.price - product.cost}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-4">
                                <p className="text-sm text-gray-500 font-semibold mb-2">Margin</p>
                                <p className="text-xl font-semibold text-gray-900 border border-[#0088FF] p-2 rounded-md text-center">
                                    {profitMargin}%
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 bg-white px-4 py-8 rounded-xl">
                            <button 
                                onClick={handleEditProductClick}
                                className="flex flex-col items-center justify-center px-4 py-10 cursor-pointer rounded-lg border border-[#0088FF] hover:bg-blue-50 transition-colors"
                            >
                                <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                                    <img src={edit_icon} alt="" />
                                </div>
                                <span className="text-md font-medium text-gray-700 text-center">Edit Product</span>
                                <span className="text-md text-gray-500">Admin Only</span>
                            </button>

                            <button
                                onClick={handleTransferStockClick}
                                className="flex flex-col items-center justify-center px-4 py-8 cursor-pointer rounded-lg border border-[#0088FF] hover:bg-blue-50 transition-colors"
                            >
                                <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                                    <img src={transfer_stock_icon} alt="" />
                                </div>
                                <span className="text-md font-medium text-gray-700 text-center">Transfer Stock</span>
                            </button>

                            <button className="flex flex-col items-center justify-center px-4 py-8 cursor-pointer rounded-lg border border-[#0088FF] hover:bg-blue-50 transition-colors">
                                <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                                    <img src={restock_icon} alt="" />
                                </div>
                                <span className="text-md font-medium text-gray-700 text-center">Restock</span>
                            </button>

                            <button 
                                onClick={handleInventoryMovementClick}
                                className="flex flex-col items-center justify-center px-4 py-8 cursor-pointer rounded-lg border border-[#0088FF] hover:bg-blue-50 transition-colors"
                            >
                                <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                                    <img src={view_inventory} alt="" />
                                </div>
                                <span className="text-md font-medium text-gray-700 text-center">View Inventory</span>
                            </button>

                            <button
                                onClick={handleReportDamageClick}
                                className="flex flex-col items-center justify-center px-4 py-8 cursor-pointer rounded-lg border border-[#0088FF] hover:bg-blue-50 transition-colors"
                            >
                                <div className="w-14 h-14 bg-gray-200 rounded-xl flex items-center justify-center mb-2">
                                    <img src={low_inventory} alt="" />
                                </div>
                                <span className="text-md font-medium text-gray-700 text-center">Report Damage</span>
                            </button>
                        </div>

                        {/* Stock By Branch Table */}
                        <div className="shadow bg-white shadow rounded-xl">
                            <h3 className="text-xl font-bold text-gray-900 px-4 py-3">Stock By Branch</h3>
                            <div className="rounded-lg overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                    Branch
                                                </th>
                                                <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                    Available
                                                </th>
                                                <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                    Reserved
                                                </th>
                                                <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {branchStock.map((branch, index) => (
                                                <tr key={index} className="hover:bg-gray-100">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {branch.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {branch.available}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {branch.reserved}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                        {branch.total}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transfer Stock Modal */}
            <TransferStockModal
                isOpen={showTransferModal}
                onClose={handleCloseTransferModal}
                product={product ? { name: product.name, sku: product.sku } : null}
            />

            {/* Report Damage Modal */}
            <ReportDamageModal
                isOpen={showDamageModal}
                onClose={handleCloseDamageModal}
                product={product ? { name: product.name, branch: product.branch, quantity: product.quantity } : null}
            />

            {/* Edit Product Modal */}
           <EditProductModal
    isOpen={showEditModal}
    onClose={handleCloseEditModal}
    mode="edit"
    product={product}
/>

            {/* Inventory Movement Modal */}
            <InventoryMovementModal
                isOpen={showInventoryModal}
                onClose={handleCloseInventoryModal}
                product={product ? { name: product.name, sku: product.sku } : null}
            />
        </>
    );
}