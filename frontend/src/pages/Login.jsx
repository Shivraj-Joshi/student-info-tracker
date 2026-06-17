import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/api.js";
import { useAuth } from "../context/authContext.jsx";

const Login = () => {
  const [role, setRole] = useState("STUDENT");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoints =
        role === "ADMIN"
          ? "/api/admin/login"
          : role === "TEACHER"
            ? "/api/teacher/login"
            : "/api/student/login";

      const data = await apiRequest(endpoints, "POST", { email, password });
      login({ ...data, role });

      if (role === "ADMIN") navigate("/admin");
      else if (role === "TEACHER") navigate("/teacher");
      else navigate("/student");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center  px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl  sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Student Info Tracker
        </h1>

        {/* Role selector */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          {["STUDENT", "TEACHER", "ADMIN"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 py-2 sm:py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                role === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm wrap-break-word ">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* Demo credentials */}
        <div className="mt-6">
          <p className="text-xs text-gray-400 text-center mb-3">
            Quick Demo Access
          </p>
          <div className="flex gap-2">
            {[
              {
                role: "STUDENT",
                email: "john@student.com",
                password: "student123",
                label: "Try as Student",
              },
              {
                role: "TEACHER",
                email: "john@school.com",
                password: "teacher123",
                label: "Try as Teacher",
              },
              {
                role: "ADMIN",
                email: "admin@school.com",
                password: "admin123",
                label: "Try as Admin",
              },
            ].map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => {
                  setRole(demo.role);
                  setEmail(demo.email);
                  setPassword(demo.password);
                }}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
