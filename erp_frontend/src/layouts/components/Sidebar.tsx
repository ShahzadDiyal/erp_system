// src/layouts/components/Sidebar.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import erp_logo from '../../assets/icons/erp_logo.png'
import dashboard from '../../assets/icons/dashboard.png'
import inventory from '../../assets/icons/inventory.png'
import pos from '../../assets/icons/pos.png'
import purchases from '../../assets/icons/purchases.png'
import sales from '../../assets/icons/sales.png'
// import hr from '../../assets/icons/hr.png'
import crm from '../../assets/icons/crm.png'
import accounting from '../../assets/icons/accounting.png'
import reports from '../../assets/icons/accounting.png'
import logout_icon from '../../assets/icons/logout.png'
import hr_icon from '../../assets/icons/hr_icon.svg'
import type { RootState } from '../../app/store';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
  onMenuSelect?: (pageTitle: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

export default function Sidebar({ collapsed, toggleSidebar, onMenuSelect }: SidebarProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [isPosOpen, setIsPosOpen] = useState(false);
  
  // Check if current user is Super Admin
  const isSuperAdmin = user?.role?.role_name === 'Super Admin';
  
  // Base path for navigation
  const basePath = isSuperAdmin ? '/admin' : '';
  
  // Helper function to check permissions
  const hasPermission = (permissionName: string) => {
    if (!user || !user.role || !user.role.permissions) return false;
    
    // Super Admin has all permissions
    if (isSuperAdmin) return true;
    
    return user.role.permissions.some(
      (permission: any) => permission.permission_name === permissionName
    );
  };
  
  const hasAnyPermission = (permissions: string[]) => {
    if (isSuperAdmin) return true;
    return permissions.some(permission => hasPermission(permission));
  };
  
  // Dashboard menu - only for Super Admin
  const menuItems: MenuItem[] = isSuperAdmin ? [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: dashboard, 
      path: `${basePath}/dashboard` 
    }
  ] : [];
  
  // POS Submenus
  const posSubmenus: SubMenuItem[] = [
    hasPermission('open_pos') && { 
      id: 'pos-terminal', 
      label: 'Open Terminal', 
      path: `${basePath}/pos/terminal` 
    },
    hasPermission('open_pos') && { 
      id: 'pos-open', 
      label: 'Open POS', 
      path: `${basePath}/pos` 
    },
    hasPermission('view_orders') && { 
      id: 'pos-orders', 
      label: 'POS Orders', 
      path: `${basePath}/pos/orders` 
    },
    hasPermission('access_cashbox') && { 
      id: 'pos-cashbox', 
      label: 'Cash Box', 
      path: `${basePath}/pos/cashbox` 
    },
    hasPermission('view_shift_reports') && { 
      id: 'pos-shift-reports', 
      label: 'Shift Reports', 
      path: `${basePath}/pos/shift_reports` 
    },
  ].filter(Boolean) as SubMenuItem[];
  
  // Operation Menus
  const operationMenus: MenuItem[] = [
    hasPermission('view_inventory') && { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: inventory, 
      path: `${basePath}/inventory` 
    },
    hasAnyPermission(['view_pos', 'open_pos', 'close_pos']) && { 
      id: 'pos', 
      label: 'POS', 
      icon: pos, 
      path: `${basePath}/pos`,
      submenu: posSubmenus
    },
    hasAnyPermission(['view_sales', 'create_invoice']) && { 
      id: 'sales', 
      label: 'Sales', 
      icon: sales, 
      path: `${basePath}/sales` 
    },
    hasPermission('view_purchase') && { 
      id: 'purchase', 
      label: 'Purchase', 
      icon: purchases, 
      path: `${basePath}/purchase` 
    },
  ].filter(Boolean) as MenuItem[];
  
  // Finance & HR Menus
  const financeMenus: MenuItem[] = [
    hasPermission('view_accounting') && { 
      id: 'accounting', 
      label: 'Accounting', 
      icon: accounting, 
      path: `${basePath}/accounting` 
    },
    hasPermission('view_reports') && { 
      id: 'reports', 
      label: 'Reports', 
      icon: reports, 
      path: `${basePath}/reports` 
    },
    hasPermission('view_crm') && { 
      id: 'crm', 
      label: 'CRM', 
      icon: crm, 
      path: `${basePath}/crm` 
    },
    hasAnyPermission(['view_users', 'create_user', 'edit_user', 'delete_user']) && { 
      id: 'hr', 
      label: 'HR & Users', 
      icon: hr_icon, 
      path: `${basePath}/hr` 
    },
  ].filter(Boolean) as MenuItem[];
  
  // Filter menus based on permissions
  const filteredOperationMenus = operationMenus.filter(menu => {
    if (menu.id === 'pos') return hasPermission('access_pos') || isSuperAdmin;
    if (menu.id === 'inventory') return hasPermission('view_inventory') || isSuperAdmin;
    if (menu.id === 'sales') return hasPermission('process_sale') || isSuperAdmin;
    if (menu.id === 'purchase') return hasPermission('view_purchases') || isSuperAdmin;
    return false;
  });
  
  const filteredFinanceMenus = financeMenus.filter(menu => {
    if (menu.id === 'accounting') return hasPermission('view_balance_sheet') || isSuperAdmin;
    if (menu.id === 'reports') return hasPermission('view_reports') || isSuperAdmin;
    if (menu.id === 'crm') return hasPermission('view_crm') || isSuperAdmin;
    if (menu.id === 'hr') return hasPermission('view_users') || isSuperAdmin;
    return false;
  });
  
  // Check if current path is under POS section
  const isPosPathActive = location.pathname.startsWith(`${basePath}/pos`);
  
  // Auto-open POS dropdown if on POS page
  useEffect(() => {
    if (isPosPathActive && !collapsed) {
      setIsPosOpen(true);
    }
  }, [isPosPathActive, collapsed]);
  
  const handleMenuClick = (menu: MenuItem) => {
    // If menu has submenu, toggle dropdown
    if (menu.submenu && !collapsed) {
      if (menu.id === 'pos') {
        setIsPosOpen(!isPosOpen);
      }
      return;
    }
    
    // Otherwise navigate
    if (onMenuSelect) {
      onMenuSelect(menu.label);
    }
    if (menu.path) {
      navigate(menu.path);
    }
  };
  
  const handleSubmenuClick = (submenu: SubMenuItem, parentLabel: string) => {
    if (onMenuSelect) {
      onMenuSelect(submenu.label);
    }
    navigate(submenu.path);
  };
  
  const findActiveMenuLabel = () => {
    const currentPath = location.pathname;
    
    // Check submenus first
    for (const menu of operationMenus) {
      if (menu.submenu) {
        const activeSubmenu = menu.submenu.find(sub => sub.path === currentPath);
        if (activeSubmenu) return activeSubmenu.label;
      }
    }
    
    // Then check main menus
    const allMenus = [...menuItems, ...operationMenus, ...financeMenus];
    const activeMenu = allMenus.find(menu => menu.path === currentPath);
    return activeMenu?.label || 'Dashboard Overview';
  };
  
  // Initialize page title on component mount
  useEffect(() => {
    if (onMenuSelect) {
      const title = findActiveMenuLabel();
      onMenuSelect(title);
    }
  }, [location.pathname, onMenuSelect]);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate(isSuperAdmin ? '/admin_login' : '/login');
  };
  
  const renderMenuSection = (title: string, menus: MenuItem[]) => (
    <div className="mb-6">
      {!collapsed && menus.length > 0 && (
        <h3 className="px-2 mb-2 text-lg font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      )}
      
      <div className="space-y-1">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          const hasSubmenu = menu.submenu && menu.submenu.length > 0;
          const isSubmenuOpen = menu.id === 'pos' && isPosOpen;
          const isParentActive = menu.submenu?.some(sub => sub.path === location.pathname);
          
          return (
            <div key={menu.id}>
              {/* Main Menu Item */}
              <button
                onClick={() => handleMenuClick(menu)}
                className={`w-full flex items-center rounded-lg transition-all duration-200 cursor-pointer ${
                  collapsed 
                    ? 'justify-center p-3' 
                    : 'px-4 py-3 space-x-3'
                } ${
                  isActive || isParentActive
                    ? 'bg-gray-200 text-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <div className={`flex-shrink-0 ${isActive || isParentActive ? 'text-blue-500' : 'text-gray-500'}`}>
                  <img 
                    src={menu.icon} 
                    alt={menu.label}
                    className="w-5 h-5 object-contain"
                  />
                </div>
                
                {!collapsed && (
                  <>
                    <span className="text-lg font-medium truncate flex-1 text-left">
                      {menu.label}
                    </span>
                    
                    {hasSubmenu && (
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSubmenuOpen ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </>
                )}
              </button>
              
              {/* Submenu Items - Only show when not collapsed */}
              {hasSubmenu && !collapsed && isSubmenuOpen && (
                <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                  {menu.submenu!.map((submenu) => {
                    const isSubmenuActive = location.pathname === submenu.path;
                    return (
                      <button
                        key={submenu.id}
                        onClick={() => handleSubmenuClick(submenu, menu.label)}
                        className={`w-full flex items-center rounded-lg transition-all duration-200 px-4 py-2.5 cursor-pointer ${
                          isSubmenuActive 
                            ? 'bg-blue-50 text-blue-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                        }`}
                      >
                        <span className="text-base truncate">{submenu.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  
  return (
    <aside 
      className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto z-40 ${
        collapsed ? 'w-20' : 'w-80'
      }`}
      style={{ height: '100vh' }}
    >
      {/* Sidebar Header */}
      <div className={`py-3 h-18 border-b border-gray-200 ${collapsed ? 'px-3' : 'px-6'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img src={erp_logo} alt="ERP Logo" className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">ERP</h2>
                  <p className="text-sm text-gray-400">Enterprise Suite</p>
                </div>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Collapse sidebar"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100"
              aria-label="Expand sidebar"
            >
              <img src={erp_logo} alt="ERP Logo" className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      
      {/* Menu Items */}
      <div className={`py-4 ${collapsed ? 'px-1' : 'px-4'}`}>
        {menuItems.length > 0 && (
          <div className="mb-6">
            {menuItems.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <button
                  key={menu.id}
                  onClick={() => handleMenuClick(menu)}
                  className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                    collapsed 
                      ? 'justify-center p-3' 
                      : 'px-4 py-3 space-x-3'
                  } ${
                    isActive 
                      ? 'bg-gray-200 text-blue-600 font-bold' 
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }`}
                >
                  <div className={`flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                    <img 
                      src={menu.icon} 
                      alt={menu.label}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  {!collapsed && (
                    <span className="text-lg font-medium">{menu.label}</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        
        {filteredOperationMenus.length > 0 && renderMenuSection('Operations', filteredOperationMenus)}
        {filteredFinanceMenus.length > 0 && renderMenuSection('Finance & HR', filteredFinanceMenus)}
      </div>
      
      {/* Logout Button */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 ${
        collapsed ? 'p-3' : 'p-4'
      }`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors ${
            collapsed 
              ? 'justify-center p-3' 
              : 'px-4 py-3 space-x-3'
          }`}
        >
          <img src={logout_icon} alt="Logout" className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}