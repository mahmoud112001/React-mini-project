# 🚀 Quick Start Guide — Authentication

## Installation & Setup

```bash
# Install dependencies (includes formik + yup)
npm install

# Start dev server
npm run dev

# Open browser and go to http://localhost:5173
```

---

## 🔐 Authentication Workflow

### First Time User? Sign Up!
1. Go to **`http://localhost:5173/signup`**
2. Enter:
   - Full Name: `Mohamed Awad`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
3. Click **Create Account**
4. ✅ Redirected to home page (you're logged in!)

### Returning User? Log In!
1. Go to **`http://localhost:5173/login`**
2. Enter email & password from above
3. Click **Login**
4. ✅ You're in!

### Want to Log Out?
- Click the **Logout** button in the bottom navbar
- ✅ You'll be redirected to login page

---

## 📁 File Locations & What Goes Where

### Authentication Files
| File | Location | Purpose |
|---|---|---|
| AuthContext | `src/context/AuthContext.jsx` | Provides auth state to entire app |
| useAuth hook | `src/context/useAuth.js` | Custom hook to access auth |
| Login Form | `src/pages/Login.jsx` | Login page with validation |
| Signup Form | `src/pages/Signup.jsx` | Registration page |
| ProtectedRoute | `src/components/ProtectedRoute.jsx` | Guards routes (checks if logged in) |
| Navbar | `src/components/Navbar.jsx` | Updated with logout button |
| App | `src/App.jsx` | Updated with auth routing |

### Where to Put New Code
- **New authenticated pages** → `src/pages/` and wrap with `<ProtectedRoute>` in `App.jsx`
- **Components that need auth** → Import `useAuth` from `src/context/useAuth.js`
- **Public pages (no login needed)** → Just add route in `App.jsx` without ProtectedRoute

---

## 🔄 How Authentication Works (Simple Explanation)

```
1. User fills signup/login form
   ↓
2. Formik validates the form (email format, password length, etc.)
   ↓
3. If valid → onSubmit runs login() function
   ↓
4. login() saves user info to state + localStorage
   ↓
5. App redirects to home page
   ↓
6. ProtectedRoute checks if user exists → shows page
   ↓
7. User can click logout → clears data + redirects to login
   ↓
8. Page refresh? localStorage has user data → stays logged in!
```

---

## ✨ Key Libraries Used

### Formik
Manages form state automatically. Instead of `useState` for each field:

```jsx
// ❌ Without Formik (repetitive)
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailError, setEmailError] = useState("");

// ✅ With Formik (clean)
const formik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema,
  onSubmit: (values) => { /* ... */ }
});
```

### Yup
Schema validation library. Define validation rules once:

```jsx
const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});
```

### Context API
Global state without Redux:

```jsx
// In AuthContext
export const AuthContext = createContext();

// In any component
const { user, login, logout } = useAuth();
```

---

## 🧪 Try These to Understand the System

### Test 1: Login Validation
1. Go to `/login`
2. Leave email empty, click submit
3. See error: "Email is required"
4. Try invalid email like "notanemail"
5. See error: "Invalid email address"

### Test 2: Protected Routes
1. Without logging in, try going to:
   - `http://localhost:5173/tasks`
   - `http://localhost:5173/profile`
2. Both should redirect you to `/login`

### Test 3: Persistence
1. Login with any credentials
2. Press **F5** to refresh the page
3. You should still be logged in!
4. Check DevTools → Application → localStorage to see saved user data

### Test 4: Logout
1. Login
2. Click Logout button
3. Try accessing `/tasks` → redirects to login
4. Check localStorage → user data is gone

---

## 🎓 Learning Points

What this project teaches:
- ✅ Form handling with Formik
- ✅ Validation with Yup
- ✅ Context API for global state
- ✅ Route protection pattern
- ✅ Custom hooks (`useAuth`)
- ✅ localStorage for persistence
- ✅ Conditional rendering based on auth state

---

## 🐛 Troubleshooting

**Q: "Can't find module 'formik'"**  
A: Run `npm install` to install dependencies

**Q: Login doesn't work**  
A: Try any email/password. There's no real validation against a database—frontend validation only

**Q: Got stuck in redirect loop?**  
A: Clear localStorage (DevTools → Application → localStorage → clear all) and refresh

**Q: Navbar disappeared?**  
A: You're not logged in. The navbar only shows for authenticated users. Go to `/login`

---

## 📚 Files to Review in Order

1. **Start here**: `AUTH_IMPLEMENTATION.md` (detailed explanation)
2. **Read**: `src/context/AuthContext.jsx` (how auth state works)
3. **Read**: `src/pages/Login.jsx` (form with validation)
4. **Read**: `src/pages/Signup.jsx` (form with Field component)
5. **Read**: `src/components/ProtectedRoute.jsx` (how route guarding works)
6. **Read**: `src/App.jsx` (how it all comes together)

---

## 🚀 Next Steps

Want to expand the auth system?

- [ ] Add "Remember Me" checkbox
- [ ] Add password strength indicator
- [ ] Add forgot password link
- [ ] Connect to a real backend API
- [ ] Add role-based access (admin, user, etc.)
- [ ] Add email verification

---

*Happy learning! 🎉*
