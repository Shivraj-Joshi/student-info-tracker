import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext.jsx";
import { apiRequest } from "../api/api.jsx";

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Welcome, {user.name}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Enrollments */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            My Subjects
          </h2>
          {enrollments.length === 0 ? (
            <p className="text-gray-400 text-sm">No subjects enrolled yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {enrollments.map((e) => (
                <span
                  key={e.id}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {e.subject.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Grades */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">My Grades</h2>
          {grades.length === 0 ? (
            <p className="text-gray-400 text-sm">No grades recorded yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Subject</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((g) => (
                  <tr key={g.id} className="border-b last:border-0">
                    <td className="py-2">{g.subject.name}</td>
                    <td className="py-2">{g.score}</td>
                    <td className="py-2 text-gray-500">{g.remarks || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            My Attendance
          </h2>
          {attendance.length === 0 ? (
            <p className="text-gray-400 text-sm">No attendance records yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Subject</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map((a) => (
                  <tr key={a.id} className="border-b last:border-0">
                    <td className="py-2">{a.subject.name}</td>
                    <td className="py-2">
                      {new Date(a.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.status === "PRESENT"
                            ? "bg-green-100 text-green-700"
                            : a.status === "ABSENT"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
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
    </div>
  );
};

export default StudentDashboard;
