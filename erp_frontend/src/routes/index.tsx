// src/app/router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import AdminLoginPage from '../features/auth/pages/AdminLoginPage';
import DashboardPage from '../features/auth/pages/DashboardPage';
import AddStaff from '../features/auth/pages/AddStaff';
import CreateNewRole from '../features/auth/pages/CreateRole';

// Inventory
import InventoryDashboardPage from '../features/inventory/pages/InventoryDashboardPage';
import CategoryPage from '../features/inventory/pages/CategoryPage';
import InventoryReportPage from '../features/inventory/pages/InventoryReportPage';

// POS
import POSTerminalPage from '../features/pos/pages/posTerminalPage';
import POSCashBoxPage from '../features/pos/pages/cashBoxPage';
import POSOrders from '../features/pos/pages/posOrdersPage';
import POSShiftReports from '../features/pos/pages/shiftReportsPage';
import OpenPOSPage from '../features/pos/pages/openPosPage';

// Sales
import SalesDashboard from '../features/sales/pages/salesDashboard';
import CreateNewInvoice from '../features/sales/pages/createInvoice';
import AddInvoiceProducts from '../features/sales/pages/addInvoiceProducts';

// HR
import HRDashboard from '../features/hr/pages/HRDashboard';
import AddEmployee from '../features/hr/pages/AddEmployee';
import MarkAttendance from '../features/hr/pages/MarkAttendance';
import PreviewLeaveRequests from '../features/hr/pages/PreviewLeaveRequests';
import LeaveRequestDetails from '../features/hr/pages/LeaveRequestDetails';

// ---------------------------
// Helper functions
// ---------------------------
const getStoredUser = () => {
  const auth = localStorage.getItem('erp_auth') || localStorage.getItem('employee_auth');
  if (auth) {
    try {
      const parsed = JSON.parse(auth);
      return parsed.user;
    } catch {
      return null;
    }
  }
  return null;
};

const isSuperAdmin = () => {
  const user = getStoredUser();
  return user?.role?.role_name === 'Super Admin';
};

const isHR = () => {
  const user = getStoredUser();
  return user?.role?.role_name === 'HR' || user?.role?.role_name === 'HR Manager';
};

const hasPermission = (requiredPermission: string) => {
  const user = getStoredUser();
  if (!user || !user.role || !user.role.permissions) return false;

  // Super Admin has all permissions
  if (user.role.role_name === 'Super Admin') return true;

  // Check if permission exists in user's role permissions
  const permissions = user.role.permissions;
  return permissions.some((p: any) =>
    p.permission_name === requiredPermission ||
    p.name === requiredPermission
  );
};

const getDefaultRouteByRole = (roleName: string): string => {
  switch (roleName) {
    case 'Super Admin':
      return '/admin/dashboard';
    case 'HR':
    case 'HR Manager':
      return '/hr';
    case 'Cashier':
      return '/pos';
    case 'Inventory Manager':
      return '/inventory';
    case 'Sales':
    case 'Sales Manager':
      return '/sales';
    case 'Branch Manager':
      return '/inventory';
    default:
      return '/dashboard';
  }
};

// ---------------------------
// Auth wrappers
// ---------------------------
const EmployeeProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem('employee_auth');
  return auth ? <>{children}</> : <Navigate to="/login" replace />;
};

const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = localStorage.getItem('erp_auth');
  return auth ? <>{children}</> : <Navigate to="/admin_login" replace />;
};

// ---------------------------
// Permission wrapper
// ---------------------------
interface PermissionRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

const PermissionRoute = ({ children, requiredPermissions = [] }: PermissionRouteProps) => {
  const user = getStoredUser();
  const role = user?.role;

  // Super Admin bypass - no permission checks
  if (role?.role_name === 'Super Admin') return <>{children}</>;

  // If no specific permission required, allow access
  if (requiredPermissions.length === 0) return <>{children}</>;

  // Check if user has at least one required permission
  const hasAccess = requiredPermissions.some(p => hasPermission(p));

  // If user has access, render, else redirect to their default route
  if (!hasAccess) return <Navigate to={getDefaultRouteByRole(role?.role_name || '')} replace />;

  return <>{children}</>;
};

// ---------------------------
// Router definition
// ---------------------------
export const router = createBrowserRouter([
  // Login pages
  { path: '/login', element: <LoginPage /> },
  { path: '/admin_login', element: <AdminLoginPage /> },

  // Employee routes (for all non-Super Admin users)
  {
    path: '/',
    element: (
      <EmployeeProtectedRoute>
        <AppLayout />
      </EmployeeProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={getDefaultRouteByRole(getStoredUser()?.role?.role_name || '')} replace />
      },

      // Dashboard accessible to all authenticated users
      {
        path: 'dashboard',
        element: <DashboardPage />
      },

      // Sales routes
      {
        path: 'sales',
        children: [
          {
            index: true,
            element: (
              <PermissionRoute requiredPermissions={['process_sale', 'view_sales']}>
                <SalesDashboard />
              </PermissionRoute>
            )
          },
          {
            path: 'create_invoice',
            element: (
              <PermissionRoute requiredPermissions={['process_sale', 'create_invoice']}>
                <CreateNewInvoice />
              </PermissionRoute>
            )
          },
          {
            path: 'add_product',
            element: (
              <PermissionRoute requiredPermissions={['process_sale']}>
                <AddInvoiceProducts />
              </PermissionRoute>
            )
          },
        ],
      },

      // Inventory routes
      {
        path: 'inventory',
        children: [
          {
            index: true,
            element: (
              <PermissionRoute requiredPermissions={['view_inventory']}>
                <InventoryDashboardPage />
              </PermissionRoute>
            )
          },
          {
            path: 'dashboard',
            element: (
              <PermissionRoute requiredPermissions={['view_inventory']}>
                <InventoryDashboardPage />
              </PermissionRoute>
            )
          },
          {
            path: 'reports',
            element: (
              <PermissionRoute requiredPermissions={['view_inventory']}>
                <InventoryReportPage />
              </PermissionRoute>
            )
          },
          {
            path: 'categories',
            element: (
              <PermissionRoute requiredPermissions={['view_products']}>
                <CategoryPage />
              </PermissionRoute>
            )
          },
        ],
      },

      // POS routes
      {
        path: 'pos',
        children: [
          {
            index: true,
            element: (
              <PermissionRoute requiredPermissions={['access_pos']}>
                <OpenPOSPage />
              </PermissionRoute>
            )
          },
          {
            path: 'terminal',
            element: (
              <PermissionRoute requiredPermissions={['access_pos']}>
                <POSTerminalPage />
              </PermissionRoute>
            )
          },
          {
            path: 'cashbox',
            element: (
              <PermissionRoute requiredPermissions={['process_sale']}>
                <POSCashBoxPage />
              </PermissionRoute>
            )
          },
          {
            path: 'orders',
            element: (
              <PermissionRoute requiredPermissions={['process_sale']}>
                <POSOrders />
              </PermissionRoute>
            )
          },
          {
            path: 'shift_reports',
            element: (
              <PermissionRoute requiredPermissions={['process_sale']}>
                <POSShiftReports />
              </PermissionRoute>
            )
          },
        ],
      },

      // HR routes (for HR users - under /hr prefix)
      {
        path: 'hr',
        children: [
          {
            index: true,
            element: (
              <PermissionRoute requiredPermissions={['view_users', 'view_users']}>
                <HRDashboard />
              </PermissionRoute>
            )
          },
          {
            path: 'add_employee',
            element: (
              <PermissionRoute requiredPermissions={['view_users']}>
                <AddEmployee />
              </PermissionRoute>
            )
          },
          {
            path: 'mark_attendance',
            element: (
              <PermissionRoute requiredPermissions={['view_users']}>
                <MarkAttendance />
              </PermissionRoute>
            )
          },
          {
            path: 'leave_requests',
            element: (
              <PermissionRoute requiredPermissions={['view_users']}>
                <PreviewLeaveRequests />
              </PermissionRoute>
            )
          },
          {
            path: 'leave_requests/:id',
            element: (
              <PermissionRoute requiredPermissions={['view_users']}>
                <LeaveRequestDetails />
              </PermissionRoute>
            )
          },
          {
            path: 'create_role',
            element: (
              <PermissionRoute requiredPermissions={['view_users']}>
                <CreateNewRole />
              </PermissionRoute>
            )
          },
          {
            path: 'add_staff',
            element: (
              <PermissionRoute requiredPermissions={['view_users']}>
                <AddStaff />
              </PermissionRoute>
            )
          },
        ],
      },

      // HR Management routes at root level (for HR users)

    ],
  },

  // Admin routes (only for Super Admin - under /admin prefix)
  {
    path: '/admin',
    element: (
      <AdminProtectedRoute>
        <AppLayout />
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },

      // Admin Sales routes
      {
        path: 'sales',
        children: [
          { index: true, element: <SalesDashboard /> },
          { path: 'create_invoice', element: <CreateNewInvoice /> },
          { path: 'add_product', element: <AddInvoiceProducts /> },
        ],
      },

      // Admin Inventory routes
      {
        path: 'inventory',
        children: [
          { index: true, element: <InventoryDashboardPage /> },
          { path: 'dashboard', element: <InventoryDashboardPage /> },
          { path: 'reports', element: <InventoryReportPage /> },
          { path: 'categories', element: <CategoryPage /> },
        ],
      },

      // Admin POS routes
      {
        path: 'pos',
        children: [
          { index: true, element: <OpenPOSPage /> },
          { path: 'terminal', element: <POSTerminalPage /> },
          { path: 'cashbox', element: <POSCashBoxPage /> },
          { path: 'orders', element: <POSOrders /> },
          { path: 'shift_reports', element: <POSShiftReports /> },
        ],
      },

      // Admin HR routes
      {
        path: 'hr',
        children: [
          { index: true, element: <HRDashboard /> },
          { path: 'add_employee', element: <AddEmployee /> },
          { path: 'mark_attendance', element: <MarkAttendance /> },
          { path: 'leave_requests', element: <PreviewLeaveRequests /> },
          { path: 'leave_requests/:id', element: <LeaveRequestDetails /> },
           { path: 'add_staff', element: <AddStaff /> },
      { path: 'create_role', element: <CreateNewRole /> },
        ],
      },

      // Admin Management routes
     
    ],
  },

  // Catch all
  { path: '*', element: <Navigate to="/" replace /> },
]);