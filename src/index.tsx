import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log(`
🚀 STELLAR FUNDING PLATFORM
===========================
✅ React app starting...
🌐 Available at: http://localhost:3000

📱 Features:
- Responsive design
- Donation modal
- Campaign tracking
- Impact dashboard
- Real-time updates
`);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
