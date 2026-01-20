import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/auth/pages/DashboardPage';

// Import inventory pages
import InventoryDashboardPage from '../features/inventory/pages/InventoryDashboardPage';
import ProductListPage from '../features/inventory/pages/ProductListPage';
import ProductDetailPage from '../features/inventory/pages/ProductDetailPage';
import CategoryPage from '../features/inventory/pages/CategoryPage';
import SupplierPage from '../features/inventory/pages/SupplierPage';
import StockAdjustmentPage from '../features/inventory/pages/StockAdjustmentPage';

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
            path: 'products',
            element: <ProductListPage />,
          },
          {
            path: 'products/:id',
            element: <ProductDetailPage />,
          },
          {
            path: 'add',
            element: <ProductDetailPage />,
          },
          {
            path: 'categories',
            element: <CategoryPage />,
          },
          {
            path: 'suppliers',
            element: <SupplierPage />,
          },
          {
            path: 'adjust-stock',
            element: <StockAdjustmentPage />,
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