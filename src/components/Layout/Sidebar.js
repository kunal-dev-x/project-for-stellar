import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: 'dashboard', label: 'Dashboard' },
    { path: '/campaigns', icon: 'campaign', label: 'Campaigns' },
    { path: '/donations', icon: 'volunteer_activism', label: 'Donations' },
    { path: '/impact', icon: 'trending_up', label: 'My Impact' },
    { path: '/settings', icon: 'settings', label: 'Settings' }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-primary-600">StellarFund</h1>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <span className="material-icons text-gray-600">
                {isCollapsed ? 'menu_open' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="material-icons">{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <nav className="flex justify-around py-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg ${
                location.pathname === item.path 
                  ? 'text-primary-600' 
                  : 'text-gray-600'
              }`}
            >
              <span className="material-icons text-sm">{item.icon}</span>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
