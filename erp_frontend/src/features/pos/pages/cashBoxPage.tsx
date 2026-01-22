// src/features/pos/pages/POSTerminalPage.tsx
import { useState } from 'react';
import DashboardLayout from '../../../layouts/DashboardLayout';

import search_icon from '../../../assets/icons/search_icon.svg'
import export_pdf from '../../../assets/icons/export_pdf.svg'
import export_excel from '../../../assets/icons/export_excel.svg'

// import desktop_icon from '../../../assets/icons/desktop_icon.svg'
import market_icon from '../../../assets/icons/market_icon.svg'
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg'
import date_icon from '../../../assets/icons/date_icon.svg'
// import cashier_icon from '../../../assets/icons/cashier_icon.svg'
// import { Link } from 'react-router-dom';

export default function POSCashBoxPage() {
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

                                </div>

                                {/* Cashier Selector */}
                                <div className="relative">
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <img src={market_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full pl-12 pr-10 py-3.5 bg-white text-center border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>All</option>
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

                        <div className='my-6 bg-white p-4'>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Card 1 - Opening Cash */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Opening Cash</p>
                                    <div className="flex flex-row justify-between  items-baseline gap-2">
                                        <span className="text-sm text-gray-600">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">1,462</span>
                                    </div>
                                </div>

                                {/* Card 2 - Cash Sales */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Cash Sales</p>
                                    <div className="flex flex-row justify-between  items-baseline gap-2">
                                        <span className="text-sm text-gray-600">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">1,7462</span>
                                    </div>
                                </div>

                                {/* Card 3 - Closing Cash */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Closing Cash</p>
                                    <div className="flex flex-row justify-between  items-baseline gap-2">
                                        <span className="text-sm text-gray-600">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">1,54762</span>
                                    </div>
                                </div>

                                {/* Card 4 - Total Difference */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Total Difference</p>
                                    <div className="flex flex-row justify-between items-baseline gap-2">
                                        <span className="text-sm ">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">120</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative my-6  rounded-xl bg-white px-4">
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
                           
                            {/* Table */}
                            <div className="overflow-x-auto shadow rounded-lg my-4">
                                 <div className="px-6 py-3">
                                <h2 className="text-xl font-bold text-gray-900">Transaction Log</h2>
                            </div>
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
                                                Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Reference
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                By
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