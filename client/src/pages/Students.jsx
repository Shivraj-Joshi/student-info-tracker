import React from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ClassData } from "../data/Data";

const Students = () => {
  return (
    <div className="flex h-[100vh] w-[100vw] bg-transparent p-5 justify-center">
      <div className="bg-white w-[90vw] rounded-lg overflow-y-scroll shadow-lg ">
        <table className="min-w-full text-sm text-left text-gray-700 bg-white rounded-md shadow ">
          {/* Head of the table */}
          <thead className="text-xs text-gray-500 uppercase bg-white w-full border-b-2 border-purple-600">
            <tr>
              <th className="p-4">Sr.No</th>
              <th className="p-4">Name</th>
              <th className="p-4">Class</th>
              <th className="p-4">Grade</th>
              <th className="p-4">Curriculum Progress</th>
              <th className="p-4">Attendance</th>
            </tr>
          </thead>
          {/* body/list of the table */}
          <tbody>
            {ClassData.map((students) => (
              <tr
                key={students.id}
                className="border-b border-gray-300  hover:bg-purple-300 transform-translate duration-300 cursor-pointer"
              >
                <td className="p-4 text-gray-600">{students.id}</td>
                <td className="flex items-center gap-3 p-4 whitespace-nowrap">
                  <img
                    src={students.image}
                    className="w-10 h-10 rounded-full"
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
                  {/* <!-- Replace this with an inline SVG or a chart --> */}
                  <img
                    src="https://dummyimage.com/60x24/def/aaa.png&text=📈"
                    alt="progress"
                  />
                </td>

                <td className="p-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`bg-green-500 h-2.5 rounded-full style=${"width: 86%"}`}
                      //
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {students.Attendance}
                  </span>
                </td>

                <td className="p-4 text-right"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
