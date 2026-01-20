// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/auth/pages/DashboardPage';
// import ProtectedRoute from '../components/auth/ProtectedRoute'; // Create this if needed

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
  { 
    path: '/login', 
    element: <LoginPage />
  },
  // Add more routes as needed
  // {
  //   path: '/inventory',
  //   element: <ProtectedRoute><InventoryPage /></ProtectedRoute>,
  // },
]);