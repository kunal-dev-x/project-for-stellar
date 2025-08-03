# Stellar Funding Platform

A blockchain-powered social/innovation funding platform built with React and TypeScript.

## 🚀 Quick Start Options

### Option 1: HTML Demo (No Setup Required)
1. Open `src/components/DonationModal/index.html` in your browser
2. Click "Donate Now" to test the donation modal

### Option 2: Full React Development Setup

#### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

#### Installation Steps

1. **Open Command Prompt/Terminal**
   ```bash
   cd "c:\Users\Asus\Desktop\project for stellar"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - Automatically opens at `http://localhost:3000`
   - Or manually visit: http://localhost:3000

#### Alternative: Simple Server
```bash
# If you have Python installed
npm run demo

# Or use npx serve
npx serve . -p 3000
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── DonationModal/
│   │   ├── DonationModal.tsx    # Main donation component
│   │   └── index.html           # Standalone demo
│   ├── Layout/
│   │   ├── Layout.js
│   │   └── Sidebar.js
│   ├── Dashboard/
│   │   └── Dashboard.js
│   └── Campaigns/
│       └── Campaigns.js
├── context/
│   └── AppContext.js            # Global state management
├── types.ts                     # TypeScript type definitions
├── index.css                    # Global styles with Tailwind
└── App.tsx                      # Main app component
```

## 🎯 Features

- ✅ Responsive donation modal with 3-step flow
- ✅ Campaign progress tracking
- ✅ Multiple payment methods (Stellar, Crypto, Card)
- ✅ Transaction fee calculation
- ✅ Form validation and error handling
- ✅ Loading states and success animations
- ✅ Mobile-responsive design

## 🛠️ Technologies

- React 18 with TypeScript
- TailwindCSS for styling
- React Router for navigation
- Material Icons
- Mock data for demonstration

## 📱 Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
