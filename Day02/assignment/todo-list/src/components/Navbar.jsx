import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  if (!user) return null;

  const navItems = [
    { to: "/", icon: "fa-house", label: "Home", end: true },
    { to: "/tasks", icon: "fa-list-check", label: "Tasks" },
    { to: "/profile", icon: "fa-user", label: "Profile" },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 ${mounted ? 'animate-slide-up' : 'opacity-0 translate-y-full'}`}>
        {/* Glass Morphism Background */}
        <div className="relative">
          {/* Gradient Border Top */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
          
          {/* Main Nav Container */}
          <div className="glass backdrop-blur-xl bg-white/80 border-t border-gray-200/50 shadow-2xl">
            <div className="max-w-md mx-auto px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Navigation Items */}
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) => `
                      group relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300
                      ${isActive 
                        ? 'text-green-600' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {({ isActive }) => (
                      <>
                        {/* Icon with background */}
                        <div className={`relative transition-all duration-300 ${
                          isActive ? 'scale-110' : 'group-hover:scale-105'
                        }`}>
                          {/* Active Background Glow */}
                          {isActive && (
                            <div className="absolute inset-0 bg-green-500 rounded-lg blur-lg opacity-30 animate-pulse" />
                          )}
                          
                          {/* Icon Container */}
                          <div className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg' 
                              : 'bg-transparent group-hover:bg-gray-100'
                          }`}>
                            <i className={`fa-solid ${item.icon} text-lg`}></i>
                          </div>
                        </div>
                        
                        {/* Label */}
                        <span className={`text-xs font-semibold transition-all duration-300 ${
                          isActive ? 'font-bold' : 'font-medium'
                        }`}>
                          {item.label}
                        </span>
                        
                        {/* Active Indicator Dot */}
                        {isActive && (
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full animate-scale-in" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}

                {/* Logout Button */}
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="group relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:bg-red-100 group-hover:scale-105">
                    <i className="fa-solid fa-right-from-bracket text-lg"></i>
                  </div>
                  <span className="text-xs font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          
          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <i className="fa-solid fa-right-from-bracket text-2xl text-red-600"></i>
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Sign out?
            </h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to sign out of your account?
            </p>
            
            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}