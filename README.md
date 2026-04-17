# ✅ Todo List App — with Authentication

> **React Assignment — Day 02**
> **Instructor:** Eng. Islam Baidaq
> **Program:** ITI — ICC | Full-Stack MEARN Track
> **Developer:** Mahmoud Awad Saad · [@mahmoud112001](https://github.com/mahmoud112001)

---

## 📌 Description


A mobile-first **Todo List** with a complete **Authentication System** built with **React 19**, **React Router v7**, **Formik**, **Yup**, and **Tailwind CSS v4**.

Built as a practical assignment during the React module at ITI, focusing on:
- Component-based architecture
- Global auth state with **Context API**
- Form handling and validation with **Formik + Yup**
- Protected routes and route guards
- Client-side routing with React Router
- Data persistence via `localStorage`

---

## 📸 Screenshots

| Home Page | Tasks Management | Developer Profile |
|---|---|---|
| ![Home Page](./screenshots/26d38fab-cb01-46fc-b56f-272c19155b56.jfif) | ![Tasks Page](./screenshots/e3258464-952e-4846-bc70-3371997f76bc.jfif) | ![Profile Page](./screenshots/e4d5bd19-0e92-4f51-99cd-3042cdd3479e.jfif) |

---

## 🎨 Theme

Green · Clean · Minimal — intentionally kept simple and functional.

---

## 🔗 Pages & Routes

| Route | Page | Access | Description |
|---|---|---|---|
| `/login` | Login | Public | Sign in with email & password |
| `/signup` | Signup | Public | Create a new account |
| `/` | Home | Protected | Progress overview + quick stats |
| `/tasks` | Tasks | Protected | Add, filter, and manage tasks |
| `/tasks/:id` | Task Detail | Protected | View, complete, or delete a single task |
| `/profile` | Profile | Protected | Developer info + ITI credit |

**Public** = anyone can visit · **Protected** = must be logged in

---

## ✨ Features

### 🔐 Authentication
- User signup with full name, email, and password
- User login with email + password validation
- Protected routes — redirect to `/login` if not authenticated
- Logout with instant redirect and state cleanup
- User data persists via `localStorage` (stays logged in after page refresh)
- Formik + Yup validation with real-time error messages per field

### 📝 Todo Management
- Add tasks via input or Enter key
- Toggle tasks complete / incomplete
- Delete tasks
- Filter: All · Active · Completed
- Progress bar on Home page
- Click any task to view its detail page
- Task data persists via `localStorage`
- Mobile-first responsive layout

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` — you'll be redirected to `/login` automatically.

---

## 🛠️ Tech Stack

| Tech | Version | Usage |
|---|---|---|
| `React` | 19 | UI components + hooks |
| `React Router DOM` | 7 | Client-side routing |
| `Formik` | 2.4 | Form state management |
| `Yup` | 1.3 | Schema-based validation |
| `Tailwind CSS` | 4 | Utility-first styling |
| `Font Awesome` | 7 | Icons |
| `Vite` | 8 | Build tool + dev server |
| `Context API` | built-in | Global authentication state |
| `localStorage` | browser | User + tasks persistence |

---

## 📁 Project Structure

```
src/
├── App.jsx                  ← Root — routing + AuthProvider wrapper
├── main.jsx                 ← Entry point
├── index.css                ← Tailwind import
│
├── context/
│   ├── AuthContext.jsx      ← Creates context, provides user/login/logout
│   └── useAuth.js           ← Custom hook: const { user, login, logout } = useAuth()
│
├── components/
│   ├── Navbar.jsx           ← Bottom nav with logout (hidden when not logged in)
│   ├── ProtectedRoute.jsx   ← Route guard: redirects to /login if no user
│   ├── AddTask.jsx          ← Input + Add button
│   ├── FilterTask.jsx       ← All / Active / Done filter tabs
│   ├── TaskItem.jsx         ← Single task row (checkbox, link, delete)
│   └── TaskList.jsx         ← Renders TaskItem list or empty state
│
└── pages/
    ├── Login.jsx            ← Login form · Formik + Yup · route: /login
    ├── Signup.jsx           ← Signup form · Formik + Yup · route: /signup
    ├── Home.jsx             ← Dashboard + progress bar
    ├── Tasks.jsx            ← Main task management page
    ├── TaskDetail.jsx       ← Single task view with actions
    └── Profile.jsx          ← Developer info + instructor credit
```

---

## 🔐 Authentication System

### Data Flow

```
User visits /signup or /login (public — no auth needed)
           ↓
Fills form → Formik manages input state
           ↓
Yup validates: email format, min length, password match
           ↓
All valid → onSubmit fires → login(userData) called
           ↓
user saved to React state + localStorage
           ↓
navigate("/") runs
           ↓
ProtectedRoute checks: user exists?
           ↓
YES → show the page    |    NO → <Navigate to="/login" />
```

### AuthContext.jsx — Global Auth State

```jsx
// src/context/AuthContext.jsx

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Load user from localStorage on first render (survive page refresh)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save user to state + localStorage on login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Clear user from state + localStorage on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### useAuth.js — Custom Hook

```jsx
// src/context/useAuth.js
// Usage anywhere: const { user, login, logout } = useAuth();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
```

### ProtectedRoute.jsx — Route Guard

```jsx
// src/components/ProtectedRoute.jsx

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Not logged in → redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // Logged in → render the protected page
  return children;
}
```

### How to Protect a Route (App.jsx)

```jsx
// Public — anyone can access
<Route path="/login"  element={<Login />} />
<Route path="/signup" element={<Signup />} />

// Protected — redirects to /login if not authenticated
<Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Tasks tasks={tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
    </ProtectedRoute>
  }
/>
```

---

## 📋 Form Validation — Formik + Yup

### Login Validation Rules
- Email: valid format + required
- Password: min 6 characters + required

### Signup Validation Rules
- Name: min 2 characters + required
- Email: valid format + required
- Password: min 6 characters + required
- Confirm Password: must match `password` field + required

### How Formik + Yup work together

```jsx
// 1. Define rules with Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 chars").required("Password is required"),
});

// 2. Connect to Formik
const formik = useFormik({
  initialValues: { email: "", password: "" },
  validationSchema,                          // Yup runs here
  onSubmit: (values) => {
    login({ email: values.email, name: values.email.split("@")[0] });
    navigate("/");
  },
});

// 3. Show error messages in JSX (only when field is touched)
{formik.touched.email && formik.errors.email && (
  <p className="text-red-500 text-xs mt-1">
    <i className="fa-solid fa-circle-exclamation mr-1"></i>
    {formik.errors.email}
  </p>
)}
```

---

## 🧪 Test the System

### Test 1 — Sign Up
1. Go to `http://localhost:5173/signup`
2. Fill: Name, Email, Password, Confirm Password
3. Click "Create Account" → Home page ✅

### Test 2 — Protected Routes
Without logging in, go to `/tasks` or `/profile` → should redirect to `/login` ✅

### Test 3 — Persistence
Login → press F5 → still logged in ✅
Check: DevTools → Application → localStorage → `user` key ✅

### Test 4 — Validation
Go to `/login` → leave email empty → click submit → "Email is required" ✅
Type `notanemail` → "Invalid email address" ✅

### Test 5 — Logout
Login → click Logout button in navbar → redirected to `/login`
Try `/tasks` → redirected again ✅
localStorage `user` key is gone ✅

---

## 📐 React Concepts Applied

| Concept | Where Used |
|---|---|
| `useState` | Task list, filter state, input value, user auth |
| `useEffect` | Sync tasks to `localStorage` |
| Lazy initialiser | Load saved tasks & user on first render |
| `createContext` | Creates the AuthContext object |
| `useContext` | Access auth state inside components |
| Custom hook | `useAuth()` for clean, reusable auth access |
| Props | Tasks + handlers passed App → pages → components |
| Conditional rendering | ProtectedRoute, navbar visibility, task status |
| List rendering | `tasks.map()` with unique `key` |
| Controlled inputs | `value` + `onChange` on all inputs |
| `useParams` | Read task ID from URL in TaskDetail |
| `useNavigate` | Redirect after login / logout / task actions |
| `useFormik` | Form state + validation + submission handler |
| Yup schema | Validation rules defined outside the component |
| ProtectedRoute pattern | Wrapper component for guarding routes |

---

## 💾 localStorage Data Structure

```json
{
  "user": {
    "email": "you@example.com",
    "name": "Mahmoud"
  },
  "tasks": [
    { "id": 1716000000000, "text": "Learn React", "completed": false },
    { "id": 1716000001000, "text": "Build project", "completed": true }
  ]
}
```

---

## ❓ FAQ

**Q: Where is the password actually verified?**
This is frontend-only — no backend. Any email/password works. In production, you'd send credentials to a real API.

**Q: How do I add more protected routes?**
Wrap them with `<ProtectedRoute>` in `App.jsx`.

**Q: How do I add a field to signup?**
Add it to `validationSchema`, `initialValues`, and the JSX form fields in `Signup.jsx`.

**Q: Stuck in redirect loop?**
DevTools → Application → localStorage → Clear All → refresh.

**Q: User not persisting after refresh?**
Check `AuthContext.jsx` lazy initialiser reads from `localStorage.getItem("user")`.

---

## 🙏 Credits

| | |
|---|---|
| **Instructor** | Eng. Islam Baidaq |
| **Course** | React — ITI ICC Program |
| **Developer** | Mahmoud Awad Saad |
| **GitHub** | [@mahmoud112001](https://github.com/mahmoud112001) |

---

*Todo List · React Assignment · Day 02 · ITI ICC Program · 2026*
