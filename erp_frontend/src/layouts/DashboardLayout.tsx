// src/layouts/DashboardLayout.tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageTitle, setPageTitle] = useState('Dashboard Overview');

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMenuSelect = (title: string) => {
    setPageTitle(title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar}
          onMenuSelect={handleMenuSelect}
        />

        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
          <Topbar 
            sidebarCollapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar}
            pageTitle={pageTitle}
          />

          <main className="flex-1 p-6 overflow-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}