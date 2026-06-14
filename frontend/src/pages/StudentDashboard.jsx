import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { apiRequest } from "../api/api.jsx";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrollmentData, attendanceData, gradeData] = await Promise.all([
          apiRequest("/api/enrollment/student", "GET", null, user.token),
          apiRequest("/api/attendance/student", "GET", null, user.token),
          apiRequest("/api/grade/student", "GET", null, user.token),
        ]);
        setEnrollments(enrollmentData);
        setAttendance(attendanceData);
        setGrades(gradeData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const presentCount = attendance.filter((a) => a.status === "PRESENT").length;
  const absentCount = attendance.filter((a) => a.status === "ABSENT").length;
  const attendanceRate = attendance.length
    ? Math.round((presentCount / attendance.length) * 100)
    : 0;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 fixed h-full">
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            E-Learning
          </p>
          <h2 className="text-base font-semibold text-gray-800">{user.name}</h2>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
          General
        </p>
        <nav className="flex flex-col gap-1 mb-6">
          {[
            { key: "dashboard", label: "Dashboard" },
            { key: "grades", label: "Grades" },
            { key: "attendance", label: "Attendance" },
            { key: "subjects", label: "Subjects" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                activeTab === item.key
                  ? "bg-violet-50 text-violet-700 font-medium"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500  hover:text-white transition-colors cursor-pointer hover:bg-red-500"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">
        {/* Dashboard tab */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-1">
              Dashboard
            </h1>
            <p className="text-sm text-gray-400 mb-6">
              Welcome back, {user.name}
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Enrolled Subjects",
                  value: enrollments.length,
                  color: "text-violet-600",
                },
                {
                  label: "Total Grades",
                  value: grades.length,
                  color: "text-blue-600",
                },
                {
                  label: "Present Days",
                  value: presentCount,
                  color: "text-green-600",
                },
                {
                  label: "Attendance Rate",
                  value: `${attendanceRate}%`,
                  color: "text-amber-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                >
                  <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-semibold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent grades */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Recent Grades
              </h2>
              {grades.length === 0 ? (
                <p className="text-gray-400 text-sm">No grades recorded yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/3">Subject</th>
                      <th className="pb-3 font-medium w-1/3">Score</th>
                      <th className="pb-3 font-medium w-1/3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g) => (
                      <tr
                        key={g.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/3">
                          {g.subject.name}
                        </td>
                        <td className="py-3 w-1/3">
                          <span className="bg-violet-50 text-violet-700 px-2 py-1 rounded-full text-xs font-medium">
                            {g.score}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 w-1/3">
                          {g.remarks || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Recent attendance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Recent Attendance
              </h2>
              {attendance.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No attendance records yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/3">Subject</th>
                      <th className="pb-3 font-medium w-1/3">Date</th>
                      <th className="pb-3 font-medium w-1/3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.slice(0, 5).map((a) => (
                      <tr
                        key={a.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/3">
                          {a.subject.name}
                        </td>
                        <td className="py-3 text-gray-500 w-1/3">
                          {new Date(a.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 w-1/3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              a.status === "PRESENT"
                                ? "bg-green-50 text-green-600"
                                : a.status === "ABSENT"
                                  ? "bg-red-50 text-red-500"
                                  : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Grades tab */}
        {activeTab === "grades" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              My Grades
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {grades.length === 0 ? (
                <p className="text-gray-400 text-sm">No grades recorded yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/3">Subject</th>
                      <th className="pb-3 font-medium w-1/3">Score</th>
                      <th className="pb-3 font-medium w-1/3">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grades.map((g) => (
                      <tr
                        key={g.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/3">
                          {g.subject.name}
                        </td>
                        <td className="py-3 w-1/3">
                          <span className="bg-violet-50 text-violet-700 px-2 py-1 rounded-full text-xs font-medium">
                            {g.score}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400 w-1/3">
                          {g.remarks || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Attendance tab */}
        {activeTab === "attendance" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              My Attendance
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {attendance.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No attendance records yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium">Subject</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance.map((a) => (
                      <tr
                        key={a.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700">{a.subject.name}</td>
                        <td className="py-3 text-gray-500">
                          {new Date(a.date).toLocaleDateString()}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              a.status === "PRESENT"
                                ? "bg-green-50 text-green-600"
                                : a.status === "ABSENT"
                                  ? "bg-red-50 text-red-500"
                                  : "bg-yellow-50 text-yellow-600"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Subjects tab */}
        {activeTab === "subjects" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              My Subjects
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {enrollments.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No subjects enrolled yet.
                </p>
              ) : (
                enrollments.map((e) => (
                  <div
                    key={e.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
                  >
                    <div className="w-8 h-8 bg-violet-100 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-violet-600 text-xs font-semibold">
                        {e.subject.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-700">
                      {e.subject.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Enrolled {new Date(e.enrolledAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;
