// src/features/auth/pages/EmployeeDashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import AttendanceChart from '../components/radialchart';
import arrow_down_dropdown from '../../../assets/icons/dropdown_arrow_icon.svg'
import filterIcon from '../../../assets/icons/filter_icon.svg'
import search_icon from '../../../assets/icons/search_icon.svg'
import export_pdf from '../../../assets/icons/export_pdf.svg'
import export_excel from '../../../assets/icons/export_excel.svg'
import back_icon from '../../../assets/icons/back_icon.svg'
import user_icon from '../../../assets/icons/user_icon.svg'
import add_icon from '../../../assets/icons/add.svg'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';


interface Employee {
    empId: string;
    name: string;
    role: string;
    branch: string;
    department: string;
    status: 'Active' | 'On Leave' | 'Inactive';
}

export default function EmployeeDashboardPage() {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Check user role
    const isSuperAdmin = user?.role?.role_name === 'Super Admin';
    const isHR = user?.role?.role_name === 'HR';
    console.log('is hr: ', isHR)

    const basePath = isSuperAdmin
        ? '/admin'
        : isHR
            ? ''
            : '';


    const handleRowClick = (requestId: number) => {
        navigate(`${basePath}/hr/leave_requests/${requestId}`);

    };

    const initialData = {
        active: 55,
        onLeave: 45,
        absent: 20
    };


    const [attendanceData, setAttendanceData] = useState(initialData);

    // Sample employee data
    const employees: Employee[] = [
        { empId: 'EMP-001', name: 'Ahmed Ali', role: 'Sales Executive', branch: 'Qurain', department: 'Sales', status: 'Active' },
        { empId: 'EMP-001', name: 'Sara Khan', role: 'Cashier', branch: 'Salmiya', department: 'POS', status: 'Active' },
        { empId: 'EMP-001', name: 'Bilal Hussain', role: 'Warehouse Operator', branch: 'Main WH', department: 'Warehouse', status: 'Active' },
        { empId: 'EMP-001', name: 'Fatima Noor', role: 'Accountant', branch: 'HQ', department: 'Finance', status: 'On Leave' },
        { empId: 'EMP-001', name: 'Omar Saeed', role: 'Branch Manager', branch: 'Qurain', department: 'Management', status: 'Active' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'text-blue-600';
            case 'On Leave':
                return 'text-green-600';
            case 'Inactive':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };






    // Function to handle percentage change from slider
    const handlePercentageChange = (percentage: number) => {
        const total = attendanceData.active + attendanceData.onLeave + attendanceData.absent;
        const newActive = Math.round((percentage / 100) * total);
        const remaining = total - newActive;
        const newOnLeave = Math.round(remaining * 0.3);
        const newAbsent = remaining - newOnLeave;

        setAttendanceData({
            active: newActive,
            onLeave: newOnLeave,
            absent: newAbsent
        });
    };


    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* First Row - Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column - Circular Graph Card */}
                    <div className="lg:col-span-5 bg-white rounded-lg p-2">
                        <div className="flex items-start justify-between">

                            {/* LEFT CONTENT */}
                            <div className="flex flex-col gap-3 p-12">

                                <div className="flex items-center justify-between gap-6">
                                    <span className="text-[16px] text-[#87AFF9] font-medium">Active</span>
                                    <span className="text-gray-900 font-semibold text-[16px]">5</span>
                                </div>

                                <div className="flex items-center justify-between gap-6">
                                    <span className="text-[16px] text-[#AEE9BD] font-medium">On Leave</span>
                                    <span className="text-gray-900 font-semibold text-[16px]">4</span>
                                </div>

                                <div className="flex items-center justify-between gap-6">
                                    <span className="text-[16px] text-[#F6C8BA] font-medium">Absent</span>
                                    <span className="text-gray-900 font-semibold text-[16px]">7</span>
                                </div>



                            </div>

                            {/* RIGHT CHART */}
                            <div className="flex justify-end">
                                <AttendanceChart
                                    data={attendanceData}
                                    showControls={true}
                                    onValueChange={handlePercentageChange}
                                />
                            </div>

                        </div>
                    </div>


                    {/* Right Column - Info Cards */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* First Row - 2 Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Total Employees Card */}
                            <div className="bg-white rounded-lg p-6">
                                <p className="text-gray-500 text-lg font-medium mb-20">Total Employees</p>
                                <p className="text-4xl font-bold text-gray-900">124</p>
                            </div>

                            {/* Present Today Card */}
                            <div className="bg-white rounded-lg p-6">
                                <p className="text-gray-500 text-lg font-medium mb-20">Present Today</p>
                                <p className="text-4xl font-bold text-gray-900">98</p>
                            </div>
                        </div>

                        {/* Second Row - 3 Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {/* Pending Leave Requests Card */}
                            <div className="bg-white rounded-lg p-6">
                                <p className="text-gray-500 text-lg font-medium mb-20">Pending Leave Requests</p>
                                <p className="text-3xl font-bold text-gray-900">6</p>
                            </div>

                            {/* On Leave Today Card */}
                            <div className="bg-white rounded-lg p-6">
                                <p className="text-gray-500 text-lg font-medium mb-20">On Leave Today</p>
                                <p className="text-3xl font-bold text-green-600">14</p>
                            </div>

                            {/* Absent Card */}
                            <div className="bg-white rounded-lg p-6">
                                <p className="text-gray-500 text-lg font-medium mb-20">Absent</p>
                                <p className="text-3xl font-bold text-red-600">12</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Row - Table and Action Buttons */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Column - Employee Table (10/12) */}
                    <div className="lg:col-span-10 bg-white rounded-lg p-6">
                        {/* Filters Section */}
                        <div className="py-6">
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
                                        <img src={arrow_down_dropdown} alt="" />
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
                                        <img src={arrow_down_dropdown} alt="" />
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
                                        <img src={arrow_down_dropdown} alt="" />
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
                                        <img src={arrow_down_dropdown} alt="" />
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



                        {/* Table */}
                        <div className="overflow-x-auto shadow">
                            <div className="mb-4">
                                <h2 className="text-[18px] font-semibold text-gray-900 px-4 pt-2 rounded-xl">Employees</h2>
                            </div>
                            <table className="min-w-full">
                                <thead className='bg-[#F6F8FA] overflow-hidden'>
                                    <tr className="border-b border-gray-200">
                                        <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#37638F] uppercase tracking-wider">
                                            EMP ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#37638F] uppercase tracking-wider">
                                            NAME
                                        </th>
                                        <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#37638F] uppercase tracking-wider">
                                            ROLE
                                        </th>
                                        <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#37638F] uppercase tracking-wider">
                                            BRANCH
                                        </th>
                                        <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#37638F] uppercase tracking-wider">
                                            DEPARTMENT
                                        </th>
                                        <th className="px-4 py-3 text-left text-[16px] font-semibold text-[#37638F] uppercase tracking-wider">
                                            STATUS
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {employees.map((employee, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors" onClick={(e) => { e.stopPropagation(); handleRowClick(index) }}>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">{employee.empId}</span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="text-sm font-medium text-gray-900">{employee.name}</span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700">{employee.role}</span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700">{employee.branch}</span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className="text-sm text-gray-700">{employee.department}</span>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`text-sm font-medium ${getStatusColor(employee.status)}`}>
                                                    {employee.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Column - Action Buttons (2/12) */}
                    <div className="lg:col-span-2 bg-white flex flex-row justify-between lg:flex-col gap-4 p-8 items-center">
                        {/* Add New Employee */}
                        <Link to={`${basePath}/hr/add_employee`}>
                            <button className="w-24 h-36 lg:w-28 lg:h-40 p-2 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition-colors shadow-sm hover:shadow-lg relative flex items-center justify-center group cursor-pointer overflow-hidden">
                                {/* Icon */}
                                <img
                                    src={add_icon}
                                    alt=""
                                    className="bg-[#CFF6FF] p-4 rounded-full transition-transform duration-300 group-hover:-translate-y-8"
                                />
                                {/* Hover Text */}
                                <span className="absolute bottom-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center w-full px-1">
                                    Add New Employee
                                </span>
                            </button>
                        </Link>

                        {/* Mark Attendance */}
                        <Link to={`${basePath}/hr/mark_attendance`}>
                            <button className="w-24 h-36 lg:w-28 lg:h-40 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition-colors shadow-sm hover:shadow-lg relative flex items-center justify-center group cursor-pointer overflow-hidden">
                                <img
                                    src={user_icon}
                                    alt=""
                                    className="bg-[#CFF6FF] p-4 rounded-full transition-transform duration-300 group-hover:-translate-y-8"
                                />
                                <span className="absolute bottom-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center w-full px-1">
                                    Mark Attendance (Manual)
                                </span>
                            </button>
                        </Link>

                        {/* Review Leave Request */}
                        <Link to={`${basePath}/hr/leave_requests`}>
                            <button className="w-24 h-36 lg:w-28 lg:h-40 bg-white border border-gray-100 rounded-full hover:bg-gray-50 transition-colors shadow-sm hover:shadow-lg relative flex items-center justify-center group cursor-pointer overflow-hidden">
                                <img
                                    src={back_icon}
                                    alt=""
                                    className="bg-[#CFF6FF] p-4 rounded-full transition-transform duration-300 group-hover:-translate-y-8"
                                />
                                <span className="absolute bottom-4 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center w-full px-1">
                                    Review Leave Request
                                </span>
                            </button>
                        </Link>
                    </div>


                </div>
            </div>
        </DashboardLayout>
    );
}