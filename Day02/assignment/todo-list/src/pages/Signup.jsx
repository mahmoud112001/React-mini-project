import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Reusable Field component for consistent form inputs
// This reduces code duplication between different fields
const Field = ({ formik, name, label, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 bg-gray-50 transition
        ${
          formik.touched[name] && formik.errors[name]
            ? "border-red-400 focus:ring-red-200"
            : "border-gray-200 focus:ring-green-300"
        }`}
    />
    {formik.touched[name] && formik.errors[name] && (
      <p className="text-red-500 text-xs mt-1">
        <i className="fa-solid fa-circle-exclamation mr-1"></i>
        {formik.errors[name]}
      </p>
    )}
  </div>
);

// Validation rules for signup form using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function Signup() {
  const { login } = useAuth(); // Get login function from auth context
  const navigate = useNavigate(); // For redirecting after signup

  // Initialize Formik with validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Call login with new user data
      login({ email: values.email, name: values.name });
      // Redirect to home page after successful signup
      navigate("/");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fa-solid fa-user-plus text-2xl text-green-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Create account</h1>
          <p className="text-gray-400 text-sm mt-1">Start managing your tasks</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name Field */}
          <Field
            formik={formik}
            name="name"
            label="Full Name"
            placeholder="Mohamed Saleh"
          />

          {/* Email Field */}
          <Field
            formik={formik}
            name="email"
            label="Email"
            placeholder="you@example.com"
            type="email"
          />

          {/* Password Field */}
          <Field
            formik={formik}
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
          />

          {/* Confirm Password Field */}
          <Field
            formik={formik}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
