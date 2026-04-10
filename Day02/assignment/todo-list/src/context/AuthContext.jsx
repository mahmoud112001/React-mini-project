import { createContext, useState } from "react";

// Create the Auth Context - This is where we store authentication state
export const AuthContext = createContext();

// AuthProvider component that wraps your app and provides auth functionality
export function AuthProvider({ children }) {
  // State to store the logged-in user
  // Initially null, gets set when user logs in
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function - called when user submits login form
  const login = (userData) => {
    // Store user data in state
    setUser(userData);
    // Also save to localStorage so user stays logged in after page refresh
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function - clears user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Provide user and auth functions to all child components
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
