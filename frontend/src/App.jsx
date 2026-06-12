import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext.jsx";
import Login from "./pages/Login.jsx";
import StudentDashboard from "./pages/StudentDashboard.jsx";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/student" element={<StudentDashboard />} />
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
