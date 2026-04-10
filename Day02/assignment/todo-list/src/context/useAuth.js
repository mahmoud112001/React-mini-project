import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Custom hook to access auth context easily
// This simplifies accessing user and auth functions in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // Safety check - make sure we're using this hook inside AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
