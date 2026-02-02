// src/features/auth/pages/DashboardPage.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import { useState } from 'react';


import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';

import search_icon from '../../../assets/icons/search_icon.svg';
import filterIcon from '../../../assets/icons/filter_icon.svg';
import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';

export default function DashboardPage() {

    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
     const { user } = useAppSelector((state: RootState) => state.auth);

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

       // Check user role
  const isSuperAdmin = user?.role?.role_name === 'Super Admin';
  const isHR = user?.role?.role_name === 'HR';
  console.log('isHr', isHR)


   const basePath = isSuperAdmin 
    ? '/admin' 
    : isHR 
        ? '/hr'
        : '';



    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Header */}
                <div className='flex flex-row justify-between items-center'>
                    <Link to={`${basePath}/hr`} className='flex flex-row items-center'>
                        <img src={arrow_back_icon} alt="Back" className='w-6 h-6 md:w-8 md:h-8' />
                        <span className='px-2 font-semibold text-sm md:text-base'>Mark Attendance</span>
                    </Link>
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
                                    <option>Role</option>
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

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="relative mx-6 shadow rounded-xl mb-8">
                        <div className="px-6 py-3">
                            <h2 className="text-xl font-bold text-gray-900">Employees</h2>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        {/* Checkbox Column - Shows when bulk transfer is active */}

                                        <th className="px-6 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selectedProductIds.length === products.length}
                                                onChange={handleSelectAll}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                            />
                                        </th>


                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            EMP Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            EMP ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            ROLE
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            Branch
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            STATUS
                                        </th>
                                        <th className="px-6 py-3 text-left text-md font-medium text-[#37638F] uppercase tracking-wider">
                                            LEAVE TYPE
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProductIds.includes(product.id)}
                                                    onChange={() => handleProductSelect(product.id)}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                                />
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


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>

                    <div className="bg-white rounded-xl p-4 md:p-6 my-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Employee ID
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Employee
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter last name"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Check-in Time
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="12:34 am"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Check-in Time
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="12:34 am"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Attendance Status
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Absent"
                                    />
                                </div>
                            </div>


                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                <div></div>
                                <button
                                    className="w-full px-6 py-3 text-black hover:text-white  border border-[#6155F5] font-medium rounded-lg hover:bg-[#6155F5] transition-colors cursor-pointer"
                                >
                                    Save Attendance
                                </button>
                                <div></div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>


        </DashboardLayout>
    );
}