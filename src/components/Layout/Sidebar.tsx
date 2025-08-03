import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>Home</li>
        <li>My Campaigns</li>
        <li>Donations</li>
        <li>Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;

export {};