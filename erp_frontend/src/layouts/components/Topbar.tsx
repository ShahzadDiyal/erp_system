// src/layouts/components/Topbar.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { ChevronDown } from '../../components/shared/icons';
import type { RootState } from '../../app/store';
import history_icon_2 from '../../assets/icons/history_icon_3.svg'
import add_invoice from '../../assets/icons/add.svg'

interface TopbarProps {
  pageTitle?: string;
}

export default function Topbar({ pageTitle = "Dashboard Overview" }: TopbarProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showBranchDropdown, setShowBranchDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Check user role
  const isSuperAdmin = user?.role?.role_name === 'Super Admin';
  const isHR = user?.role?.role_name === 'HR' || user?.role?.role_name === 'HR Manager';
  // Check if user has specific permissions
  const hasCreateRolePermission = () => {
    if (!user || !user.role || !user.role.permissions) return false;

    // Super Admin has all permissions
    if (isSuperAdmin) return true;

    // Check for create_role permission
    const permissions = user.role.permissions;
    return permissions.some((p: any) =>
      p.permission_name === 'create_user' ||
      p.name === 'create_user'
    );
  };

  const hasCreateUserPermission = () => {
    if (!user || !user.role || !user.role.permissions) return false;

    // Super Admin has all permissions
    if (isSuperAdmin) return true;

    // Check for create_user permission
    const permissions = user.role.permissions;
    return permissions.some((p: any) =>
      p.permission_name === 'create_user' ||
      p.name === 'create_user'
    );
  };

  // Determine if user can see admin buttons
  const canSeeAdminButtons = isSuperAdmin || isHR;
  const canCreateRole = hasCreateRolePermission();
  const canCreateUser = hasCreateUserPermission();

  // Base path for navigation links
  // For HR users, they should use regular routes (not /admin)
  // const basePath = isSuperAdmin
  //   ? '/admin'
  //   : isHR
  //     ? '/hr'
  //     : '';


  // Sample branches data
  const branches = [
    { id: 1, name: 'Qurain Branch' },
    { id: 2, name: 'Kuwait City Branch' },
    { id: 3, name: 'Ardiya Branch' },
    { id: 4, name: 'Warehouse - Qurain' },
  ];

  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(isSuperAdmin ? '/admin_login' : '/login');
  };

  return (
    <header className="sticky top-0 h-18 bg-white border-b border-gray-200 z-30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Page Title */}
          <h1 className="text-lg md:text-xl font-bold text-gray-900 hidden md:block">
            {pageTitle}
          </h1>

          {/* Branch Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowBranchDropdown(!showBranchDropdown)}
              className="flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
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
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Create Role Button */}
          {canSeeAdminButtons && canCreateRole && (
            <Link to={isSuperAdmin ? "/admin/hr/create_role" : "/hr/create_role"}>
              <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-black border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                <img src={add_invoice} alt="Create Role" className="w-4 h-4" />
                <span className="text-sm font-medium">Create New Role</span>
              </button>
            </Link>
          )}

          {canSeeAdminButtons && canCreateUser && (
            <Link to={isSuperAdmin ? "/admin/hr/add_staff" : "/hr/add_staff"}>
              <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-black border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                <img src={add_invoice} alt="Add Staff" className="w-4 h-4" />
                <span className="text-sm font-medium">Add Staff</span>
              </button>
            </Link>
          )}


          <Link to={isSuperAdmin ? "/admin/sales/create_invoice" : "/sales/create_invoice"}>
            <button className="hidden md:flex items-center space-x-2 px-4 py-2 text-black border-1 border-blue-600 rounded-lg cursor-pointer transition-colors">
              <img src={add_invoice} alt="" />
              <span className="text-sm font-medium">Create New Invoice</span>
            </button>
          </Link>


          {/* Shift Close Button */}
          <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-[#FF5F57] text-white rounded-lg hover:bg-[#FF4A42] transition-colors">
            <img src={history_icon_2} alt="Shift Close" className="w-4 h-4" />
            <span className="text-sm font-medium">Shift Close 12:27</span>
          </button>

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
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
                    <div className="space-y-3">
                      <div className="p-2 bg-blue-50 rounded">
                        <p className="text-sm text-gray-700">New invoice created</p>
                        <p className="text-xs text-gray-500">2 minutes ago</p>
                      </div>
                      <div className="p-2 bg-gray-50 rounded">
                        <p className="text-sm text-gray-700">Inventory stock is low</p>
                        <p className="text-xs text-gray-500">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 md:space-x-3 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{user?.role?.role_name || 'Role'}</p>
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
                      <p className="text-xs text-blue-600 font-medium mt-1">{user?.role?.role_name}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/profile');
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
                    >
                      My Profile
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors">
                      Account Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                    >
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