# 🔐 Authentication Implementation Guide

This document explains the authentication system structure and where each file belongs.

---

## 📂 Directory Structure & File Placements

### 1. **Context Files** — `src/context/`
These files handle global authentication state management.

#### `AuthContext.jsx`
- **Purpose**: Provides the authentication context that wraps the entire app
- **What it does**:
  - Creates a context with `user`, `login()`, and `logout()` functions
  - Stores user data in state and `localStorage` so login persists across page refreshes
  - Makes auth data available to all child components
- **Location**: `src/context/AuthContext.jsx`

#### `useAuth.js`
- **Purpose**: Custom hook to access auth context easily
- **What it does**:
  - Provides a simple way to use `const { user, login, logout } = useAuth()` in any component
  - Prevents errors if used outside AuthProvider
- **Location**: `src/context/useAuth.js`

---

### 2. **Component Files** — `src/components/`

#### `ProtectedRoute.jsx`
- **Purpose**: A wrapper component that guards routes requiring authentication
- **What it does**:
  - Checks if a user is logged in
  - If NOT logged in → redirects to `/login`
  - If logged in → shows the protected page
- **Usage**: Wrap routes like `<ProtectedRoute><Home /></ProtectedRoute>`
- **Location**: `src/components/ProtectedRoute.jsx`

#### `Navbar.jsx` (Updated)
- **Changes**:
  - Now imports `useAuth` and `useNavigate`
  - Shows logout button for authenticated users
  - Hides navbar completely if user is not logged in
  - Logout button redirects to login page
- **Location**: `src/components/Navbar.jsx`

---

### 3. **Page Files** — `src/pages/`

#### `Login.jsx`
- **Purpose**: Login page with email & password form
- **What it does**:
  - Uses Formik for form state management
  - Uses Yup for validation rules
  - On submit: calls `login()` and redirects to home
- **Route**: `/login` (public, anyone can access)
- **Location**: `src/pages/Login.jsx`

#### `Signup.jsx`
- **Purpose**: Signup page with name, email, password form
- **What it does**:
  - Uses a reusable `Field` component to reduce code duplication
  - Validates all fields including password confirmation
  - On submit: calls `login()` and redirects to home
- **Route**: `/signup` (public, anyone can access)
- **Location**: `src/pages/Signup.jsx`

---

### 4. **Root Files**

#### `App.jsx` (Updated)
- **Changes**:
  - Wraps everything with `<AuthProvider>`
  - Adds login and signup routes (public)
  - Wraps other routes with `<ProtectedRoute>`
  - Imports new components: `AuthProvider`, `ProtectedRoute`, `Login`, `Signup`
- **Location**: `src/App.jsx`

#### `package.json` (Updated)
- **Added dependencies**:
  - `formik@^2.4.5` — Form state & validation
  - `yup@^1.3.3` — Schema validation library
- **Location**: `package.json`

---

## 🔄 Data Flow

### Login/Signup Flow
```
User enters credentials
           ↓
Formik manages form state
           ↓
Yup validates inputs
           ↓
Form submitted → onSubmit handler
           ↓
login() function called with user data
           ↓
User data stored in state + localStorage
           ↓
navigate("/") redirects to home
```

### Protected Route Flow
```
User tries to access protected route (e.g., /tasks)
           ↓
ProtectedRoute checks if user is logged in
           ↓
If NOT logged in → <Navigate to="/login" />
           ↓
If logged in → Show the protected page
```

---

## 📋 How to Use Each Feature

### Accessing Auth in Any Component
```jsx
import { useAuth } from "../context/useAuth";

export default function MyComponent() {
  const { user, login, logout } = useAuth();
  
  // user = { email, name } or null if not logged in
}
```

### Creating a Protected Route
```jsx
<Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  }
/>
```

### Creating a Form with Formik + Yup
```jsx
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

const formik = useFormik({
  initialValues: { email: "" },
  validationSchema,
  onSubmit: (values) => {
    // Handle form submission
  },
});
```

---

## 🔑 Key Design Decisions

1. **localStorage for persistence**: User stays logged in after refresh
2. **Context API**: Simple, no need for Redux for this app
3. **Formik + Yup**: Industry standard for form validation in React
4. **ProtectedRoute wrapper**: Clean way to guard routes
5. **useAuth custom hook**: Makes accessing auth context easier throughout the app

---

## 🧪 Testing the Auth System

1. **Sign Up**: Go to `/signup` and create an account
2. **Check localStorage**: Open DevTools → Application → localStorage → verify user data saved
3. **Logout**: Click logout button in navbar
4. **Try accessing protected route**: Try going to `/tasks` without logging in → should redirect to `/login`
5. **Refresh page**: After login, refresh page → should stay logged in

---

## ❓ Common Questions

**Q: Can I create multiple accounts?**  
A: Yes! Each signup overwrites the previous user (simple implementation). In a real app, you'd use a backend database.

**Q: Where is the password checked?**  
A: This is a frontend-only app, so passwords aren't actually validated against a database. In production, you'd send credentials to a backend API for real authentication.

**Q: How do I add more protected routes?**  
A: Wrap them with `<ProtectedRoute>` just like `/tasks`, `/profile`, and `/` are wrapped.

**Q: Can I edit the validation rules?**  
A: Yes! Edit `validationSchema` in `Login.jsx` and `Signup.jsx` to add/change rules.

---

*Happy coding! 🚀*
