// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useState } from 'react';
import icon_1 from '../../../assets/icons/icon_1.svg'
import icon_2 from '../../../assets/icons/icon_2.png'
import icon_3 from '../../../assets/icons/icon_3.png'
import icon_4 from '../../../assets/icons/icon_4.png'

// Import your icons for buttons
import icon_5 from '../../../assets/icons/icon_5.svg';
import icon_6 from '../../../assets/icons/icon_6.svg';
import icon_7 from '../../../assets/icons/icon_7.svg';
import icon_8 from '../../../assets/icons/icon_8.svg';
import addIcon from '../../../assets/icons/icon_9.svg';
import exportIcon from '../../../assets/icons/icon_10.svg';
import searchIcon from '../../../assets/icons/icon_11.svg';
import filterIcon from '../../../assets/icons/icon_11.svg';
import viewIcon from '../../../assets/icons/icon_11.svg';
import editIcon from '../../../assets/icons/icon_11.svg';
import deleteIcon from '../../../assets/icons/icon_11.svg';


export default function DashboardPage() {
    const [showProductDetails, setShowProductDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
      <button className="flex items-center space-x-4 bg-white rounded-lg p-4 border border-blue-600 hover:border-blue-700 hover:shadow-sm transition-all w-full">
        <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
          <img src={addIcon} alt="Add Product" className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-lg font-medium text-gray-900">Add New Product</span>
        </div>
      </button>

      <button className="flex items-center space-x-4 bg-white rounded-lg p-4 border border-blue-600 hover:border-blue-700 hover:shadow-sm transition-all w-full">
        <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
          <img src={exportIcon} alt="Export Data" className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-lg font-medium text-gray-900">Export Data</span>
        </div>
      </button>
    </div>

    {/* Row 2: Two buttons */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button className="flex items-center space-x-4 bg-white rounded-lg p-4 border border-blue-600 hover:border-blue-700 hover:shadow-sm transition-all w-full">
        <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
          <img src={filterIcon} alt="Quick Reports" className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-lg font-medium text-gray-900">Quick Reports</span>
        </div>
      </button>

      <button className="flex items-center space-x-4 bg-white rounded-lg p-4 border border-blue-600 hover:border-blue-700 hover:shadow-sm transition-all w-full">
        <div className="w-12 h-12 rounded-lg bg-[#ECF0F4] flex items-center justify-center flex-shrink-0">
          <img src={searchIcon} alt="Stock Check" className="w-6 h-6" />
        </div>
        <div className="text-left">
          <span className="text-lg font-medium text-gray-900">Stock Check</span>
        </div>
      </button>
    </div>
  </div>
</div>
                </div>

                {/* Products Table Section */}
                <div className="bg-white rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Product Inventory</h2>
                        <p className="text-gray-600 mt-1">Manage your products and inventory levels</p>
                    </div>

                    {/* Filters Row */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {/* Date Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option>All Time</option>
                                    <option>Today</option>
                                    <option>Last 7 Days</option>
                                    <option>This Month</option>
                                    <option>This Year</option>
                                </select>
                            </div>

                            {/* Branches Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Branches</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option>All Branches</option>
                                    <option>Main Warehouse</option>
                                    <option>Downtown Store</option>
                                    <option>Tech Store</option>
                                    <option>Online Store</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option>All Categories</option>
                                    <option>Furniture</option>
                                    <option>Electronics</option>
                                    <option>Lighting</option>
                                    <option>Stationery</option>
                                </select>
                            </div>

                            {/* Stock Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    <option>All Status</option>
                                    <option>In Stock</option>
                                    <option>Low Stock</option>
                                    <option>Out of Stock</option>
                                    <option>Pre Order</option>
                                </select>
                            </div>

                            {/* Filter Icon Button */}
                            <div className="flex items-end">
                                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    <img src={filterIcon} alt="Filter" className="w-5 h-5" />
                                    <span className="text-sm font-medium text-gray-700">More Filters</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search and Actions Row */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Search Field */}
                            <div className="relative w-full sm:w-auto">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <img src={searchIcon} alt="Search" className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-[360px]"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-3 w-full sm:w-auto">
                                <button className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                    <img src={addIcon} alt="Add" className="w-5 h-5" />
                                    <span className="text-sm font-medium">Add Product</span>
                                </button>

                                <button className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                                    <img src={exportIcon} alt="Export" className="w-5 h-5" />
                                    <span className="text-sm font-medium text-gray-700">Export</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className={`relative ${showProductDetails ? 'flex' : 'block'}`}>
                        {/* Table */}
                        <div className={`overflow-x-auto ${showProductDetails ? 'w-2/3' : 'w-full'}`}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Image
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Product Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            SKU
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Branch
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Cost (KWD)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price (KWD)
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="w-12 h-12 rounded overflow-hidden">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 font-mono">{product.sku}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.branch}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{product.quantity}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{product.cost.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-semibold text-gray-900">{product.price.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
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
                                                        className="flex items-center space-x-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                                                    >
                                                        <img src={viewIcon} alt="View" className="w-4 h-4" />
                                                        <span className="text-sm font-medium">View</span>
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-blue-600">
                                                        <img src={editIcon} alt="Edit" className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-1.5 text-gray-400 hover:text-red-600">
                                                        <img src={deleteIcon} alt="Delete" className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Product Details Sidebar */}
                        {showProductDetails && selectedProduct && (
                            <>
                                {/* Overlay */}
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                                    onClick={() => setShowProductDetails(false)}
                                />

                                {/* Sidebar */}
                                <div className="fixed right-0 top-0 bottom-0 w-1/3 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
                                    <div className="h-full overflow-y-auto">
                                        {/* Sidebar Header */}
                                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-gray-900">Product Details</h3>
                                                <button
                                                    onClick={() => setShowProductDetails(false)}
                                                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        {/* Product Details Content */}
                                        <div className="p-6 space-y-6">
                                            {/* Product Image */}
                                            <div className="flex justify-center">
                                                <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-200">
                                                    <img
                                                        src={selectedProduct.image}
                                                        alt={selectedProduct.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>

                                            {/* Product Info */}
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h4>
                                                    <p className="text-gray-600 mt-1">SKU: {selectedProduct.sku}</p>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">Category</p>
                                                        <p className="text-sm font-medium text-gray-900">{selectedProduct.category}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Branch</p>
                                                        <p className="text-sm font-medium text-gray-900">{selectedProduct.branch}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Quantity</p>
                                                        <p className="text-sm font-medium text-gray-900">{selectedProduct.quantity} units</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-500">Status</p>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${selectedProduct.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                                                                selectedProduct.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'
                                                            }`}>
                                                            {selectedProduct.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Pricing */}
                                                <div className="pt-4 border-t border-gray-200">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <p className="text-sm text-gray-500">Cost Price</p>
                                                            <p className="text-lg font-semibold text-gray-900">KWD {selectedProduct.cost.toLocaleString()}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500">Selling Price</p>
                                                            <p className="text-lg font-semibold text-blue-600">KWD {selectedProduct.price.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500">Profit Margin</p>
                                                        <p className="text-sm font-semibold text-green-600">
                                                            {(((selectedProduct.price - selectedProduct.cost) / selectedProduct.cost) * 100).toFixed(1)}%
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="pt-4 border-t border-gray-200">
                                                    <div className="flex space-x-3">
                                                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                            <img src={editIcon} alt="Edit" className="w-5 h-5" />
                                                            <span className="text-sm font-medium">Edit Product</span>
                                                        </button>
                                                        <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                            <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                                                            <span className="text-sm font-medium text-gray-700">Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="px-6 py-4 border-t border-gray-200">
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
        </DashboardLayout>
    );
}