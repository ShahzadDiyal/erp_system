// src/layouts/components/Topbar.tsx
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ChevronDown } from '../../components/shared/icons';
import type { RootState } from '../../app/store';
import add_icon from '../../assets/icons/staff_add.png'

interface TopbarProps {
    sidebarCollapsed: boolean;
    toggleSidebar: () => void;
    pageTitle?: string;
}

export default function Topbar({ pageTitle = "Dashboard Overview" }: TopbarProps) {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const [showBranchDropdown, setShowBranchDropdown] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Sample branches data
    const branches = [
        { id: 1, name: 'Qurain Branch' },
        { id: 2, name: 'Kuwait City Branch' },
        { id: 3, name: 'Ardiya Branch' },
        { id: 4, name: 'Warehouse - Qurain' },
    ];

    const [selectedBranch, setSelectedBranch] = useState(branches[0]);

    return (
        <header className="sticky top-0 h-18 bg-white border-b border-gray-200 z-30">
            <div className="flex items-center justify-between h-full px-6">
                {/* Left Section */}
                <div className="flex items-center space-x-6">
                    {/* Page Title - Dynamically changes based on selected menu */}
                    <h1 className="text-xl font-bold text-gray-900 hidden md:block">
                        {pageTitle}
                    </h1>

                    {/* Branch Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                            className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-sm font-medium text-gray-700">{selectedBranch.name}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                        </button>

                        {showBranchDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowBranchDropdown(false)}
                                />
                                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="p-2">
                                        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            Select Branch
                                        </div>
                                        {branches.map((branch) => (
                                            <button
                                                key={branch.id}
                                                onClick={() => {
                                                    setSelectedBranch(branch);
                                                    setShowBranchDropdown(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedBranch.id === branch.id
                                                        ? 'bg-blue-50 text-blue-600 font-medium'
                                                        : 'text-gray-700 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {branch.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-3">
                    {/* Add Staff Button */}
                    {user?.isSuperAdmin && (
                        <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <img src={add_icon} alt="" />
                            <span className="text-sm font-medium">Add Staff</span>
                        </button>
                    )}

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors relative"
                            aria-label="Notifications"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </button>

                        {showNotifications && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowNotifications(false)}
                                />
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-medium text-gray-900">Notifications</h3>
                                            <button className="text-sm text-blue-600 hover:text-blue-800">
                                                Mark all as read
                                            </button>
                                        </div>
                                        {/* Notifications content */}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Settings */}
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        aria-label="Settings"
                    >
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-3 focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                    {user?.name?.charAt(0) || 'U'}
                                </span>
                            </div>
                            <ChevronDown className="hidden md:block w-4 h-4 text-gray-500" />
                        </button>

                        {showProfileMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowProfileMenu(false)}
                                />
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="p-2">
                                        <div className="px-3 py-2 border-b border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                            My Profile
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                                            Account Settings
                                        </button>
                                        <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}