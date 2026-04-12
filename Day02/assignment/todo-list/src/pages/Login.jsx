import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      
      // Simulate loading for smooth UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      login({ email: values.email, name: values.email.split("@")[0] });
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Login Card */}
      <div className={`relative bg-white w-full max-w-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden ${mounted ? 'animate-scale-in' : 'opacity-0 scale-95'}`}>
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
        
        <div className="p-8">
          {/* Logo/Icon Section */}
          <div className={`text-center mb-8 ${mounted ? 'animate-slide-up stagger-1' : 'opacity-0'}`}>
            <div className="relative inline-block">
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse" />
              
              {/* Icon Container */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <i className="fa-solid fa-clipboard-check text-3xl text-white"></i>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to continue your productivity journey
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className={mounted ? 'animate-slide-up stagger-2' : 'opacity-0'}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl text-sm font-medium placeholder:text-gray-400 transition-all duration-200 focus:bg-white focus:outline-none ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  }`}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-xs font-medium animate-slide-up">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{formik.errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className={mounted ? 'animate-slide-up stagger-3' : 'opacity-0'}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl text-sm font-medium placeholder:text-gray-400 transition-all duration-200 focus:bg-white focus:outline-none ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  }`}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="mt-2 flex items-center gap-2 text-red-600 text-xs font-medium animate-slide-up">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <span>{formik.errors.password}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${mounted ? 'animate-slide-up stagger-4' : 'opacity-0'}`}
            >
              <div className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                  </>
                )}
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          {/* Divider */}
          <div className={`flex items-center gap-4 my-6 ${mounted ? 'animate-fade-in stagger-5' : 'opacity-0'}`}>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign Up Link */}
          <div className={`text-center ${mounted ? 'animate-fade-in stagger-5' : 'opacity-0'}`}>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-bold text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="px-8 pb-8">
          <div className="relative h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 animate-shimmer" 
                 style={{ 
                   backgroundSize: '200% 100%',
                   animation: 'shimmer 3s linear infinite'
                 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}