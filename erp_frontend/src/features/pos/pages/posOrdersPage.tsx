// src/features/pos/pages/POSTerminalPage.tsx
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

import desktop_icon from '../../../assets/icons/desktop_icon.svg'
import market_icon from '../../../assets/icons/market_icon.svg'
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg'
import date_icon from '../../../assets/icons/date_icon.svg'
import cashier_icon from '../../../assets/icons/cashier_icon.svg'
import { Link } from 'react-router-dom';

export default function POSTerminalPage() {
    const [showBulkTransfer, setShowBulkTransfer] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [showProductDetails, setShowProductDetails] = useState(false);

    const [selectedTerminal, setSelectedTerminal] = useState('POS-01 (Front Desk)');
    const [selectedBranch, setSelectedBranch] = useState('Army Market');
    const [openingCash, setOpeningCash] = useState('');

    const handleSelectAll = () => {
        if (selectedProductIds.length === products.length) {
            setSelectedProductIds([]);
        } else {
            setSelectedProductIds(products.map(p => p.id));
        }
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

    const handleViewProduct = (product: any) => {
        setSelectedProduct(product);
        setShowProductDetails(true);
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

    // Mock order data
    const products = [
        {
            id: 1,
            order: '#ORD-001',
            branch: 'Main Warehouse',
            cashier: 'Ahmed Khan',
            pay: 'Card',
            total: 299.50
        },
        {
            id: 2,
            order: '#ORD-002',
            branch: 'Downtown Store',
            cashier: 'Sarah Ali',
            pay: 'Cash',
            total: 189.00
        },
        {
            id: 3,
            order: '#ORD-003',
            branch: 'Mall Branch',
            cashier: 'John Smith',
            pay: 'Card',
            total: 450.75
        },
        {
            id: 4,
            order: '#ORD-004',
            branch: 'Tech Store',
            cashier: 'Fatima Zain',
            pay: 'Cash',
            total: 699.99
        },
        {
            id: 5,
            order: '#ORD-005',
            branch: 'Main Warehouse',
            cashier: 'Michael Brown',
            pay: 'Card',
            total: 125.50
        },
    ];

    // Transfer Stock functionality
    const handleTransferStockClick = () => {
        setShowBulkTransfer(!showBulkTransfer);
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen ">
                <div className="">
                    {/* Main Container */}
                    <div className="">
                        {/* Header Section with Dropdowns */}
                        <div className="">
                            <div className="bg-white px-8 py-4 rounded-lg grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                                {/* Date Selector */}
                                <div className="relative">
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                                            <img src={date_icon} alt="" className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="date"
                                            className="w-full pl-12 pr-10 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                                            [&::-webkit-calendar-picker-indicator]:opacity-0 
                                            [&::-webkit-calendar-picker-indicator]:absolute 
                                            [&::-webkit-calendar-picker-indicator]:w-full 
                                            [&::-webkit-calendar-picker-indicator]:h-full 
                                            [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                                            placeholder="Select Date"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <img src={dropdown_arrow_icon} alt="" className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Terminal Selector */}
                                <div className="relative">
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <img src={desktop_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedTerminal}
                                            onChange={(e) => setSelectedTerminal(e.target.value)}
                                            className="w-full py-3.5 bg-white text-center border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>POS-01 (Front Desk)</option>
                                            <option>POS-02 (Back Counter)</option>
                                            <option>POS-03 (Drive-Thru)</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>
                                </div>

                                {/* Cashier Selector */}
                                <div className="relative">
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <img src={cashier_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full pl-12 pr-10 py-3.5 bg-white text-center border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>Cashier</option>
                                            <option>Branch Manager</option>
                                            <option>Admin</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                            <img src={dropdown_arrow_icon} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative my-6  rounded-xl bg-white px-4">
                            <div className="px-6 py-3">
                                <h2 className="text-xl font-bold text-gray-900">Orders</h2>
                            </div>
                            {/* Table */}
                            <div className="overflow-x-auto shadow rounded-lg">
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
                                                Order
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Branch
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Cashier
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Pay
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Total
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
                                                    <div className="text-[14px] font-medium text-gray-900">{product.order}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] text-gray-900">{product.branch}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] text-gray-900">{product.cashier}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-3 py-2 text-xs font-medium rounded-lg ${product.pay === 'Card' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {product.pay}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-semibold text-gray-900">KWD {product.total.toFixed(2)}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                </div>
            </div>
        </DashboardLayout>
    );
}