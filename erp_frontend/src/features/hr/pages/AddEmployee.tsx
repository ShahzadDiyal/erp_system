// src/features/sales/pages/CreateInvoice.tsx
import DashboardLayout from '../../../layouts/DashboardLayout';
import dropdown_arrow_icon from '../../../assets/icons/dropdown_arrow_icon.svg';
import add_icon from '../../../assets/icons/add.svg';
import arrow_back_icon from '../../../assets/icons/arrow_back_icon.svg';
import edit_icon from '../../../assets/icons/edit_employee.svg';
import tick_icon from '../../../assets/icons/tick_icon.svg';
import tick_icon_1 from '../../../assets/icons/tick_icon_1.svg';
import cross_icon from '../../../assets/icons/cross_icon.svg';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../../app/hooks';
import type { RootState } from '../../../app/store';

interface Allowance {
    id: string;
    type: string;
    amount: number;
}

export default function CreateInvoice() {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [nationality, setNationality] = useState('');

    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [homeAddress, setHomeAddress] = useState('');

    const [branch, setBranch] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [employmentType, setEmploymentType] = useState('');

    const [basicSalary, setBasicSalary] = useState('');

    const [allowances, setAllowances] = useState<Allowance[]>([
        { id: '1', type: 'Housing Allowance', amount: 150 },
        { id: '2', type: 'Transport Allowance', amount: 75 }
    ]);
    const [isEditingAllowances, setIsEditingAllowances] = useState(false);
    const [allowanceAccommodations, setAllowanceAccommodations] = useState('');
    const [password, setPassword] = useState('');

    const [username, setUsername] = useState('');
    const [systemPassword, setSystemPassword] = useState('');
    const [systemHomeAddress, setSystemHomeAddress] = useState('');


    // Check user role
    const isSuperAdmin = user?.role?.role_name === 'Super Admin';
    const isHR = user?.role?.role_name === 'HR';


    const basePath = isSuperAdmin
        ? '/admin'
        : isHR
            ? '/hr'
            : '';



    // Load existing data if needed
    useEffect(() => {
        // You can load existing employee data here if editing
    }, []);

    const handleAddAllowance = () => {
        const newAllowance: Allowance = {
            id: Date.now().toString(),
            type: '',
            amount: 0
        };
        setAllowances([...allowances, newAllowance]);
    };

    const handleUpdateAllowance = (id: string, field: keyof Allowance, value: string | number) => {
        const updatedAllowances = allowances.map(allowance =>
            allowance.id === id ? { ...allowance, [field]: value } : allowance
        );
        setAllowances(updatedAllowances);
    };

    const handleRemoveAllowance = (id: string) => {
        const updatedAllowances = allowances.filter(allowance => allowance.id !== id);
        setAllowances(updatedAllowances);
    };

    const handleSaveEmployee = () => {
        // Implement save logic here
        console.log('Saving employee...');
        alert('Employee saved successfully!');
    };

    const handleSaveAndCreateLogin = () => {
        // Implement save and create login logic here
        console.log('Saving employee and creating login...');
        alert('Employee saved and login created successfully!');
    };

    const handleCancel = () => {
        // Implement cancel logic here
        window.history.back();
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className='flex flex-row justify-between items-center'>
                    <Link to={`${basePath}/hr`} className='flex flex-row items-center'>
                        <img src={arrow_back_icon} alt="Back" className='w-6 h-6 md:w-8 md:h-8' />
                        <span className='px-2 font-semibold text-sm md:text-base'>Add New Employee</span>
                    </Link>
                </div>

                {/* Main Form */}
                <div className="space-y-6">


                    {/* Personal Information Section */}
                    <div className="bg-white rounded-xl p-4 md:p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter first name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter last name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Gender
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-400 mb-2">
                                    Nationality
                                </label>
                                <input
                                    type="text"
                                    value={nationality}
                                    onChange={(e) => setNationality(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter nationality"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="bg-white rounded-xl p-4 md:p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Mobile
                                    </label>
                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="+965 XXX XXX XXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="employee@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-400 mb-2">
                                    Home Address
                                </label>
                                <input
                                    value={homeAddress}
                                    onChange={(e) => setHomeAddress(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter home address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Employment Details Section */}
                    <div className="bg-white rounded-xl p-4 md:p-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Branch
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={branch}
                                            onChange={(e) => setBranch(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
                                        >
                                            <option value="">Select Branch</option>
                                            <option value="kuwait">Kuwait City Branch</option>
                                            <option value="salmiya">Salmiya Branch</option>
                                            <option value="hawally">Hawally Branch</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Department
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
                                        >
                                            <option value="">Select Department</option>
                                            <option value="sales">Sales</option>
                                            <option value="hr">HR</option>
                                            <option value="finance">Finance</option>
                                            <option value="it">IT</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Role
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="manager">Manager</option>
                                            <option value="supervisor">Supervisor</option>
                                            <option value="associate">Associate</option>
                                            <option value="executive">Executive</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Employment Type
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={employmentType}
                                            onChange={(e) => setEmploymentType(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white pr-10"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="full-time">Full Time</option>
                                            <option value="part-time">Part Time</option>
                                            <option value="contract">Contract</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <img src={dropdown_arrow_icon} alt="" className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Salary & Allowances Section */}
                    <div className="bg-white rounded-xl p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Salary Column */}
                            <div>
                                <label className="block text-md font-medium text-gray-400 mb-2">
                                    Basic Salary
                                </label>
                                <input
                                    type="text"
                                    value={basicSalary}
                                    onChange={(e) => setBasicSalary(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter basic salary"
                                />
                            </div>

                            {/* Allowances Column */}
                            <div className='shadow-lg rounded-xl'>
                                <div className="flex justify-between items-center px-4">
                                    <span className="text-md font-bold text-gray-700">Monthly Allowances</span>
                                    <button
                                        onClick={() => setIsEditingAllowances(!isEditingAllowances)}
                                        className="cursor-pointer rounded-lg transition-colors px-6"
                                    >
                                        {isEditingAllowances ? (
                                            <img src={tick_icon} alt="Save" className="w-5 h-5" />
                                        ) : (
                                            <img src={edit_icon} alt="Edit" className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="py-3 text-left text-xs font-semibold text-gray-600 uppercase px-4">Allowance Type</th>
                                                <th className="py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                                                {isEditingAllowances && (
                                                    <th className="py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allowances.map((allowance) => (
                                                <tr key={allowance.id} className="border-b border-gray-100 hover:bg-gray-50 ">
                                                    <td className="py-3">
                                                        {isEditingAllowances ? (
                                                            <input
                                                                type="text"
                                                                value={allowance.type}
                                                                onChange={(e) => handleUpdateAllowance(allowance.id, 'type', e.target.value)}
                                                                className="w-full px-3 py-2 text-sm px-4"
                                                            />
                                                        ) : (
                                                            <span className="text-sm text-gray-800 px-4">{allowance.type}</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3">
                                                        {isEditingAllowances ? (
                                                            <input
                                                                type="number"
                                                                value={allowance.amount}
                                                                onChange={(e) => handleUpdateAllowance(allowance.id, 'amount', parseFloat(e.target.value) || 0)}
                                                                className="w-full px-3 py-2 rounded text-sm"
                                                            />
                                                        ) : (
                                                            <span className="text-sm text-gray-800">KWD {allowance.amount.toFixed(2)}</span>
                                                        )}
                                                    </td>
                                                    {isEditingAllowances && (
                                                        <td className="py-3">
                                                            <div className="flex items-center space-x-2">
                                                                <button

                                                                    className="p-1 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <img src={tick_icon_1} alt="Remove" className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRemoveAllowance(allowance.id)}
                                                                    className="p-1 hover:bg-red-50 rounded transition-colors"
                                                                >
                                                                    <img src={cross_icon} alt="Remove" className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {isEditingAllowances && (
                                    <div className='px-4 pb-4'>
                                        <button
                                            onClick={handleAddAllowance}
                                            className="mt-4 flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                                        >
                                            <img src={add_icon} alt="Add" className="w-4 h-4" />
                                            <span className="text-sm font-medium">Add Allowance</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label className="block text-md font-medium text-gray-400 mb-2">
                                    Allowance Accommodations
                                </label>
                                <input
                                    type="text"
                                    value={allowanceAccommodations}
                                    onChange={(e) => setAllowanceAccommodations(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter accommodation details"
                                />
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-400 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>
                    </div>


                    {/* System Access & Permissions Section */}
                    <div className="bg-white rounded-xl p-4 md:p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">System Access & Permissions</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-md font-medium text-gray-400 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={systemPassword}
                                        onChange={(e) => setSystemPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                        placeholder="Enter system password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-md font-medium text-gray-400 mb-2">
                                    Home Address (System)
                                </label>
                                <input
                                    value={systemHomeAddress}
                                    onChange={(e) => setSystemHomeAddress(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter system home address"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={handleSaveEmployee}
                            className="w-full px-6 py-3 text-black hover:text-white border border-[#6155F5] font-medium rounded-lg hover:bg-[#6155F5] transition-colors cursor-pointer"
                        >
                            Save Employee
                        </button>
                        <button
                            onClick={handleSaveAndCreateLogin}
                            className="w-full px-6 py-3 text-black hover:text-white  border border-[#6155F5] font-medium rounded-lg hover:bg-[#6155F5] transition-colors cursor-pointer"
                        >
                            Save & Create Login
                        </button>
                        <button
                            onClick={handleCancel}
                            className="w-full px-6 py-3 text-black  hover:text-white border border-[#6155F5] font-medium rounded-lg hover:bg-[#6155F5] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}