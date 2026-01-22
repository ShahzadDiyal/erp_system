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

export default function POSShiftReportPage() {
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


    // Mock shift data
    const products = [
        {
            id: 1,
            cashier: 'Ahmed Khan',
            branch: 'Main Warehouse',
            shiftTime: '09:00 - 17:00',
            openingCash: 1000.00,
            cashSales: 1462.50,
            cardSales: 2340.00,
            refunds: 120.00,
            actualCash: 2342.50,
            difference: 0.00,
            orders: 45,
            status: 'Closed'
        },
        {
            id: 2,
            cashier: 'Sarah Ali',
            branch: 'Downtown Store',
            shiftTime: '10:00 - 18:00',
            openingCash: 800.00,
            cashSales: 1189.00,
            cardSales: 1890.50,
            refunds: 50.00,
            actualCash: 1939.00,
            difference: 0.00,
            orders: 32,
            status: 'Closed'
        },
        {
            id: 3,
            cashier: 'John Smith',
            branch: 'Mall Branch',
            shiftTime: '11:00 - 19:00',
            openingCash: 1200.00,
            cashSales: 2450.75,
            cardSales: 3200.00,
            refunds: 200.00,
            actualCash: 3450.75,
            difference: 0.00,
            orders: 67,
            status: 'Active'
        },
        {
            id: 4,
            cashier: 'Fatima Zain',
            branch: 'Tech Store',
            shiftTime: '08:00 - 16:00',
            openingCash: 1500.00,
            cashSales: 3699.99,
            cardSales: 4500.00,
            refunds: 350.00,
            actualCash: 4849.99,
            difference: -150.00,
            orders: 89,
            status: 'Closed'
        },
        {
            id: 5,
            cashier: 'Michael Brown',
            branch: 'Main Warehouse',
            shiftTime: '12:00 - 20:00',
            openingCash: 900.00,
            cashSales: 925.50,
            cardSales: 1650.00,
            refunds: 75.00,
            actualCash: 1750.50,
            difference: -100.00,
            orders: 28,
            status: 'Active'
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
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                            <img src={market_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full pl-12 pr-10 py-3.5 bg-white text-center border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>All Branches</option>
                                            <option>Branch Manager</option>
                                            <option>Admin</option>
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
                                            <img src={market_icon} alt="" />
                                        </div>
                                        <select
                                            value={selectedBranch}
                                            onChange={(e) => setSelectedBranch(e.target.value)}
                                            className="w-full pl-12 pr-10 py-3.5 bg-white text-center border border-gray-200 rounded-sm text-gray-900 font-medium text-base appearance-none cursor-pointer hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        >
                                            <option>All Cashiers</option>
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
                                    <p className="text-sm font-medium text-gray-500 mb-3">Total Shifts</p>
                                    <div className="flex flex-row justify-between  items-baseline gap-2">
                                        <span className="text-sm text-gray-600">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">1,462</span>
                                    </div>
                                </div>

                                {/* Card 2 - Cash Sales */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Total Sales</p>
                                    <div className="flex flex-row justify-between  items-baseline gap-2">
                                        <span className="text-sm text-gray-600">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">1,7462</span>
                                    </div>
                                </div>

                                {/* Card 3 - Closing Cash */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Cash Difference</p>
                                    <div className="flex flex-row justify-between  items-baseline gap-2">
                                        <span className="text-sm text-gray-600">KWD</span>
                                        <span className="text-3xl font-semibold text-gray-900">1,54762</span>
                                    </div>
                                </div>

                                {/* Card 4 - Total Difference */}
                                <div className="bg-white rounded-lg p-6 shadow">
                                    <p className="text-sm font-medium text-gray-500 mb-3">Active Cashiers</p>
                                    <div className="flex flex-row justify-between items-baseline gap-2">
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
                                <h2 className="text-xl font-bold text-gray-900">Cashier Shift Details</h2>
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
                                                Cashier
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Branch
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Shift Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Opening Cash
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Cash Sales
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Card Sales
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Refunds
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Actual Cash
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Difference
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Orders
                                            </th>
                                            <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                                Status
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
                                                    <div className="text-[14px] font-medium text-gray-900">{product.cashier}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] text-gray-900">{product.branch}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] text-gray-900">{product.shiftTime}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-medium text-gray-900">KWD {product.openingCash.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-medium text-gray-900">KWD {product.cashSales.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-medium text-gray-900">KWD {product.cardSales.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-medium text-red-600">KWD {product.refunds.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-semibold text-gray-900">KWD {product.actualCash.toFixed(2)}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className={`text-[14px] font-semibold ${product.difference === 0 ? 'text-gray-900' : product.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {product.difference > 0 ? '+' : ''}{product.difference.toFixed(2)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-[14px] font-medium text-gray-900">{product.orders}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-3 py-2 text-xs font-medium rounded-lg ${
                                                        product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {product.status}
                                                    </span>
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