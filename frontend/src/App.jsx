import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";
import TeacherDashboard from "./pages/TeacherDashboard.jsx";
import AdminDasboard from "./pages/AdminDasboard.jsx";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRole="TEACHER">
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <AdminDasboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          user ? (
            <Navigate
              to={
                user.role === "ADMIN"
                  ? "/admin"
                  : user.role === "TEACHER"
                    ? "/teacher"
                    : "/student"
              }
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
