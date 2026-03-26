# Zurl - URL Shortener Frontend

A modern, fast, and responsive URL shortening service built with React, Vite, and Tailwind CSS.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Code Quality](#code-quality)
- [Improvements Made](#improvements-made)
- [Contributing](#contributing)

## ✨ Features

- 🔗 URL shortening with custom slug support
- 👤 User authentication (Email/Password & Google OAuth)
- 📊 URL analytics and click tracking
- 🔐 Secure authentication with JWT tokens
- 📱 Fully responsive design
- ⚡ Fast performance with Vite bundler
- 🎨 Beautiful UI with Tailwind CSS
- 🌙 Dark mode support
- 📧 Email verification with OTP
- 💾 URL history tracking

## 🛠 Tech Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 4.0
- **HTTP Client**: Axios
- **State Management**: Redux Toolkit, Redux Persist
- **Router**: React Router DOM 6
- **Authentication**: JWT (Cookies)
- **UI Components**: Ionic React, Lottie React
- **Code Quality**: ESLint, Prettier

## 📦 Prerequisites

- Node.js 16+ or 18+
- npm or yarn package manager
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd zurl-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```
   VITE_API_BASE_URL=https://your-api-url.com
   VITE_API_TIMEOUT=30000
   VITE_ENV=development
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://theslugproject.onrender.com
VITE_API_TIMEOUT=30000

# Firebase Configuration (optional)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain

# Environment
VITE_ENV=development
VITE_DEBUG=true
```

### Tailwind Configuration

Tailwind is pre-configured with custom theme colors and utilities. See `tailwind.config.js` for customization options.

## 📜 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run lint`** - Run ESLint
- **`npm run lint:fix`** - Fix ESLint issues
- **`npm run format`** - Format code with Prettier

## 📁 Project Structure

```
src/
├── Components/          # Reusable React components
│   ├── Alertmessage.jsx
│   ├── Navbar.jsx
│   ├── List.jsx
│   ├── Loaders/
│   └── ...
├── Pages/              # Page components
│   ├── Dashboard.jsx
│   ├── Login/
│   ├── Register/
│   ├── History.jsx
│   └── ...
├── Services/           # API service calls
│   ├── UserServices.js
│   └── AuthServices.js
├── Context/            # React Context (Auth, etc)
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAlert.js
│   ├── useAsync.js
│   └── index.js
├── utils/              # Utility functions
│   ├── cookieUtils.js
│   ├── validators.js
│   ├── errorHandler.js
│   └── ...
├── constants/          # App constants
│   └── index.js
├── styles/             # Global styles
│   └── ...
├── App.jsx             # Main App component
├── main.jsx            # React DOM mount point
├── config.js           # Configuration file
└── index.css           # Tailwind imports
```

## 🎯 Code Quality

### ESLint Configuration

The project uses ESLint with React best practices. Configuration includes:
- React and React Hooks rules
- Prettier integration
- Strict mode checks

### Prettier Configuration

Automatic code formatting for consistent style:
- 2-space indentation
- Single quotes
- Trailing commas
- 100-character line width

## 🔄 Improvements Made

### 1. **Package Management**
- ✅ Removed unused dependencies (Material Tailwind, cookies-js, public-ip)
- ✅ Upgraded Tailwind to v4.0-beta.4
- ✅ Added ESLint and Prettier Dev Dependencies
- ✅ Updated all major dependencies to latest stable versions

### 2. **Project Structure**
- ✅ Created `utils/` folder with utility functions
- ✅ Created `hooks/` folder with custom React hooks
- ✅ Created `constants/` folder for app-wide constants
- ✅ Created proper configuration file (`config.js`)
- ✅ Created `.env.example` for environment setup

### 3. **Tailwind CSS**
- ✅ Extended theme with custom colors
- ✅ Added comprehensive color palette
- ✅ Defined spacing, typography, and shadows
- ✅ Removed all inline styles
- ✅ Migrated to Tailwind utility classes

### 4. **React Components**
- ✅ Removed inline styles - now using Tailwind classes
- ✅ Improved component naming conventions (PascalCase)
- ✅ Added proper prop validation and error handling
- ✅ Implemented proper state management patterns
- ✅ Added loading states and error boundaries
- ✅ Improved accessibility

### 5. **Error Handling**
- ✅ Created centralized error handling utilities
- ✅ Added proper error messages for users
- ✅ Implemented error logging
- ✅ Added try-catch blocks in async operations
- ✅ Created custom error class (ApiError)

### 6. **API Integration**
- ✅ Created API constants for all endpoints
- ✅ Centralized Axios configuration
- ✅ Improved error handling in API calls
- ✅ Added request/response authentication
- ✅ Removed hardcoded API URLs

### 7. **Code Quality**
- ✅ Added ESLint configuration with strict rules
- ✅ Added Prettier for consistent formatting
- ✅ Removed console.log in non-critical areas
- ✅ Removed commented-out code
- ✅ Fixed unused imports
- ✅ Improved code consistency

### 8. **Configuration**
- ✅ Enhanced `vite.config.js` with path aliases
- ✅ Updated `tsconfig` equivalent for better IDE support
- ✅ Improved build optimization settings
- ✅ Added dev server configuration

### 9. **Cookie Management**
- ✅ Unified cookie handling in `cookieUtils.js`
- ✅ Removed library duplication
- ✅ Added secure cookie options
- ✅ Improved token management

### 10. **Validation**
- ✅ Created centralized validation utilities
- ✅ Added email, password, URL, and mobile validation
- ✅ Improved error messages for validation failures
- ✅ Password strength validation with helpers

## 🔐 Security Improvements

- ✅ Secure cookie settings (Secure, SameSite)
- ✅ Proper error handling without exposing sensitive info
- ✅ Input validation on all forms
- ✅ HTTPS-ready configuration
- ✅ Token-based authentication

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Tailwind breakpoints (sm, md, lg, xl, 2xl)
- Touch-friendly interactive elements
- Optimized layouts for all screen sizes

## 🚢 Deployment

### Production Build
```bash
npm run build
```

Build output will be in `dist/` directory.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

## 🤝 Contributing

Please read our contributing guidelines before submitting pull requests.

### Code Style
- Use ESLint and Prettier for formatting
- Follow React best practices
- Write meaningful commit messages
- Keep components single-responsibility

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🆘 Support

For issues and questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include steps to reproduce

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [React Router Docs](https://reactrouter.com)

---

**Last Updated**: March 2026
**Current Version**: 1.0.0
