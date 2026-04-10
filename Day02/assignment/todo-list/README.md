# ✅ Todo List App

> **React Assignment — Day 02**
> **Instructor:** Eng. Islam Baidaq
> **Program:** ITI — ICC | Full-Stack MEARN Track
> **Developer:** Mahmoud Awad Saad

---

## 📌 Description

A mobile-first Todo List with **Authentication** built with **React 19**, **React Router v7**, **Formik**, **Yup**, and **Tailwind CSS v4**.

This project was built as a practical assignment during the React module at ITI, focusing on:
- Component-based architecture
- State management with `useState` and `useEffect`
- Client-side routing with React Router
- Context API for authentication state
- Form validation with Formik + Yup
- Protected routes that require login
- Persistent storage via `localStorage`

---
## 📸 Screenshots

| Home Page | Tasks Management | Developer Profile |
|---|---|---|
| ![Home Page](./screenshots/26d38fab-cb01-46fc-b56f-272c19155b56.jfif) | ![Tasks Page](./screenshots/e3258464-952e-4846-bc70-3371997f76bc.jfif) | ![Profile Page](./screenshots/e4d5bd19-0e92-4f51-99cd-3042cdd3479e.jfif) |

---
## 🎨 Theme

Green · Clean · Minimal — intentionally kept simple and functional.

---

## 🔗 Pages

| Route | Page | Type | Description |
|---|---|---|---|
| `/login` | Login | Public | Sign in with email & password |
| `/signup` | Signup | Public | Create a new account |
| `/` | Home | Protected | Progress overview + quick stats |
| `/tasks` | Tasks | Protected | Add, filter, and manage tasks |
| `/tasks/:id` | Task Detail | Protected | View, complete, or delete a single task |
| `/profile` | Profile | Protected | Developer info + course credit |

---

## ✨ Features

### Authentication
- 🔐 User signup with full name, email, and password
- 📝 User login with email and password validation
- 🛡️ Protected routes — redirect to login if not authenticated
- 🚪 Logout functionality with instant redirect
- 💾 User data persists via `localStorage` (stays logged in after refresh)
- ✔️ Formik + Yup validation with real-time error messages

### Todo Management
- ➕ Add tasks via input or Enter key
- ✅ Toggle tasks complete / incomplete
- 🗑️ Delete tasks
- 🔍 Filter: All · Active · Completed
- 📊 Progress bar on Home page
- 🔗 Click any task to view its detail page
- 💾 Data persists via `localStorage`
- 📱 Mobile-first responsive layout

---

## 🛠️ Tech Stack

| Tech | Usage |
|---|---|
| `React 19` | UI components + hooks |
| `React Router v7` | Client-side routing |
| `Formik 2.4` | Form state management |
| `Yup 1.3` | Schema validation for forms |
| `Tailwind CSS v4` | Utility-first styling |
| `Font Awesome 7` | Icons |
| `Vite 8` | Build tool + dev server |
| `Context API` | Global authentication state |
| `localStorage` | Data persistence |

---

## 📁 Structure

```
src/
├── App.jsx                 ← Root — routing + auth provider
├── main.jsx                ← Entry point
├── index.css               ← Tailwind import
├── context/
│   ├── AuthContext.jsx     ← Authentication context provider
│   └── useAuth.js          ← Custom hook for accessing auth
├── components/
│   ├── Navbar.jsx          ← Bottom navigation bar (with logout)
│   ├── ProtectedRoute.jsx  ← Route guard for authenticated users
│   ├── AddTask.jsx         ← Input + add button
│   ├── FilterTask.jsx      ← All / Active / Done tabs
│   ├── TaskItem.jsx        ← Single task row
│   └── TaskList.jsx        ← Renders list of TaskItems
└── pages/
    ├── Login.jsx           ← Login form with Formik + Yup
    ├── Signup.jsx          ← Signup form with validation
    ├── Home.jsx            ← Dashboard + progress
    ├── Tasks.jsx           ← Main task page
    ├── TaskDetail.jsx      ← Single task view
    └── Profile.jsx         ← Developer profile
```

---

## 🚀 Run Locally

```bash
npm install
npm run dev
```

---

## 📐 React Concepts Applied

| Concept | Where |
|---|---|
| `useState` | Task list, filter state, input value, user auth |
| `useEffect` | Sync tasks to `localStorage` |
| Lazy initialiser | Load saved tasks & user on first render |
| `useContext` + `createContext` | Global authentication state |
| Custom hooks | `useAuth()` for easy auth access |
| Props drilling | Tasks + handlers passed from App → pages → components |
| Conditional rendering | Protected routes, navbar visibility |
| List rendering | `tasks.map()` with unique `key` |
| Controlled inputs | `value` + `onChange` on text input |
| `useParams` | Read task ID from URL in TaskDetail |
| `useNavigate` | Redirect after login/logout/actions |
| Formik | Form state & submission handling |
| Yup validation | Schema validation with error messages |
| ProtectedRoute | Route guard pattern with redirect |

---

## ✅ What Was Added (New Features)

### Authentication System Implementation
This project now includes a complete authentication system with the following components:

#### **Context API** (`src/context/`)
- `AuthContext.jsx` — Global auth state provider with login/logout functions
- `useAuth.js` — Custom hook to access auth anywhere in the app

#### **Auth Pages** (`src/pages/`)
- `Login.jsx` — Email & password login form with Formik + Yup validation
- `Signup.jsx` — Registration form with name, email, password confirmation

#### **Route Protection** (`src/components/`)
- `ProtectedRoute.jsx` — Component that redirects non-authenticated users to login

#### **Updated Components**
- `Navbar.jsx` — Added logout button and conditional rendering (navbar only shows when logged in)
- `App.jsx` — Wrapped routes with AuthProvider and ProtectedRoute

#### **Enhanced Package**
- Added `formik` for form state management
- Added `yup` for schema validation

### How It Works
1. User visits `/signup` or `/login` (public pages)
2. Fills form with validation (Formik + Yup handles it)
3. On submit, `login()` saves user to state + localStorage
4. Redirected to home → ProtectedRoute checks auth ✅
5. Can logout anytime from navbar button
6. All user data persists after page refresh via localStorage

**See `AUTH_IMPLEMENTATION.md` for detailed documentation!**

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
