# 🏗️ Developer Guide - Zurl Frontend

A comprehensive guide for developers working with the improved Zurl codebase.

---

## 📚 Table of Contents

1. [Code Structure](#code-structure)
2. [Component Patterns](#component-patterns)
3. [Styling Guidelines](#styling-guidelines)
4. [API Integration](#api-integration)
5. [Error Handling](#error-handling)
6. [Best Practices](#best-practices)
7. [Common Patterns](#common-patterns)

---

## 🏗️ Code Structure

### Folder Organization

```
src/
├── Components/          # Reusable components
│   ├── Navbar.jsx      # Header navigation
│   ├── Alertmessage.jsx # Toast messages
│   ├── List.jsx        # URL list
│   └── Loaders/        # Loading skeletons
├── Pages/              # Full-page components
│   ├── Dashboard.jsx   # Main page
│   ├── Login/          # Auth page
│   └── Register/       # Signup page
├── Services/           # API calls
│   └── UserServices.js # User API
├── Context/            # Global state
│   └── AuthContext.jsx # Auth state
├── hooks/              # Custom hooks
│   ├── useAlert.js
│   └── useAsync.js
├── utils/              # Utility functions
│   ├── cookieUtils.js
│   ├── validators.js
│   └── errorHandler.js
├── constants/          # App constants
│   └── index.js
└── App.jsx             # Main app
```

### Why This Structure?

- **Separation of Concerns**: Each folder has a specific responsibility
- **Scalability**: Easy to add new features without reorganizing
- **Reusability**: Shared utilities and hooks across components
- **Maintainability**: Clear hierarchy and dependencies
- **Testing**: Easier to test isolated functionality

---

## 🎯 Component Patterns

### 1. Functional Component Pattern

```jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);

  return <div>Content</div>;
};

export default MyComponent;
```

### 2. Component with Props and PropTypes

```jsx
const MyComponent = ({ title, onSubmit, isLoading = false }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </div>
  );
};

export default MyComponent;
```

### 3. Component with Custom Hook

```jsx
import { useAlert } from '@/hooks';

const FormComponent = () => {
  const { showAlert, alert, isShowing } = useAlert();

  const handleSubmit = async () => {
    try {
      // Operation
      showAlert('Success!', 'success');
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  return (
    <>
      {isShowing && <AlertDisplay message={alert.message} />}
      <form onSubmit={handleSubmit}>Form content</form>
    </>
  );
};
```

---

## 🎨 Styling Guidelines

### ✅ DO's

```jsx
// ✅ Use Tailwind classes
<div className="flex items-center gap-4 px-4 py-2 bg-blue-500 rounded-lg">
  Content
</div>

// ✅ Use semantic color names
<button className="bg-primary-600 hover:bg-primary-700">
  Click me
</button>

// ✅ Chain related classes
<input className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200" />

// ✅ Use responsive classes
<div className="w-full md:w-1/2 lg:w-1/3">
  Responsive
</div>
```

### ❌ DON'Ts

```jsx
// ❌ Don't use inline styles
<div style={{ display: 'flex', padding: '10px' }}>

// ❌ Don't mix inline styles and Tailwind
<div className="flex" style={{ color: 'red' }}>

// ❌ Don't use arbitrary values unnecessarily
<div className="w-[237px]">  // Use lg:w-3/5 instead

// ❌ Don't create CSS files for simple styling
// Create at .css file - use Tailwind instead
```

### Color Usage

```jsx
// Primary colors for main actions
<button className="bg-primary-600">Primary</button>

// Dark colors for backgrounds
<div className="bg-dark-900">Dark background</div>

// Surface colors for cards
<div className="bg-surface-card">Card</div>

// Status colors
<div className="bg-green-500">Success</div>
<div className="bg-red-500">Error</div>
<div className="bg-yellow-500">Warning</div>
<div className="bg-blue-500">Info</div>
```

---

## 🔌 API Integration

### Creating a New API Call

```javascript
// Step 1: Add constant in constants/index.js
export const API_ENDPOINTS = {
  USER: {
    PROFILE: '/view_profile',
    UPDATE: '/update_profile',  // Add new
  },
};

// Step 2: Add method to UserServices.js
const updateProfile = async (data) => {
  try {
    const response = await API.post(API_ENDPOINTS.USER.UPDATE, data);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    logError(error, 'UserServices.updateProfile');
    throw error;
  }
};

// Step 3: Use in component
const handleUpdate = async () => {
  try {
    const result = await UserServices.updateProfile(formData);
    showAlert('Profile updated!', 'success');
  } catch (error) {
    showAlert(getErrorMessage(error), 'error');
  }
};
```

### API Response Handling

```javascript
// Good - consistent error handling
try {
  const response = await API.post(endpoint, data);
  if (response.status === 200) {
    return response.data;
  }
} catch (error) {
  logError(error, 'context');
  throw error; // Let caller handle
}

// Component catches it
try {
  const result = await UserServices.method();
} catch (error) {
  const msg = getErrorMessage(error);
  showAlert(msg, 'error');
}
```

---

## 🛡️ Error Handling

### Error Handling Pattern

```jsx
import { getErrorMessage, logError } from '@/utils/errorHandler';
import { ALERT_TYPES } from '@/constants';

const MyComponent = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);

  const handleAction = async () => {
    setLoading(true);
    setMessageType(ALERT_TYPES.INFO);
    setMessage('Processing...');

    try {
      const result = await someAsyncAction();
      setMessageType(ALERT_TYPES.SUCCESS);
      setMessage('Operation successful!');
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      setMessageType(ALERT_TYPES.ERROR);
      setMessage(errorMsg);
      logError(error, 'MyComponent.handleAction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Alertmessage message={message} type={messageType} />
      <button onClick={handleAction} disabled={loading}>
        {loading ? 'Loading...' : 'Action'}
      </button>
    </>
  );
};
```

### Custom Error Class

```javascript
import { ApiError } from '@/utils/errorHandler';

// Throw custom error
throw new ApiError('User not found', 404, { userId: 123 });

// Catch it
catch (error) {
  if (error instanceof ApiError) {
    console.log(error.statusCode); // 404
    console.log(error.data); // { userId: 123 }
  }
}
```

---

## ✨ Best Practices

### 1. Use Constants, Not Magic Strings

```jsx
// ❌ Bad
if (messageType === 'success') { }

// ✅ Good
import { ALERT_TYPES } from '@/constants';
if (messageType === ALERT_TYPES.SUCCESS) { }
```

### 2. Validate Input Early

```jsx
// ✅ Good
const handleSubmit = (email) => {
  if (!validators.isValidEmail(email)) {
    showAlert('Invalid email', 'warning');
    return;
  }
  // Proceed with valid data
};
```

### 3. Use Custom Hooks

```jsx
// ✅ Good - Don't repeat toast logic
const { showAlert, alert } = useAlert();

// Instead of:
// ❌ const [message, setMessage] = useState('');
//    const [type, setType] = useState(null);
//    useEffect(() => { setTimeout(...) }, [type])
```

### 4. Handle Loading States

```jsx
// ✅ Good
const [isLoading, setIsLoading] = useState(false);

<button disabled={isLoading}>
  {isLoading ? 'Loading...' : 'Submit'}
</button>

// ❌ Bad
<button>Submit</button>  // No feedback
```

### 5. Centralize Configuration

```jsx
// ✅ Good
import config from '@/config';
const apiUrl = config.api.baseURL;

// ❌ Bad
const apiUrl = process.env.VITE_API_BASE_URL;
const timeout = 30000; // Hardcoded
```

### 6. Use Proper Import Paths

```jsx
// ✅ Good - with aliases
import { ROUTES } from '@/constants';
import Logger from '@/utils/Logger';

// ❌ Bad - relative paths
import { ROUTES } from '../../../constants';
import Logger from '../../../utils/Logger';
```

---

## 🔄 Common Patterns

### Pattern 1: Form with Validation

```jsx
import { validators, getPasswordErrorMessage } from '@/utils/validators';

const Form = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    setPasswordError(getPasswordErrorMessage(pwd));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validators.isValidEmail(email)) {
      showAlert('Invalid email', 'warning');
      return;
    }
    
    if (passwordError) {
      showAlert(passwordError, 'error');
      return;
    }

    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={password} onChange={handlePasswordChange} />
      {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Pattern 2: Async Data Loading

```jsx
import { useAsync } from '@/hooks';

const UserList = () => {
  const { execute, loading, data, error } = useAsync(UserServices.getUsers);

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### Pattern 3: Protected Route

```jsx
// AuthContext provides isLoggedIn
const ProtectedPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return <Dashboard />;
};
```

### Pattern 4: Alert Messages

```jsx
const MyComponent = () => {
  const { showAlert, alert } = useAlert();

  const handleAction = async () => {
    try {
      showAlert('Processing...', ALERT_TYPES.INFO);
      await someAction();
      showAlert('Success!', ALERT_TYPES.SUCCESS);
    } catch (error) {
      showAlert(getErrorMessage(error), ALERT_TYPES.ERROR);
    }
  };

  return (
    <>
      <Alertmessage message={alert.message} type={alert.type} />
      <button onClick={handleAction}>Action</button>
    </>
  );
};
```

---

## 📋 Naming Conventions

### Files and Folders

```
src/
├── Components/        # PascalCase, Plural
├── Pages/            # PascalCase, Plural
├── Services/         # snake_case.js, Plural, ends with 'Services'
├── utils/            # lowercase, Plural
├── hooks/            # lowercase, Plural
├── constants/        # lowercase, Plural
├── Context/          # PascalCase, ends with 'Context'
└── styles/           # lowercase, Plural
```

### JavaScript

```javascript
// Constants - UPPERCASE_SNAKE_CASE
const MAX_RETRIES = 3;
const API_TIMEOUT = 30000;

// Variables and Functions - camelCase
const userData = [];
const getUserData = () => {};

// React Components - PascalCase
const UserProfile = () => {};
const AlertMessage = () => {};

// Classes - PascalCase
class UserService {}
class ApiError {}

// Boolean variables - prefixed with is/has
const isLoading = false;
const hasError = true;
const isValid = () => {};
```

---

## 🧪 Testing Patterns

```javascript
// Example: Testing a validator
describe('validators', () => {
  test('should validate email correctly', () => {
    expect(validators.isValidEmail('test@example.com')).toBe(true);
    expect(validators.isValidEmail('invalid')).toBe(false);
  });

  test('should validate password strength', () => {
    expect(validators.isValidPassword('Weak123')).toBe(false);
    expect(validators.isValidPassword('Strong@123')).toBe(true);
  });
});
```

---

## 🚀 Performance Tips

1. **Use React.memo for expensive components**
   ```jsx
   const MemoizedComponent = React.memo(MyComponent);
   ```

2. **Use useCallback for stable references**
   ```jsx
   const memoizedCallback = useCallback(() => {
     doSomething();
   }, [dependency]);
   ```

3. **Code split routes**
   ```jsx
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

4. **Optimize images**
   ```jsx
   <img src={image} alt="description" loading="lazy" />
   ```

---

## 📞 Quick Reference

### Imports

```javascript
// Utils
import { validators, getPasswordErrorMessage } from '@/utils/validators';
import { getErrorMessage, logError } from '@/utils/errorHandler';
import { cookieUtils } from '@/utils/cookieUtils';

// Hooks
import { useAlert, useAsync } from '@/hooks';

// Constants
import { ROUTES, ALERT_TYPES, API_ENDPOINTS } from '@/constants';

// Services
import UserServices from '@/services/UserServices';

// Context
import { AuthContext } from '@/context/AuthContext';
```

### Common Operations

```javascript
// Show alert
const { showAlert } = useAlert();
showAlert('Message', 'success');

// Get error message
import { getErrorMessage } from '@/utils/errorHandler';
const msg = getErrorMessage(error);

// Validate
import { validators } from '@/utils/validators';
if (validators.isValidEmail(email)) { }

// Navigate
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate(ROUTES.HOME);

// Cookies
import { cookieUtils } from '@/utils/cookieUtils';
cookieUtils.setCookie('token', value);
```

---

**Happy coding! 🎉**
