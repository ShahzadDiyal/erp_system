// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useState } from 'react';

import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import search_icon from '../../../assets/icons/search_icon.svg';
import filterIcon from '../../../assets/icons/filter_icon.svg';
// import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg';
import export_pdf from '../../../assets/icons/export_pdf.svg';
import export_excel from '../../../assets/icons/export_excel.svg';
import tick_icon from '../../../assets/icons/tick_icon_1.svg';
import cross_icon from '../../../assets/icons/cross_icon.svg';
// import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const [selectedRequestIds, setSelectedRequestIds] = useState<number[]>([]);

    // Mock leave requests data
    const leaveRequests = [
        {
            id: 1,
            requestId: 'REQ-001',
            empName: 'Ahmed Raza',
            empId: 'EMP-021',
            role: 'Sales Manager',
            leaveType: 'Annual Leave',
            from: '15 Jan 2024',
            to: '20 Jan 2024',
            days: 5,
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        {
            id: 2,
            requestId: 'REQ-002',
            empName: 'Sara Khan',
            empId: 'EMP-014',
            role: 'HR Executive',
            leaveType: 'Sick Leave',
            from: '10 Jan 2024',
            to: '12 Jan 2024',
            days: 3,
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        {
            id: 3,
            requestId: 'REQ-003',
            empName: 'Mohammed Ali',
            empId: 'EMP-032',
            role: 'Software Engineer',
            leaveType: 'Emergency Leave',
            from: '05 Jan 2024',
            to: '05 Jan 2024',
            days: 1,
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
        },
        {
            id: 4,
            requestId: 'REQ-004',
            empName: 'Fatima Ahmed',
            empId: 'EMP-045',
            role: 'Accountant',
            leaveType: 'Maternity Leave',
            from: '01 Feb 2024',
            to: '30 Apr 2024',
            days: 90,
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
        },
        {
            id: 5,
            requestId: 'REQ-005',
            empName: 'Khalid Mahmoud',
            empId: 'EMP-028',
            role: 'Warehouse Supervisor',
            leaveType: 'Annual Leave',
            from: '25 Jan 2024',
            to: '30 Jan 2024',
            days: 6,
            status: 'Pending',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
    ];

    const handleRequestSelect = (requestId: number) => {
        setSelectedRequestIds(prev => {
            if (prev.includes(requestId)) {
                return prev.filter(id => id !== requestId);
            } else {
                return [...prev, requestId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedRequestIds.length === leaveRequests.length) {
            setSelectedRequestIds([]);
        } else {
            setSelectedRequestIds(leaveRequests.map(r => r.id));
        }
    };

    const handleApprove = (requestId: number) => {
        console.log('Approving request:', requestId);
        alert(`Leave request ${requestId} approved!`);
    };

    const handleReject = (requestId: number) => {
        console.log('Rejecting request:', requestId);
        alert(`Leave request ${requestId} rejected!`);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                {/* <div className='flex flex-row justify-between items-center'>
                    <Link to='/hr' className='flex flex-row items-center'>
                        <img src={arrow_back_icon} alt="Back" className='w-6 h-6 md:w-8 md:h-8' />
                        <span className='px-2 font-semibold text-sm md:text-base'>Preview Leave Requests</span>
                    </Link>
                </div> */}

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
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-[200px] relative">
                            <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                <option>All Branches</option>
                                <option>Main Warehouse</option>
                                <option>Downtown Store</option>
                                <option>Tech Store</option>
                                <option>Online Store</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>

                        <div className="flex-1 min-w-[200px] relative">
                            <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                <option>Leave Type</option>
                                <option>Annual Leave</option>
                                <option>Sick Leave</option>
                                <option>Emergency Leave</option>
                                <option>Maternity Leave</option>
                                <option>Paternity Leave</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>

                        {/* Status Filter */}
                        <div className="flex-1 min-w-[200px] relative">
                            <select className="w-full px-4 py-2.5 shadow rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold appearance-none bg-white pr-10">
                                <option>Status</option>
                                <option>Pending</option>
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>Cancelled</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <img src={dropdown_arrow_icon} alt="" />
                            </div>
                        </div>

                        {/* Filter Icon Button */}
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
                            <div className="relative w-full sm:w-auto rounded-full ">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <img src={search_icon} alt="Search" className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Employee ID"
                                    className="pl-10 pr-4 py-2.5 border border-[#00000080] rounded-full focus:border-blue-500 w-full sm:w-[360px]"
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
                <div className="relative mx-6 shadow rounded-xl overflow-hidden">
                    <div className="px-6 py-3">
                        <h2 className="text-xl font-bold text-gray-900">Employees</h2>
                    </div>
                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    {/* Checkbox Column */}
                                    <th className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedRequestIds.length === leaveRequests.length}
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Request ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Emp Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Emp ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Leave Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        From
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        To
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Days
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {leaveRequests.map((request) => (
                                    <tr key={request.id} className="hover:bg-gray-50">
                                        {/* Checkbox Column */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedRequestIds.includes(request.id)}
                                                onChange={() => handleRequestSelect(request.id)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                        </td>

                                        {/* Request ID */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-semibold text-gray-900">{request.requestId}</div>
                                        </td>

                                        {/* Employee Name with Image */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                                    <img
                                                        src={request.image}
                                                        alt={request.empName}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="text-[14px] font-medium text-gray-900">{request.empName}</div>
                                            </div>
                                        </td>

                                        {/* Employee ID */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900 font-mono">{request.empId}</div>
                                        </td>

                                        {/* Role */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] text-gray-900">{request.role}</div>
                                        </td>

                                        {/* Leave Type */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg">
                                                {request.leaveType}
                                            </span>
                                        </td>

                                        {/* From Date */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{request.from}</div>
                                        </td>

                                        {/* To Date */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-medium text-gray-900">{request.to}</div>
                                        </td>

                                        {/* Days */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-[14px] font-bold text-gray-900">{request.days} days</div>
                                        </td>

                                        {/* Action Column with Tick and Cross buttons */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {/* Approve Button (Green tick) */}
                                                <button
                                                    onClick={() => handleApprove(request.id)}
                                                    className="w-8 h-8 flex items-center justify-center  text-green-600 rounded-lg transition-colors cursor-pointer"
                                                    title="Approve"
                                                >
                                                    <img src={tick_icon} alt="" />
                                                </button>

                                                {/* Reject Button (Red cross) */}
                                                <button
                                                    onClick={() => handleReject(request.id)}
                                                    className="w-8 h-8 flex items-center justify-center    text-red-600 rounded-lg transition-colors cursor-pointer"
                                                    title="Reject"
                                                >
                                                    <img src={cross_icon} alt="" />

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}