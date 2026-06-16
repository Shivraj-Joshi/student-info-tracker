import { useState, useEffect, use } from "react";
import { useAuth } from "../context/authContext.jsx";
import { apiRequest } from "../api/api.js";
import { useNavigate } from "react-router-dom";

const AdminDasboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [enrollmentForm, setEnrollmentForm] = useState({
    studentId: "",
    subjectId: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [message, setMessage] = useState("");
  const [teacherForm, setTeacherForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    subjectId: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [subjectForm, setSubjectForm] = useState({ name: "" });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        //teacher data
        const data = await apiRequest("/api/teacher", "GET", null, user.token);
        setTeachers(data);
        //subject data
        const subjectData = await apiRequest(
          "/api/teacher/subjects",
          "GET",
          null,
          user.token,
        );
        setSubjects(subjectData);

        //students data
        const studentData = await apiRequest(
          "/api/student",
          "GET",
          null,
          user.token,
        );
        setStudents(studentData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  //add a teacher
  const handleAddTeachers = async () => {
    try {
      const result = await apiRequest(
        "/api/teacher/register",
        "POST",
        {
          name: teacherForm.name,
          email: teacherForm.email,
          password: teacherForm.password,
          phone: teacherForm.phone,
          subjectId: parseInt(teacherForm.subjectId),
        },
        user.token,
      );
      console.log(result);
      setMessage("Teacher added successfully");
      setTeacherForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        subjectId: "",
      });
      //refresh teachers list
      const data = await apiRequest("/api/teacher", "GET", null, user.token);
      setTeachers(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // delete a teacher
  const handleDeleteTeacher = async (id) => {
    try {
      await apiRequest(`/api/teacher/${id}`, "DELETE", null, user.token);
      setMessage("Teacher removed successfully");
      setTeachers(teachers.filter((t) => t.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  //adding a new subject

  const handleAddSubject = async () => {
    try {
      await apiRequest(
        "/api/subject",
        "POST",
        { name: subjectForm.name },
        user.token,
      );
      setMessage("Subject added successfully");
      setSubjectForm({ name: "" });
      const data = await apiRequest("/api/subject", "GET", null, user.token);
      setSubjects(data);
    } catch (error) {
      setMessage(error.message);
    }
  };

  // deleting a subject

  const handleDeleteSubject = async (id) => {
    try {
      const data = await apiRequest(
        `/api/subject/${id}`,
        "DELETE",
        null,
        user.token,
      );
      setMessage("Subject deleted successfully");
      setSubjects(subjects.filter((s) => s.id !== id));
    } catch (error) {
      setMessage(error.message);
    }
  };

  //enrolling students in subject

  const handleEnrollStudent = async () => {
    try {
      await apiRequest(
        "/api/enrollment",
        "POST",
        {
          studentId: parseInt(enrollmentForm.studentId),
          subjectId: parseInt(enrollmentForm.subjectId),
        },
        user.token,
      );
      setMessage("Student enrolled successfully");
      setEnrollmentForm({ studentId: "", subjectId: "" });
    } catch (error) {
      setMessage(error.message);
    }
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
            Admin
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
            { key: "teachers", label: "Manage Teachers" },
            { key: "add", label: "Add Teacher" },
            { key: "subjects", label: "Manage Subjects" },
            { key: "enrollment", label: "Enroll Students" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                setMessage("");
              }}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                activeTab === item.key
                  ? "bg-red-50 text-red-700 font-medium"
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
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:text-white hover:bg-red-500 cursor-pointer"
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

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">Total Teachers</p>
                <p className="text-2xl font-semibold text-red-600">
                  {teachers.length}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400 mb-1">System Status</p>
                <p className="text-2xl font-semibold text-green-600">Active</p>
              </div>
            </div>

            {/* Teachers table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                All Teachers
              </h2>
              {teachers.length === 0 ? (
                <p className="text-gray-400 text-sm">No teachers added yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/4">Name</th>
                      <th className="pb-3 font-medium w-1/4">Email</th>
                      <th className="pb-3 font-medium w-1/4">Phone</th>
                      <th className="pb-3 font-medium w-1/4">Subject</th>
                      <th className="pb-3 font-medium w-1/4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/5">{t.name}</td>
                        <td className="py-3 text-gray-500 w-1/5">{t.email}</td>
                        <td className="py-3 text-gray-500 w-1/5">
                          {t.phone || "-"}
                        </td>
                        <td className="py-3 text-gray-500 w-1/5">
                          {t.subject.name}
                        </td>
                        <td className="py-3 w-1/5">
                          <button
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="text-red-400 hover:text-red-600 text-xs cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Manage Teachers tab */}
        {activeTab === "teachers" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Manage Teachers
            </h1>
            {message && (
              <p
                className={`text-sm mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}
              >
                {message}
              </p>
            )}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {teachers.length === 0 ? (
                <p className="text-gray-400 text-sm">No teachers added yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/4">Name</th>
                      <th className="pb-3 font-medium w-1/4">Email</th>
                      <th className="pb-3 font-medium w-1/4">Phone</th>
                      <th className="pb-3 font-medium w-1/4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/4">{t.name}</td>
                        <td className="py-3 text-gray-500 w-1/4">{t.email}</td>
                        <td className="py-3 text-gray-500 w-1/4">
                          {t.phone || "-"}
                        </td>
                        <td className="py-3 w-1/4">
                          <button
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="text-red-400 hover:text-red-600 text-xs cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Add Teacher tab */}
        {activeTab === "add" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Add Teacher
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-md">
              {message && (
                <p
                  className={`text-sm mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
              <div className="space-y-4">
                {/* Subject dropdown goes here — after the map, before the button */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Subject
                  </label>
                  <select
                    value={teacherForm.subjectId}
                    onChange={(e) =>
                      setTeacherForm({
                        ...teacherForm,
                        subjectId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                {[
                  { label: "Name", key: "name", type: "text" },
                  { label: "Email", key: "email", type: "email" },
                  { label: "Password", key: "password", type: "password" },
                  { label: "Phone", key: "phone", type: "text" },
                  { label: "Subject ID", key: "subjectId", type: "number" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm text-gray-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={teacherForm[field.key]}
                      onChange={(e) =>
                        setTeacherForm({
                          ...teacherForm,
                          [field.key]: e.target.value,
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddTeachers}
                  className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 cursor-pointer"
                >
                  Add Teacher
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manage subject tab */}

        {activeTab === "subjects" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Manage Subjects
            </h1>

            {message && (
              <p
                className={`text-sm mb-4 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}
              >
                {message}
              </p>
            )}

            {/* Add subject form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-md mb-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                Add New Subject
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={subjectForm.name}
                    onChange={(e) => setSubjectForm({ name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    placeholder="e.g. Mathematics"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 cursor-pointer"
                >
                  Add Subject
                </button>
              </div>
            </div>

            {/* Subjects list */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                All Subjects
              </h2>
              {subjects.length === 0 ? (
                <p className="text-gray-400 text-sm">No subjects added yet.</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-gray-100">
                      <th className="pb-3 font-medium w-1/2">Subject Name</th>
                      <th className="pb-3 font-medium w-1/2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="py-3 text-gray-700 w-1/2">{s.name}</td>
                        <td className="py-3 w-1/2">
                          <button
                            onClick={() => handleDeleteSubject(s.id)}
                            className="text-red-400 hover:text-red-600 text-xs cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Enroll student tab */}

        {activeTab === "enrollment" && (
          <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-6">
              Enroll Student
            </h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-md">
              {message && (
                <p
                  className={`text-sm mb-4 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}
                >
                  {message}
                </p>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Select Student
                  </label>
                  <select
                    value={enrollmentForm.studentId}
                    onChange={(e) =>
                      setEnrollmentForm({
                        ...enrollmentForm,
                        studentId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">Select a student</option>
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.rollNumber}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Select Subject
                  </label>
                  <select
                    value={enrollmentForm.subjectId}
                    onChange={(e) =>
                      setEnrollmentForm({
                        ...enrollmentForm,
                        subjectId: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  onClick={handleEnrollStudent}
                  className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600"
                >
                  Enroll Student
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDasboard;
