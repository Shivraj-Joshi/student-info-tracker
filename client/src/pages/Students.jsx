import React from "react";
import { ClassData } from "../data/Data";

const Students = () => {
  return (
    <div className="flex h-screen w-screen bg-transparent p-5 justify-center">
      <div className="bg-white w-full max-w-[90vw] rounded-lg shadow-lg">
        {/* Table wrapper with vertical scroll */}
        <div className="overflow-y-auto max-h-full rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-700 bg-white">
            {/* Head of the table */}
            <thead className="sticky top-0 z-10 text-xs text-gray-500 uppercase bg-white border-b-2 border-purple-600 shadow-lg">
              <tr>
                <th className="p-4">Sr.No</th>
                <th className="p-4">Name</th>
                <th className="p-4">Class</th>
                <th className="p-4">Grade</th>
                <th className="p-4">Curriculum Progress</th>
                <th className="p-4">Attendance</th>
              </tr>
            </thead>

            {/* Body of the table */}
            <tbody>
              {ClassData.map((students) => (
                <tr
                  key={students.id}
                  className="border-b border-gray-300 hover:bg-purple-100 transition-all duration-300 cursor-pointer"
                >
                  <td className="p-4 text-gray-600">{students.id}</td>
                  <td className="flex items-center gap-3 p-4 whitespace-nowrap">
                    <img
                      src={students.image}
                      className="w-10 h-10 rounded-full"
                      alt="student"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        {students.Name}
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-gray-600">{students.Class}</td>

                  <td className="p-4">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-0.5 rounded">
                      {students.Grade}
                    </span>
                  </td>

                  <td className="p-4">
                    <img
                      src="https://dummyimage.com/60x24/def/aaa.png&text=📈"
                      alt="progress"
                    />
                  </td>

                  <td className="p-4">
                    {/* Calculate color based on attendance */}
                    {(() => {
                      const percentage = parseInt(students.Attendance);
                      let barColor = "bg-green-500";
                      if (percentage < 30) barColor = "bg-red-500";
                      else if (percentage < 60) barColor = "bg-orange-400";

                      return (
                        <>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${barColor}`}
                              style={{ width: students.Attendance }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {students.Attendance}
                          </span>
                        </>
                      );
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
