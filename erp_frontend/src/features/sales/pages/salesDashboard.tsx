// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
// import { useAppSelector } from '../../../app/hooks';
import icon_1 from '../../../assets/icons/icon_1.svg'
import icon_2 from '../../../assets/icons/icon_2.png'
import icon_3 from '../../../assets/icons/icon_3.png'
import icon_4 from '../../../assets/icons/icon_4.png'
import icon_5 from '../../../assets/icons/icon_5.svg'
import icon_6 from '../../../assets/icons/arrow_top_green.svg'
import icon_7 from '../../../assets/icons/icon_7.svg'
import icon_8 from '../../../assets/icons/icon_8.svg'
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import filterIcon from '../../../assets/icons/filter_icon.svg';
 


import { useState } from 'react';
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Types for revenue data
interface RevenueDataPoint {
    day: string;
    revenue: number;
    previousPeriod?: number;
}

interface TimeframeData {
    label: string;
    totalRevenue: number;
    changePercentage: number;
    dataPoints: RevenueDataPoint[];
    periodLabel: string;
}

// Static data that can be easily replaced
const revenueData: Record<'weekly' | 'monthly' | 'yearly', TimeframeData> = {
    weekly: {
        label: 'Weekly',
        totalRevenue: 12743,
        changePercentage: 12.5,
        periodLabel: 'This Week',
        dataPoints: [
            { day: 'Mon', revenue: 1000, previousPeriod: 900 },
            { day: 'Tue', revenue: 800, previousPeriod: 1100 },
            { day: 'Wed', revenue: 1100, previousPeriod: 1000 },
            { day: 'Thu', revenue: 1300, previousPeriod: 1270 },
            { day: 'Fri', revenue: 1600, previousPeriod: 1800 },
            { day: 'Sat', revenue: 1000, previousPeriod: 950 },
            { day: 'Sun', revenue: 1400, previousPeriod: 2300 },
        ]
    },
    monthly: {
        label: 'Monthly',
        totalRevenue: 48750,
        changePercentage: 8.2,
        periodLabel: 'This Month',
        dataPoints: [
            { day: 'Week 1', revenue: 11500, previousPeriod: 10800 },
            { day: 'Week 2', revenue: 12500, previousPeriod: 11800 },
            { day: 'Week 3', revenue: 12750, previousPeriod: 12000 },
            { day: 'Week 4', revenue: 12000, previousPeriod: 11200 },
        ]
    },
    yearly: {
        label: 'Yearly',
        totalRevenue: 585000,
        changePercentage: 15.3,
        periodLabel: 'This Year',
        dataPoints: [
            { day: 'Jan', revenue: 45000, previousPeriod: 42000 },
            { day: 'Feb', revenue: 48000, previousPeriod: 44000 },
            { day: 'Mar', revenue: 52000, previousPeriod: 48000 },
            { day: 'Apr', revenue: 49000, previousPeriod: 45000 },
            { day: 'May', revenue: 51000, previousPeriod: 47000 },
            { day: 'Jun', revenue: 53000, previousPeriod: 49000 },
            { day: 'Jul', revenue: 50000, previousPeriod: 46000 },
            { day: 'Aug', revenue: 52000, previousPeriod: 48000 },
            { day: 'Sep', revenue: 54000, previousPeriod: 50000 },
            { day: 'Oct', revenue: 56000, previousPeriod: 52000 },
            { day: 'Nov', revenue: 58000, previousPeriod: 54000 },
            { day: 'Dec', revenue: 60000, previousPeriod: 55000 },
        ]
    }
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 rounded-lg ">
                <p className="text-sm font-medium text-gray-900">{label}</p>
                <p className="text-sm text-blue-600">
                    Revenue: ${payload[0].value.toLocaleString()}
                </p>
                {payload[1] && (
                    <p className="text-sm text-gray-500">
                        Previous: ${payload[1].value.toLocaleString()}
                    </p>
                )}
            </div>
        );
    }
    return null;
};

export default function SalesDashboardPage() {
    // const { user } = useAppSelector((state) => state.auth);
    const [selectedTimeframe, setSelectedTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
    const [isExpanded, setIsExpanded] = useState(false);
 

    const [showBulkTransfer] = useState(false);
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);

    const currentData = revenueData[selectedTimeframe];


    const products = [
        {
            id: 1,
            orderId: 'ORD-2024-001',
            source: 'Website',
            invoiceType: 'Sales Invoice',
            customer: 'John Smith',
            date: '2024-01-15',
            amount: 1250.50,
            payment: 'Credit Card',
            status: 'Paid',
        },
        {
            id: 2,
            orderId: 'ORD-2024-002',
            source: 'POS',
            invoiceType: 'Sales Invoice',
            customer: 'Sarah Johnson',
            date: '2024-01-16',
            amount: 890.00,
            payment: 'Cash',
            status: 'Paid',
        },
        {
            id: 3,
            orderId: 'ORD-2024-003',
            source: 'Mobile App',
            invoiceType: 'Proforma Invoice',
            customer: 'Michael Brown',
            date: '2024-01-17',
            amount: 2340.75,
            payment: 'Bank Transfer',
            status: 'Pending',
        },
        {
            id: 4,
            orderId: 'ORD-2024-004',
            source: 'Website',
            invoiceType: 'Sales Invoice',
            customer: 'Emily Davis',
            date: '2024-01-18',
            amount: 567.25,
            payment: 'Credit Card',
            status: 'Paid',
        },
        {
            id: 5,
            orderId: 'ORD-2024-005',
            source: 'POS',
            invoiceType: 'Credit Note',
            customer: 'Robert Wilson',
            date: '2024-01-19',
            amount: 1890.00,
            payment: 'Cash',
            status: 'Refunded',
        },
    ];


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

    

     

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Welcome Section */}
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* ... existing stats grid cards ... */}
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-lg font-medium text-gray-600">Total Sales (Today)</p>
                                <p className="text-[24px] font-semibold text-gray-900 mt-10">$ 12,450</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                <img src={icon_3} alt="" />
                            </div>
                        </div>
                        <div className='flex flex-row items-center mt-2'>
                            <img src={icon_6} alt="" className='w-6 h-6 mr-2' />
                            <p className="text-md font-semibold text-green-600 ">+24% vs last week</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 ">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-lg font-medium text-gray-600">Total Orders</p>
                                <p className="text-[24px] font-semibold text-gray-900 mt-10">156</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                <img src={icon_4} alt="" />
                            </div>
                        </div>
                        <div className='flex flex-row items-center mt-2'>
                            <img src={icon_7} alt="" className='w-6 h-6 mr-2' />
                            <p className="text-md font-semibold text-red-600">+24% vs last week</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-lg font-medium text-gray-600">B2B</p>
                                <p className="text-[24px] font-semibold text-gray-900 mt-10">23</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                <img src={icon_1} alt="" />
                            </div>
                        </div>
                        <div className='flex flex-row items-center mt-2'>
                            <img src={icon_8} alt="" className='w-6 h-6 mr-2' />
                            <p className="text-md font-semibold text-red-600">+ 2 New Items</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-lg font-medium text-gray-600">Unpaid Invoices</p>
                                <p className="text-[24px] font-semibold text-gray-900 mt-10">2,847</p>
                            </div>
                            <div className="w-12 h-12 rounded-lg bg-[#F7F9FB] flex items-center justify-center">
                                <img src={icon_2} alt="" />
                            </div>
                        </div>
                        <div className='flex flex-row items-center mt-2'>
                            <img src={icon_5} alt="" className='w-6 h-6 mr-2' />
                            <p className="text-md font-semibold text-gray-600">requests awaiting admin approval</p>
                        </div>
                    </div>
                </div>

                {/* Revenue Analysis Section */}
                <div className="border border-[#00C0E8] rounded-xl">
                    {/* Header - Always Visible - Clickable */}
                    <div
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-6 cursor-pointer bg-white rounded-xl"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        {!isExpanded && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Revenue Analysis</h2>
                                <p className="text-sm text-gray-600 mt-1">Sales performance across all channels</p>
                            </div>
                        )}
                        {/* Dropdown Arrow */}
                        <div className={`mt-3 sm:mt-0 ${isExpanded ? 'ml-auto' : ''}`}>
                           <img src={dropdown_arrow_icon} alt="" />
                        </div>
                    </div>

                    {/* Expandable Content */}
                    {isExpanded && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                            {/* Left Column - Revenue Analysis Chart */}
                            <div className="lg:col-span-2 bg-white rounded-xl p-6">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">Revenue Analysis</h2>
                                        <p className="text-sm text-gray-600 mt-1">Sales performance across all channels</p>
                                    </div>
                                    {/* Timeframe Buttons */}
                                    <div className="flex space-x-2 mt-3 sm:mt-0">
                                        {(['weekly', 'monthly', 'yearly'] as const).map((timeframe) => (
                                            <button
                                                key={timeframe}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedTimeframe(timeframe);
                                                }}
                                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedTimeframe === timeframe
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {revenueData[timeframe].label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Revenue Total */}
                                <div className="mb-6">
                                    <p className="text-3xl font-bold items-center text-gray-900">
                                        KWD {currentData.totalRevenue.toLocaleString()}   <span className="bg-gray-100 rounded-full p-2 text-sm font-medium text-green-600">
                                            +{currentData.changePercentage}%
                                        </span>
                                    </p>
                                </div>

                                {/* Chart */}
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={currentData.dataPoints}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#6B7280', fontSize: 12 }}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Bar
                                                dataKey="revenue"
                                                fill="#00C0E8"
                                                radius={[20, 20, 20, 20]}
                                                barSize={30}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Right Column - Revenue Table */}
                            <div className="bg-white rounded-xl  p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-6">Channels Contribution</h3>

                                {/* Three Concentric Circles */}
                                <div className="relative w-64 h-64 mx-auto mb-6">
                                    {/* Outer Circle - POS (45%) - Blue */}
                                    <div className="absolute inset-0">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">

                                            {/* Progress circle - 45% */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="#91C0EECC"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                strokeDasharray="400.743" // 2 * π * r (2 * 3.14159 * 45)
                                                strokeDashoffset="155.508" // 282.743 * (1 - 0.45)
                                                transform="rotate(-190 50 50)"
                                            />
                                        </svg>

                                    </div>

                                    {/* Middle Circle - Website (30%) - Green */}
                                    <div className="absolute inset-0 p-2">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">

                                            {/* Progress circle - 30% */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="35"
                                                fill="none"
                                                stroke="#1773CF99"
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                                strokeDasharray="320.911" // 2 * π * r (2 * 3.14159 * 35)
                                                strokeDashoffset="153.938" // 219.911 * (1 - 0.30)
                                                transform="rotate(-100 50 50)"
                                            />
                                        </svg>

                                    </div>

                                    {/* Inner Circle - Mobile App (25%) - Purple */}
                                    <div className="absolute inset-0 p-2">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">

                                            {/* Progress circle - 25% */}
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="25"
                                                fill="none"
                                                stroke="#91C0EE80"
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeDasharray="250.08" // 2 * π * r (2 * 3.14159 * 25)
                                                strokeDashoffset="117.81" // 157.08 * (1 - 0.25)
                                                transform="rotate(-30 50 50)"
                                            />
                                        </svg>

                                    </div>

                                    {/* Center Average */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                        <div className="text-3xl font-bold text-gray-900">30%</div>
                                    </div>
                                </div>

                                {/* Sales Amount Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-md font-medium text-gray-500">POS:  <span className="text-md text-gray-500">45%</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-md font-medium text-gray-500">Website:  <span className="text-md text-gray-500">30%</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-md font-medium text-gray-500">Mobile App:  <span className="text-md text-gray-500">25%</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl overflow-hidden">
                    {/* Filters Row */}
                    <div className="p-6">
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                            {/* Date Filter */}
                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Date Range</option>
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
                                    <option> Invoice Type</option>
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
                                    <option>Order Source</option>
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
                                    <option>Payment status</option>
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


                            <div className="flex-1 min-w-[200px] relative">
                                <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                    <option>Customer Type</option>
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


                    </div>

                    {/* Table Container */}
                    <div className="relative mx-6 shadow rounded-xl">
                        <div className="px-6 py-3">
                            <h2 className="text-xl font-bold text-gray-900">Invoices & Orders Table</h2>
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
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Source
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Invoice Type
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Payment
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
                                                <div className="text-[14px] font-medium text-gray-900">{product.orderId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-3 py-1 text-xs font-medium rounded-lg bg-blue-100 text-blue-800">
                                                    {product.source}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] text-gray-900">{product.invoiceType}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] font-medium text-gray-900">{product.customer}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] text-gray-900">{product.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] font-semibold text-gray-900">KWD {product.amount.toFixed(2)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-[14px] text-gray-900">{product.payment}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-2 text-xs font-medium rounded-lg ${product.status === 'Paid' ? 'bg-green-100 text-green-800' :
                                                        product.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-red-100 text-red-800'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                         
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
        </DashboardLayout>
    );
}