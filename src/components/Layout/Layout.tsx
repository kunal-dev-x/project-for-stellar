import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">Stellar Funding Platform</h1>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
