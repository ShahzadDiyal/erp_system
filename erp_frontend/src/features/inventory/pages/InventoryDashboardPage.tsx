// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetailsSidebar from '../components/ProductDetailSidebar';
import EditProductModal from '../components/Editproductmodal';

import icon_1 from '../../../assets/icons/low_stock.svg'
import icon_2 from '../../../assets/icons/pending_transfer.svg'
import icon_3 from '../../../assets/icons/total_prod.svg'
import icon_4 from '../../../assets/icons/unit_stock.svg'
import addIcon from '../../../assets/icons/add.svg';
import transfer_stock from '../../../assets/icons/transfer_stock.svg';
// import exportIcon from '../../../assets/icons/excel.svg';
import bulk_discount from '../../../assets/icons/bulk_discount.svg';
import inventory_report from '../../../assets/icons/inventory_report.svg';
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import export_excel from '../../../assets/icons/export_excel.svg';
import export_pdf from '../../../assets/icons/export_pdf.svg';
import search_icon from '../../../assets/icons/search_icon.svg';
import filterIcon from '../../../assets/icons/filter_icon.svg';

export default function DashboardPage() {
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showBulkTransfer, setShowBulkTransfer] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

    // Mock product data
    const products = [
        {
            id: 1,
            name: 'Ergonomic Office Chair',
            sku: 'CHAIR-001',
            category: 'Furniture',
            branch: 'Main Warehouse',
            quantity: 45,
            cost: 150,
            price: 299,
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop'
        },
        {
            id: 2,
            name: 'Wireless Keyboard',
            sku: 'KB-202',
            category: 'Electronics',
            branch: 'Downtown Store',
            quantity: 23,
            cost: 45,
            price: 89,
            status: 'Low Stock',
            image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=150&h=150&fit=crop'
        },
        {
            id: 3,
            name: 'Desk Lamp LED',
            sku: 'LAMP-789',
            category: 'Lighting',
            branch: 'Main Warehouse',
            quantity: 0,
            cost: 25,
            price: 49,
            status: 'Out of Stock',
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&h=150&fit=crop'
        },
        {
            id: 4,
            name: 'Monitor 27" 4K',
            sku: 'MON-456',
            category: 'Electronics',
            branch: 'Tech Store',
            quantity: 12,
            cost: 450,
            price: 699,
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=150&h=150&fit=crop'
        },
        {
            id: 5,
            name: 'Notebook Set',
            sku: 'NOTE-123',
            category: 'Stationery',
            branch: 'Main Warehouse',
            quantity: 150,
            cost: 5,
            price: 12,
            status: 'In Stock',
            image: 'https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?w=150&h=150&fit=crop'
        },
    ];

    const handleViewProduct = (product: any) => {
        setSelectedProduct(product);
        setShowProductDetails(true);
    };

    const handleCloseSidebar = () => {
        setShowProductDetails(false);
    };

    // Add Product functionality
    const handleAddProductClick = () => {
        setShowAddProductModal(true);
    };

    const handleCloseAddProductModal = () => {
        setShowAddProductModal(false);
    };

    // Transfer Stock functionality
    const handleTransferStockClick = () => {
        setShowBulkTransfer(!showBulkTransfer);
        setSelectedProductIds([]);
    };

    const handleProductSelect = (productId: number) => {
        setSelectedProductIds(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedProductIds.length === products.length) {
            setSelectedProductIds([]);
        } else {
            setSelectedProductIds(products.map(p => p.id));
        }
    };

    const handleBulkTransfer = () => {
        if (selectedProductIds.length === 0) {
            alert('Please select at least one product to transfer');
            return;
        }
        // Handle bulk transfer logic here
        console.log('Transfer products:', selectedProductIds);
        alert(`Transferring ${selectedProductIds.length} product(s)`);
        // You can open a transfer modal here or navigate to transfer page
    };



    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* First Row: Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Column 1: 4 Cards (2x2 grid) */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <div className="bg-white rounded-lg p-6">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-lg font-medium text-gray-600">Total Products</p>
                                        <p className="text-[24px] font-semibold text-gray-900 mt-6">54543</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                        <img src={icon_3} alt="Revenue" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-white rounded-lg p-6">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-lg font-medium text-gray-600">Total Stock Units</p>
                                        <p className="text-[24px] font-semibold text-gray-900 mt-6">6644</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                        <img src={icon_4} alt="Pending Orders" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-white rounded-lg p-6">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-lg font-medium text-gray-600">Low Stock Products</p>
                                        <p className="text-[24px] font-semibold text-gray-900 mt-6">23</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                        <img src={icon_1} alt="Low Stock" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-white rounded-lg p-6">
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-lg font-medium text-gray-600">Pending Transfers</p>
                                        <p className="text-[24px] font-semibold text-gray-900 mt-6">3 Requests</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                        <img src={icon_2} alt="Pending Approvals" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: 4 Buttons in gray background section */}
                    <div className="bg-white rounded-lg p-6 items-center">
                        <div className="space-y-4">
                            {/* Row 1: Two buttons */}
                            <div className='text-center'>
                                <p className='text-xl align-center font-semibold'>Quick Actions</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={handleAddProductClick}
                                    className="flex items-center space-x-4 bg-white rounded-lg p-6 border-2 border-[#0088FF] hover:border-blue-700 hover:shadow-sm transition-all w-full cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
                                        <img src={addIcon} alt="Add Product" className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-lg font-medium text-gray-900">Add Product</span>
                                    </div>
                                </button>

                                <button
                                    onClick={handleTransferStockClick}
                                    className={`flex items-center space-x-4 bg-white rounded-lg p-6 border-2 hover:border-blue-700 hover:shadow-sm transition-all w-full cursor-pointer ${showBulkTransfer ? 'border-blue-700 bg-blue-50' : 'border-[#0088FF]'
                                        }`}
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
                                        <img src={transfer_stock} alt="Export Data" className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-lg font-medium text-gray-900">Transfer Stock</span>
                                    </div>
                                </button>
                            </div>

                            {/* Row 2: Two buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    className="flex items-center space-x-4 bg-white rounded-lg p-6 border-2  border-[#0088FF] hover:border-blue-700 hover:shadow-sm transition-all w-full cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
                                        <img src={bulk_discount} alt="Quick Reports" className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-lg font-medium text-gray-900">Bulk Discount(Excel)</span>
                                    </div>
                                </button>

                                <Link to="/inventory/reports"
                                    className="flex items-center space-x-4 bg-white rounded-lg p-6 border-2  border-[#0088FF] hover:border-blue-700 hover:shadow-sm transition-all w-full cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
                                        <img src={inventory_report} alt="Stock Check" className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-lg font-medium text-gray-900">Inventory Reports</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Table Section */}
                <div className="bg-white rounded-xl overflow-hidden">
                    {/* Filters Row */}
                    <div className="p-6">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                            {/* Date Filter */}
                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Date</option>
                                    <option>Today</option>
                                    <option>Last 7 Days</option>
                                    <option>This Month</option>
                                    <option>This Year</option>
                                </select>

                                {/* Custom dropdown arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option> Branches</option>
                                    <option>Main Warehouse</option>
                                    <option>Downtown Store</option>
                                    <option>Tech Store</option>
                                    <option>Online Store</option>
                                </select>

                                {/* Custom dropdown arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Categories</option>
                                    <option>Furniture</option>
                                    <option>Electronics</option>
                                    <option>Lighting</option>
                                    <option>Stationery</option>
                                </select>

                                {/* Custom dropdown arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Stock Status</option>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Out of Stock</option>
                                    <option>Pre Order</option>
                                </select>

                                {/* Custom dropdown arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <img src={dropdown_arrow_icon} alt="" />
                                </div>
                            </div>

                            {/* Filter Icon Button - Fixed small width */}
                            <div className="flex-shrink-0">
                                <button className="w-14 h-14 flex items-center justify-center cursor-pointer">
                                    <img src={filterIcon} alt="Filter" className="w-7 h-7" />
                                </button>
                            </div>
                        </div>

                        {/* Search and Actions Row */}
                        <div className="pt-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Search Field */}
                                <div className="relative w-full sm:w-auto">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <img src={search_icon} alt="Search" className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by Invoice No, Supplier Name…"
                                        className="pl-10 pr-4 py-2.5 border border-[#00000080] rounded-lg focus:border-blue-500 w-full sm:w-[360px]"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-3 w-full sm:w-auto">
                                    <button className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer transition-colors w-full sm:w-auto">
                                        <img src={export_pdf} alt="Add" className="w-7 h-7" />
                                        <span className="text-lg font-medium text-black">Export PDF</span>
                                    </button>

                                    <button className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg cursor-pointer transition-colors w-full sm:w-auto">
                                        <img src={export_excel} alt="Export" className="w-7 h-7" />
                                        <span className="text-lg font-medium text-gray-700">Export Excel</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="relative mx-6 shadow rounded-xl">
                        <div className="px-6 py-3">
                            <h2 className="text-xl font-bold text-gray-900">PRODUCT LIST (MASTER INVENTORY)</h2>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        {/* Checkbox Column - Shows when bulk transfer is active */}
                                        {showBulkTransfer && (
                                            <th className="px-6 py-3 text-left">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProductIds.length === products.length}
                                                    onChange={handleSelectAll}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                />
                                            </th>
                                        )}
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Product Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            SKU
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Branch
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Cost (KWD)
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Price (KWD)
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            {/* Checkbox Column */}
                                            {showBulkTransfer && (
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedProductIds.includes(product.id)}
                                                        onChange={() => handleProductSelect(product.id)}
                                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                    />
                                                </td>
                                            )}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] text-gray-900 font-mono">{product.sku}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-3 py-1 text-xs font-medium">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] text-gray-900">{product.branch}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] font-medium text-gray-900">{product.quantity}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] font-medium text-gray-900">{product.cost.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] font-semibold text-gray-900">{product.price.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-2 text-xs font-medium rounded-lg ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                                        product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleViewProduct(product)}
                                                        className="flex items-center space-x-1 px-3 py-1.5 text-blue-600"
                                                    >
                                                        <span className="text-[14px] font-medium cursor-pointer">View</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Bulk Transfer Button - Shows when products are selected */}
                        {showBulkTransfer && selectedProductIds.length > 0 && (
                            <div className="px-6 py-4 bg-blue-50 border-t border-blue-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        {selectedProductIds.length} product(s) selected
                                    </span>
                                    <button
                                        onClick={handleBulkTransfer}
                                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Transfer Selected Products
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of <span className="font-medium">50</span> products
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    Previous
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                                    1
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    2
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    3
                                </button>
                                <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Details Sidebar */}
            <ProductDetailsSidebar
                isOpen={showProductDetails}
                product={selectedProduct}
                onClose={handleCloseSidebar}
            />

            {/* Add Product Modal */}
            <EditProductModal
                isOpen={showAddProductModal}
                onClose={handleCloseAddProductModal}
                mode="add"
                product={null}
            />
        </DashboardLayout>
    );
}