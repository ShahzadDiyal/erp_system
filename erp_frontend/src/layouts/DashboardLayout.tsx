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

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - Full height on left */}
        <Sidebar 
          collapsed={sidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />

        {/* Main Content Area (Topbar + Content) */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-80'}`}>
          {/* Topbar - Starts where sidebar ends */}
          <Topbar 
            sidebarCollapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar} 
          />

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}