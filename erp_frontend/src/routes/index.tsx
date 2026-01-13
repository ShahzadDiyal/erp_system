import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardPage from '../features/auth/pages/DashboardPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <DashboardPage />}
        ],
    },
    { path: '/login', element: <LoginPage />}
])