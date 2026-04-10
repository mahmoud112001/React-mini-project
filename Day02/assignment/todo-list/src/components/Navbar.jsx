import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout function from auth context
  const navigate = useNavigate();

  // Handle logout - clear user and redirect to login
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 text-xs ${
      isActive ? "text-green-700 font-bold" : "text-gray-500"
    }`;

  // Only show navbar if user is logged in
  if (!user) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-green-600 px-6 py-2 flex justify-around items-center">
      <NavLink to="/" end className={linkClass}>
        <i className="fa-solid fa-house text-lg"></i>
        <span>Home</span>
      </NavLink>
      <NavLink to="/tasks" className={linkClass}>
        <i className="fa-solid fa-list-check text-lg"></i>
        <span>Tasks</span>
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        <i className="fa-solid fa-user text-lg"></i>
        <span>Profile</span>
      </NavLink>
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
      >
        <i className="fa-solid fa-sign-out text-lg"></i>
        <span>Logout</span>
      </button>
    </nav>
  );
}
