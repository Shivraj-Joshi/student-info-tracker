import { useState, useEffect, use } from "react";
import { useAuth } from "../context/authContext.jsx";
import { apiRequest } from "../api/api.jsx";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // mark attendance form state
  const [attendanceForm, setAttendanceForm] = useState({
    studentId: "",
    subjectId: "",
    date: "",
    status: "PRESENT",
  });

  // grade form state
  const [gradeForm, setGradeForm] = useState({
    studentId: "",
    subjectId: "",
    score: "",
    remarks: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentData, gradeData, attendanceData] = await Promise.all([
          apiRequest("/api/enrollment/subject/1", "GET", null, user.token),
          apiRequest("/api/grade/subject/1", "GET", null, user.token),
          apiRequest("/api/attendance/subject/1", "GET", null, user.token),
        ]);
        setStudents(studentData);
        setGrades(gradeData);
        setAttendance(attendanceData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMarkAttendance = async () => {
    try {
      await apiRequest(
        "/api/attendance",
        "POST",
        {
          studentId: parseInt(attendanceForm.studentId),
          subjectId: parseInt(attendanceForm.subjectId),
          date: attendanceForm.date,
          status: attendanceForm.status,
        },
        user.token,
      );
      setMessage("Attendance Marked successfully !");
      setAttendanceForm({
        studentId: "",
        subjectId: "",
        date: "",
        status: "PRESENT",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleRecordGrade = async () => {
    try {
      const result = await apiRequest(
        "/api/grade",
        "POST",
        {
          studentId: parseInt(gradeForm.studentId),
          subjectId: parseInt(gradeForm.subjectId),
          score: parseFloat(gradeForm.score),
          remarks: gradeForm.remarks,
        },
        user.token,
      );
      setMessage("Grade Recorded successfully !");
      setGradeForm({
        studentId: "",
        subjectId: "",
        score: "",
        remarks: "",
      });
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 fixed h-full">
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Teacher
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
            { key: "attendance", label: "Mark Attendance" },
            { key: "grades", label: "Record Grades" },
            { key: "students", label: "My Students" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setMessage("");
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeTab === item.key
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-50"
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

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                {
                  label: "Total Students",
                  value: students.length,
                  color: "text-blue-600",
                },
                {
                  label: "Grades Recorded",
                  value: grades.length,
                  color: "text-violet-600",
                },
                {
                  label: "Attendance Records",
                  value: attendance.length,
                  color: "text-green-600",
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

            {/* Students table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                My Students
              </h2>
              {students.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No students enrolled yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/3">Name</th>
                      <th className="pb-3 font-medium w-1/3">Email</th>
                      <th className="pb-3 font-medium w-1/3">Roll Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/3">
                          {s.student.name}
                        </td>
                        <td className="py-3 text-gray-500 w-1/3">
                          {s.student.email}
                        </td>
                        <td className="py-3 text-gray-500 w-1/3">
                          {s.student.rollNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Mark Attendance tab */}
        {activeTab === "attendance" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Mark Attendance
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-md">
              {message && (
                <p
                  className={`text-sm mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Student ID
                  </label>
                  <input
                    type="number"
                    value={attendanceForm.studentId}
                    onChange={(e) =>
                      setAttendanceForm({
                        ...attendanceForm,
                        studentId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Subject ID
                  </label>
                  <input
                    type="number"
                    value={attendanceForm.subjectId}
                    onChange={(e) =>
                      setAttendanceForm({
                        ...attendanceForm,
                        subjectId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={attendanceForm.date}
                    onChange={(e) =>
                      setAttendanceForm({
                        ...attendanceForm,
                        date: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Status
                  </label>
                  <select
                    value={attendanceForm.status}
                    onChange={(e) =>
                      setAttendanceForm({
                        ...attendanceForm,
                        status: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PRESENT">Present</option>
                    <option value="ABSENT">Absent</option>
                    <option value="LATE">Late</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleMarkAttendance}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Mark Attendance
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Record Grades tab */}
        {activeTab === "grades" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Record Grades
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-md">
              {message && (
                <p
                  className={`text-sm mb-4 ${message.includes("successfully ") ? "text-green-600" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
              <form className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Student ID
                  </label>
                  <input
                    type="number"
                    value={gradeForm.studentId}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, studentId: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Subject ID
                  </label>
                  <input
                    type="number"
                    value={gradeForm.subjectId}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, subjectId: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Score
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={gradeForm.score}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, score: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Remarks
                  </label>
                  <input
                    type="text"
                    value={gradeForm.remarks}
                    onChange={(e) =>
                      setGradeForm({ ...gradeForm, remarks: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRecordGrade}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  Record Grade
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Students tab */}
        {activeTab === "students" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              My Students
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {students.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No students enrolled yet.
                </p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/3">Name</th>
                      <th className="pb-3 font-medium w-1/3">Email</th>
                      <th className="pb-3 font-medium w-1/3">Roll Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/3">
                          {s.student.name}
                        </td>
                        <td className="py-3 text-gray-500 w-1/3">
                          {s.student.email}
                        </td>
                        <td className="py-3 text-gray-500 w-1/3">
                          {s.student.rollNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;
