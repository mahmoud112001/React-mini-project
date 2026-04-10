# 🎨 Visual Guide — Authentication System

## 📊 Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.jsx                              │
│  - Sets up routing                                            │
│  - Wraps with AuthProvider                                    │
└────────────────┬────────────────────────────────────────────┘
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
  ┌──────────────┐   ┌──────────────────────────┐
  │ AuthProvider │   │    BrowserRouter         │
  │ (Context)    │   └──────────────────────────┘
  │              │            │
  │ • user       │      ┌─────┴─────────────────┬───────────────┐
  │ • login()    │      │                       │               │
  │ • logout()   │      ▼                       ▼               ▼
  │              │   ┌─────────┐          ┌────────────┐   ┌──────────────┐
  │ + localStorage   │ Login   │          │  Signup    │   │Protected Routes│
  └──────────────┘   │ (PUBLIC)│          │ (PUBLIC)   │   │  (All pages)  │
                     │         │          │            │   │               │
                     │ /login  │          │  /signup   │   │ • Home       │
                     └─────────┘          └────────────┘   │ • Tasks      │
                                                           │ • Profile    │
                                                           │ • TaskDetail │
                                                           │              │
                                                           │ Protected by│
                                                           │<ProtectedRoute>
                                                           └──────────────┘
```

---

## 🔄 Authentication State Flow

```
                      Initial State
                      user = null
                           │
         ┌─────────────────┴─────────────────┐
         ▼                                   ▼
    ┌─────────────┐               ┌──────────────────┐
    │ Public Page │               │ Protected Page   │
    │             │               │                  │
    │ /login      │ ──login()──► │ /tasks           │
    │ /signup     │              │ /profile         │
    │             │ (setState)   │ /                │
    └─────────────┘              │                  │
         ▲                        │ user = {email... │
         │                        │ name: "..."}     │
         │                        │                  │
         │           logout()     │ localStorage:    │
         └────────────────────────┤ (persist user)   │
                                  └──────────────────┘
                                         │
                                    Page Refresh?
                                         │
                                    ┌────┴────┐
                                    │          │
                                 localStorage has user
                                    │
                             ┌──────▼──────┐
                             │ Load user   │
                             │ Stay logged │
                             └─────────────┘
```

---

## 📋 Form Validation Flow

### Login Form
```
User Input                Formik State              Validation
─────────                ──────────────            ────────────

Email field              formik.values.email       ✓ Is string
  ↓                            ↓                   ✓ Is valid email
Password field           formik.values.password    ✓ Min 6 chars
  ↓                            ↓
Submit button            formik.handleSubmit       All valid?
                                ↓
                          ✅ YES → login() → home
                          ❌ NO  → show errors
```

### Signup Form
```
Name field               formik.values.name        ✓ Min 2 chars
  ↓                                                ✓ Required
Email field              formik.values.email       ✓ Valid email
  ↓                                                ✓ Required
Password field           formik.values.password    ✓ Min 6 chars
  ↓                                                ✓ Required
Confirm field            formik.values.             ✓ Matches
  ↓                      confirmPassword           password field
Submit                   Yup validates all         ✓ Required
                              ↓
                          All valid?
                              ↓
                          ✅ YES → login() → home
                          ❌ NO  → show errors
```

---

## 🛡️ Route Protection Pattern

```
User tries to access /tasks
                    │
                    ▼
         ┌──────────────────────┐
         │ ProtectedRoute       │
         │                      │
         │ if (!user)           │
         └──────────┬───────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         NO user found      User found
         │                     │
         ▼                     ▼
    <Navigate                 Render
     to="/login" />          <Tasks />
```

---

## 💾 localStorage Data Structure

```
Browser localStorage:

┌─────────────────────────────────────┐
│ localStorage                        │
├─────────────────────────────────────┤
│ Key: "user"                         │
│ Value:                              │
│ {                                   │
│   "email": "ali@example.com",       │
│   "name": "Ali"                     │
│ }                                   │
│                                     │
│ Key: "tasks"                        │
│ Value:                              │
│ [                                   │
│   { "id": 123, "text": "Learn...", "completed": false },
│   { "id": 456, "text": "Read...",  "completed": true  }
│ ]                                   │
└─────────────────────────────────────┘
```

---

## 🔐 Complete User Journey

```
START: User visits app for first time
  │
  ├─ No localStorage.user
  ├─ App loads
  ├─ AuthProvider initializes user = null
  │
  ▼
User tries to access /tasks
  │
  ├─ ProtectedRoute checks: user ? 
  ├─ NO → <Navigate to="/login" />
  │
  ▼
Page shows /login URL
  │
  ├─ User sees Login form
  ├─ Clicks "Sign up" link
  │
  ▼
User on /signup page
  │
  ├─ Fills form: name, email, password
  ├─ Click "Create Account"
  ├─ Formik validates
  ├─ Yup checks all rules
  ├─ All pass ✓
  │
  ▼
Form submitted
  │
  ├─ formik.onSubmit runs
  ├─ login({ name, email }) called
  ├─ setUser() updates state
  ├─ localStorage.setItem("user", ...) saves data
  │
  ▼
navigate("/") runs
  │
  ├─ User redirected to home
  ├─ ProtectedRoute checks: user ?
  ├─ YES ✓ → Show Home page
  │
  ▼
Home page renders
  │
  ├─ Navbar visible
  ├─ Shows logout button
  ├─ User can navigate: Tasks, Profile, etc.
  │
  ▼
User clicks Tasks
  │
  ├─ ProtectedRoute checks: user ?
  ├─ YES ✓ → Show Tasks page
  │
  ▼
User adds/completes/deletes tasks
  │
  ├─ Tasks saved to localStorage
  ├─ User data still in state
  │
  ▼
User clicks Logout button
  │
  ├─ handleLogout() runs
  ├─ logout() called
  ├─ setUser(null) clears state
  ├─ localStorage.removeItem("user")
  │
  ▼
navigate("/login") redirects
  │
  ├─ User sees login page
  ├─ State: user = null
  │
  ▼
User refreshes page
  │
  ├─ App reloads
  ├─ AuthProvider initializes
  ├─ localStorage.getItem("user")
  ├─ user = null (was cleared)
  ├─ Still on /login page
  │
  ▼
User clicks "Sign up" or enters credentials to login
  │
  └─ Cycle repeats...
```

---

## 🎯 File Interaction Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    main.jsx                              │
│           (Entry point - creates React app)              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │       App.jsx              │
        │  (Root component)          │
        └────────┬──────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
   ┌──────────────┐   ┌─────────────────────┐
   │AuthProvider  │   │   BrowserRouter     │
   │  context/    │   │                     │
   │AuthContext   │   │  Routes:            │
   └──────────────┘   │  - /login → Login   │
        │             │  - /signup → Signup │
   Provides:          │  - /* → Protected   │
   - user             └────────┬────────────┘
   - login()                   │
   - logout()          ┌───────┴───────────┐
        │              │                   │
        │          Public Routes      Protected Routes
        │              │                   │
        │         ┌────┴─────┐        ┌────┴────┐
        │         ▼          ▼        ▼         ▼
        │       Login     Signup    Home     Tasks
        │        page      page     page      page
        │         │         │        │        │
        └────────►│◄────────┘        │        │
                  │                  │        │
         ┌────────┴──────────────────┴────────┘
         ▼
      useAuth() hook
    src/context/useAuth.js
    
    Used by:
    - Login.jsx
    - Signup.jsx
    - Navbar.jsx
    - ProtectedRoute.jsx
```

---

## 📱 Page States & Navbar

```
┌──────────────────┐      ┌──────────────────┐
│  Not Logged In   │      │   Logged In       │
├──────────────────┤      ├──────────────────┤
│ /login           │      │ /                │
│ /signup          │      │ /tasks           │
│ (Can access)     │      │ /tasks/:id       │
│                  │      │ /profile         │
│ Other routes?    │      │ (Can access)     │
│ ❌ Redirect      │      │                  │
│                  │      │ Navbar visible:  │
│ Navbar:          │      │ ✓ Home icon      │
│ ❌ Hidden        │      │ ✓ Tasks icon     │
│                  │      │ ✓ Profile icon   │
│                  │      │ ✓ Logout button  │
└──────────────────┘      │   (red)          │
                          └──────────────────┘
```

---

## 🔀 Formik & Yup Integration

### How Formik Works
```
1. Initialize formik with:
   - initialValues: { email: "", password: "" }
   - validationSchema: Yup schema
   - onSubmit: handler function

2. On each keystroke:
   - formik.handleChange(e) updates state
   - Yup validates against schema
   - Errors stored in formik.errors

3. On field blur:
   - formik.handleBlur(e) marks as touched
   - Errors show only for touched fields

4. On submit:
   - Validate all fields
   - If errors exist: show them, don't submit
   - If no errors: run onSubmit function
```

### How Yup Works
```
Yup.object({
  email: Yup.string()
    .email("Invalid email")    ← check format
    .required("Required"),      ← check not empty
  
  password: Yup.string()
    .min(6, "Min 6 chars")      ← check length
    .required("Required"),       ← check not empty
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Must match")  ← check match
    .required("Required")
})

Validation runs:
1. Check type (string)
2. Check all rules in order
3. Return first error found
4. If no errors, validation passes
```

---

## 🎬 Animation Flow (UX)

```
User Types in Email
  │
  ├─ Field has red border (unvalidated)
  │
  ▼
User Leaves Field (blur)
  │
  ├─ Field marked as "touched"
  ├─ Validation runs
  ├─ formik.errors.email set
  │
  ▼
Error Message Shows
  │
  ├─ Red text appears below field
  ├─ Icon (⚠️) appears
  │
  ▼
User Types Valid Email
  │
  ├─ Validation runs again
  ├─ formik.errors.email = undefined
  │
  ▼
Error Message Hides
  │
  ├─ Field border turns green/normal
  ├─ Error text disappears
  │
  ▼
All Fields Valid?
  │
  ├─ Submit button enabled ✓
  │
  ▼
User Clicks Submit
  │
  ├─ formik.onSubmit runs
  ├─ login() called
  ├─ Redirect
```

---

## 📊 Context Provider Hierarchy

```
                    App.jsx
                       │
                   <AuthProvider>
                       │
            ┌──────────┴──────────┐
            ▼                     ▼
        BrowserRouter        AuthContext.Provider
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
          <Routes>          value={{user, login, logout}}
              │                   │
        ┌─────┴──────┐            │
        ▼            ▼            │
    <Route      <Route       Available to ALL
     path=...    path=...    children components
              │
    All components inside can use:
    const { user, login, logout } = useAuth();
```

---

## ✨ Key Takeaways (Visual Summary)

```
┌─────────────────────────────────────────────────────────┐
│  AUTHENTICATION SYSTEM ARCHITECTURE                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  🔐 SECURITY LAYER (ProtectedRoute)                     │
│  ├─ Checks if user exists                              │
│  ├─ Redirects to /login if not                         │
│  └─ Protects: /, /tasks, /profile, /tasks/:id          │
│                                                          │
│  👤 STATE LAYER (AuthContext)                           │
│  ├─ Stores user data                                    │
│  ├─ Provides login() & logout()                         │
│  └─ Persists with localStorage                          │
│                                                          │
│  📝 FORM LAYER (Formik + Yup)                           │
│  ├─ Manages form state                                  │
│  ├─ Validates inputs                                    │
│  └─ Shows error messages                                │
│                                                          │
│  🔗 HOOK LAYER (useAuth)                                │
│  ├─ Easy auth access anywhere                           │
│  ├─ Reduces prop drilling                               │
│  └─ Typed safely with error handling                    │
│                                                          │
│  🎯 RESULT:                                             │
│  ✓ Secure routes                                        │
│  ✓ Form validation                                      │
│  ✓ User persistence                                     │
│  ✓ Clean code                                           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

*Visual Guide Complete! 🎨*
