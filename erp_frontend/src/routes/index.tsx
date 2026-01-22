import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/auth/pages/DashboardPage';

// Import inventory pages
import InventoryDashboardPage from '../features/inventory/pages/InventoryDashboardPage';
import CategoryPage from '../features/inventory/pages/CategoryPage';
import InventoryReportPage from '../features/inventory/pages/InventoryReportPage';

import POSTerminalPage from '../features/pos/pages/posTerminalPage';
import POSCashBoxPage from '../features/pos/pages/cashBoxPage'
import POSOrders from '../features/pos/pages/posOrdersPage'
import POSShiftReports from '../features/pos/pages/shiftReportsPage'
import OpenPOSPage from '../features/pos/pages/openPosPage'
// Simple protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // You can add your auth logic here
  const isAuthenticated = true; // Replace with actual auth check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'inventory',
        children: [
          {
            index: true,
            element: <InventoryDashboardPage />,
          },
          {
            path: 'dashboard',
            element: <InventoryDashboardPage />,
          },
          {
            path: 'reports',
            element: <InventoryReportPage />,
          },
           
          {
            path: 'categories',
            element: <CategoryPage />,
          },
          
        ],
      },
      {
        path: 'pos',
        children: [
          {
            index: true,
            element: <OpenPOSPage />,
          },
          {
            path: 'terminal',
            element: <POSTerminalPage />,
          },
          {
            path: 'cashbox',
            element: <POSCashBoxPage />,
          },
           
          {
            path: 'orders',
            element: <POSOrders />,
          },
          {
            path: 'shift_reports',
            element: <POSShiftReports />,
          },
          
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);