// src/layouts/components/Sidebar.tsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import erp_logo from '../../assets/icons/erp_logo.png'
import dashboard from '../../assets/icons/dashboard.png'
import inventory from '../../assets/icons/inventory.png'
import pos from '../../assets/icons/pos.png'
import purchases from '../../assets/icons/purchases.png'
import sales from '../../assets/icons/sales.png'
// import logistics from '../../assets/icons/logistics.png'
import hr from '../../assets/icons/hr.png'
import crm from '../../assets/icons/crm.png'
import accounting from '../../assets/icons/accounting.png'
import reports from '../../assets/icons/accounting.png'
import logout_icon from '../../assets/icons/logout.png'

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: string; // This will be your uploaded image URL or path
  path?: string;
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  // Menu items - replace icon paths with your uploaded images
  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboard, path: '/' },
  ];

  const operationMenus: MenuItem[] = [
    { id: 'inventory', label: 'Inventory', icon: inventory, path: '/fg' },
    { id: 'pos', label: 'POS', icon: pos, path: '/df' },
    { id: 'sales', label: 'Sales', icon: sales, path: '/dgh' },
    { id: 'purchase', label: 'Purchase', icon: purchases, path: '/dfhe' },
    // { id: 'logistics', label: 'Logistics', icon: logistics, path: '/logistics' },
  ];

  const financeMenus: MenuItem[] = [
    { id: 'accounting', label: 'Accounting', icon: accounting, path: '/hf' },
    { id: 'reports', label: 'Reports', icon: reports, path: '/gder' },
    { id: 'crm', label: 'CRM', icon: crm, path: '/dfg' },
    { id: 'hr', label: 'HR', icon: hr, path: '/rdgf' },
  ];

  const handleMenuClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderMenuSection = (title: string, menus: MenuItem[]) => (
    <div className="mb-6">
      {/* Section Heading - No icon, just text */}
      {!collapsed && (
        <h3 className="px-2 mb-2 text-lg font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      )}
      
      {/* Menu Items */}
      <div className="space-y-1">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.path)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                collapsed 
                  ? 'justify-center p-3' 
                  : 'px-4 py-3 space-x-3'
              } ${
                isActive 
                  ? 'bg-gray-900 text-blue-500' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
              }`}
            >
              {/* Your uploaded icon image */}
              <div className={`flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                {menu.icon.startsWith('/') ? (
                  <img 
                    src={menu.icon} 
                    alt={menu.label}
                    className="w-5 h-5 object-contain"
                  />
                ) : (
                  <span className="text-lg">{menu.icon}</span>
                )}
              </div>
              
              {/* Menu Label (hidden when collapsed) */}
              {!collapsed && (
                <span className="text-lg font-medium truncate">{menu.label}</span>
              )}
            </button>
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
      {/* Sidebar Header - Centered with margins */}
      <div className={`py-3 h-18 border-b border-gray-200 ${collapsed ? 'px-3' : 'px-6'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <>
              <div className="flex items-center space-x-3">
                {/* Your ERP logo/image */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <img src={erp_logo} alt="" />
                </div>
              <div>
                  <h2 className="text-xl font-bold text-gray-900">ERP</h2>
                <p className='text-gray-400'>Enterprise Suite</p>
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
            <>
              <button
                onClick={toggleSidebar}
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                aria-label="Expand sidebar"
              >
                <img src={erp_logo} alt="" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu Items - With margins */}
      <div className={`py-4 ${collapsed ? 'px-1' : 'px-4'}`}>
        {/* Dashboard Menu */}
        <div className="mb-6">
          {menuItems.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <button
                key={menu.id}
                onClick={() => handleMenuClick(menu.path)}
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
                  {menu.icon.startsWith('/') ? (
                    <img 
                      src={menu.icon} 
                      alt={menu.label}
                      className="w-6 h-6 object-contain"
                    />
                  ) : (
                    <span className="text-lg">{menu.icon}</span>
                  )}
                </div>
                {!collapsed && (
                  <span className="text-lg font-medium">{menu.label}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Operations Section */}
        {renderMenuSection('Operations', operationMenus)}
        
        {/* Finance & HR Section */}
        {renderMenuSection('Finance & HR', financeMenus)}
      </div>

      {/* Logout Button - Fixed at bottom with margins */}
      <div className={`absolute bottom-0 left-0 right-0 bg-white ${
        collapsed ? 'p-3' : 'p-4'
      }`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center rounded-lg hover:bg-red-500 hover:text-white transition-colors ${
            collapsed 
              ? 'justify-center p-3' 
              : 'px-4 py-3 space-x-3'
          }`}
        >
          <img src={logout_icon} alt="" color='white' />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}