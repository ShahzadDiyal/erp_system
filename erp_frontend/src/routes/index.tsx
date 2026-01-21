import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/auth/pages/DashboardPage';

// Import inventory pages
import InventoryDashboardPage from '../features/inventory/pages/InventoryDashboardPage';
import CategoryPage from '../features/inventory/pages/CategoryPage';
import InventoryReportPage from '../features/inventory/pages/InventoryReportPage';

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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);