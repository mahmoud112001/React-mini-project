# 📁 Complete File Structure & What Each File Does

## Project Overview

```
todo-list/
├── src/
│   ├── context/              ← NEW: Authentication context
│   ├── components/           ← Updated: Added ProtectedRoute
│   ├── pages/                ← Updated: Added Login & Signup
│   ├── App.jsx               ← Updated: Added auth routing
│   ├── main.jsx              ← Entry point (unchanged)
│   └── index.css             ← Styles (unchanged)
├── package.json              ← Updated: Added formik + yup
├── README.md                 ← Updated: Auth docs
├── AUTH_IMPLEMENTATION.md    ← NEW: Detailed auth guide
├── QUICK_START.md            ← NEW: Quick start guide
└── FILE_STRUCTURE.md         ← NEW: This file
```

---

## 🆕 NEW FILES (What to Focus On)

### `src/context/AuthContext.jsx` ⭐ CORE
```
Purpose: Global authentication state management
What it does:
  - Creates AuthContext with user, login, logout
  - Stores user in state + localStorage
  - Provides auth to entire app
  
Key code:
  - createContext() creates the context
  - useState for user state
  - login() saves user + calls localStorage.setItem()
  - logout() clears user + calls localStorage.removeItem()
```

### `src/context/useAuth.js` ⭐ CORE
```
Purpose: Custom hook to access auth easily
What it does:
  - Returns useContext(AuthContext)
  - Throws error if used outside AuthProvider
  
Usage: const { user, login, logout } = useAuth();
```

### `src/pages/Login.jsx` ⭐ NEW PAGE
```
Route: /login (PUBLIC - anyone can visit)
Components:
  - Form with email & password fields
  - Formik for form state
  - Yup for validation
  - Shows error messages
Key logic:
  - onSubmit: calls login() with user data
  - Redirects to home after login
```

### `src/pages/Signup.jsx` ⭐ NEW PAGE
```
Route: /signup (PUBLIC - anyone can visit)
Components:
  - Reusable Field component (reduces duplication)
  - Form with name, email, password, confirm password
  - Formik for form state
  - Yup for validation (includes confirmPassword match check)
Key logic:
  - onSubmit: calls login() with new user data
  - Redirects to home after signup
```

### `src/components/ProtectedRoute.jsx` ⭐ NEW COMPONENT
```
Purpose: Guard routes that require authentication
What it does:
  - Checks if user exists in auth context
  - If NO user → <Navigate to="/login" />
  - If user exists → shows the page

Usage: <ProtectedRoute><HomePage /></ProtectedRoute>
```

---

## 📝 UPDATED FILES (What Changed)

### `src/App.jsx`
**Changes:**
1. Added imports:
   ```jsx
   import { AuthProvider } from "./context/AuthContext";
   import ProtectedRoute from "./components/ProtectedRoute";
   import Login from "./pages/Login";
   import Signup from "./pages/Signup";
   ```

2. Wrapped entire app with AuthProvider:
   ```jsx
   <AuthProvider>
     <BrowserRouter>
       {/* all routes here */}
     </BrowserRouter>
   </AuthProvider>
   ```

3. Added public routes:
   ```jsx
   <Route path="/login" element={<Login />} />
   <Route path="/signup" element={<Signup />} />
   ```

4. Wrapped existing routes with ProtectedRoute:
   ```jsx
   <Route
     path="/tasks"
     element={
       <ProtectedRoute>
         <Tasks {...props} />
       </ProtectedRoute>
     }
   />
   ```

### `src/components/Navbar.jsx`
**Changes:**
1. Added imports:
   ```jsx
   import { useAuth } from "../context/useAuth";
   import { useNavigate } from "react-router-dom";
   ```

2. Added auth logic:
   ```jsx
   const { user, logout } = useAuth();
   const navigate = useNavigate();
   
   const handleLogout = () => {
     logout();
     navigate("/login");
   };
   ```

3. Hide navbar if not logged in:
   ```jsx
   if (!user) return null;
   ```

4. Added logout button:
   ```jsx
   <button onClick={handleLogout}>
     <i className="fa-solid fa-sign-out"></i>
     <span>Logout</span>
   </button>
   ```

### `package.json`
**Changes:**
```json
{
  "dependencies": {
    "formik": "^2.4.5",    ← NEW
    "yup": "^1.3.3"        ← NEW
  }
}
```

---

## ✅ UNCHANGED FILES (No Changes Needed)

These files still work exactly as before:
- `src/main.jsx` - Entry point
- `src/index.css` - Tailwind styles
- `src/pages/Home.jsx` - Home page
- `src/pages/Tasks.jsx` - Tasks page
- `src/pages/TaskDetail.jsx` - Task detail page
- `src/pages/Profile.jsx` - Profile page
- `src/components/AddTask.jsx` - Add task input
- `src/components/FilterTask.jsx` - Filter tabs
- `src/components/TaskItem.jsx` - Task item row
- `src/components/TaskList.jsx` - Task list

---

## 🔗 How Files Connect

```
main.jsx
   ↓
App.jsx (root)
   ↓
AuthProvider (wraps everything)
   ↓
BrowserRouter
   ├── Public Routes
   │   ├── /login → Login.jsx (uses Formik + Yup)
   │   └── /signup → Signup.jsx (uses Formik + Yup)
   │
   └── Protected Routes (wrapped with ProtectedRoute)
       ├── / → Home.jsx
       ├── /tasks → Tasks.jsx
       ├── /tasks/:id → TaskDetail.jsx
       └── /profile → Profile.jsx
   
All components can use useAuth() hook
Navbar uses useAuth() to show logout button
```

---

## 📊 Formik & Yup Integration

### Login.jsx Validation
```jsx
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

const formik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema,
  onSubmit: (values) => {
    login({ email: values.email, name: values.email.split("@")[0] });
    navigate("/");
  },
});
```

### Signup.jsx Validation
```jsx
const validationSchema = Yup.object({
  name: Yup.string().min(2).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")]).required(),
});
```

---

## 🔐 Authentication Flow Diagram

```
User visits /signup
         ↓
Sees Signup form
         ↓
Enters name, email, password
         ↓
Clicks "Create Account"
         ↓
Formik validates all fields
         ↓
Yup checks: name ≥2 chars, email valid, passwords match
         ↓
If valid → onSubmit runs
         ↓
login() called with { name, email }
         ↓
State updated + localStorage.setItem("user", JSON.stringify())
         ↓
navigate("/") redirects to home
         ↓
ProtectedRoute checks: Is user defined?
         ↓
YES → Show Home page
         ↓
User can now access all protected routes
         ↓
Clicks logout → logout() clears state + localStorage
         ↓
navigate("/login") redirects to login page
         ↓
ProtectedRoute checks: Is user defined?
         ↓
NO → Redirect to /login
```

---

## 💡 Key Concepts Explained

### Context API
Makes `user`, `login`, `logout` available everywhere without prop drilling:
```jsx
// In any component
const { user, login, logout } = useAuth();
```

### Protected Routes
Pattern to guard routes that require authentication:
```jsx
<Route
  path="/protected"
  element={
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  }
/>
```

### Formik
Handles form state, validation, and submission:
```jsx
const formik = useFormik({
  initialValues: {},
  validationSchema: Yup.object({}),
  onSubmit: (values) => {},
});
```

### Yup
Define validation rules as a schema:
```jsx
const schema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});
```

### localStorage
Persist data across page refreshes:
```jsx
// Save
localStorage.setItem("user", JSON.stringify(userData));

// Load
const user = JSON.parse(localStorage.getItem("user"));

// Clear
localStorage.removeItem("user");
```

---

## 🎯 What To Do Next

1. **Run the app**: `npm install && npm run dev`
2. **Test signup**: Go to `/signup` and create account
3. **Check localStorage**: DevTools → Application → localStorage
4. **Test logout**: Click logout in navbar
5. **Try accessing protected route without login**: Go to `/tasks` → should redirect to `/login`
6. **Read the code**: Start with AuthContext.jsx, then Login/Signup, then App.jsx

---

## 📖 Documentation Files

- **README.md** - Project overview + features + tech stack
- **AUTH_IMPLEMENTATION.md** - Detailed auth system explanation
- **QUICK_START.md** - Getting started guide + troubleshooting
- **FILE_STRUCTURE.md** - This file, explaining every file

---

*Happy coding! 🚀*
