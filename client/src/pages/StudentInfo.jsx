import React, { useState } from "react";
import image from "../assets/student1.jpg";
// import CircularProgress from "../components/CircularProgress";
import { SubjectData, ActivityData } from "../data/Data";
import CircularProgress from "../components/CircularProgress";
import PerformanceChart from "../components/PerformanceChart";

const StudentInfo = () => {
  //   const [progress, setProgress] = useState(90);
  return (
    <div
      className="md:h-[100dvh] md:w-[100dvw]  flex flex-col md:flex-row
     p-2 md:gap-5 gap-3"
    >
      {/* div for student profile and personal information  */}
      <div className="left-div h-[230px] md:h-[85dvh] md:w-[18dvw] bg-white p-2 rounded-2xl flex md:flex-col gap-4 md:gap-2">
        {" "}
        <div className="bg-transparent p-2 flex flex-col gap-3 items-center">
          <img
            src={image}
            alt="student profile"
            className="h-[150px] w-[150px] md:h-[150px] md:w-[150px] rounded-[50%] border-3 border-purple-500  "
          />
          <h1 className="uppercase font-semibold">Sumit</h1>
        </div>
        <div className="flex flex-col md:gap-2 md:p-2 p-1 gap-1">
          <h1 className="text-gray-600 font-mono text-center hidden md:flex">
            Personal Infromation
          </h1>
          <h1 className="text-gray-600">
            Class: <p className="text-black">8th</p>
          </h1>
          <h1 className="text-gray-600">
            Roll no: <p className="text-black">24</p>
          </h1>
          <h1 className="text-gray-600">
            Email: <p className="text-black">sumit24@gmail.com</p>
          </h1>
          <h1 className="text-gray-600">
            Contact: <p className="text-black">968658425</p>
          </h1>
          <h1 className="text-gray-600 hidden md:flex flex-col">
            Address: <p className="text-black">new market, sarai, faridabad</p>
          </h1>
        </div>
      </div>
      {/* div for students academics performance  */}
      <div className="right-div h-[85dvh]   md:w-[60dvw] flex flex-col  gap-5  p-3 text-wrap rounded-2xl overflow-y-scroll md:overflow-hidden">
        {/* performence based on academics */}
        <div className="h-auto w-full bg-white p-2 rounded-2xl ">
          <h1 className="text-center text-gray-600">
            Subject Based Performance
          </h1>
          <div className=" md:flex items=center justify-between flex-wrap p-3 gap-5">
            {SubjectData.map((subject) => (
              <div key={subject.id} className=" p-3">
                {(() => {
                  const percentage = parseInt(subject.score);
                  let barColor = "bg-green-500";
                  if (percentage < 30) barColor = "bg-red-500";
                  else if (percentage < 60) barColor = "bg-orange-400";

                  return (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${barColor}`}
                          style={{ width: subject.score }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {subject.score}%
                      </span>
                      <span className="text-xs text-gray-500 ml-5">
                        {subject.subject}
                      </span>
                    </>
                  );
                })()}
              </div>
            ))}
          </div>
        </div>
        {/* performance based on  different activities */}
        <div className="bg-white rounded-2xl  md:w-[400px] flex  p-3 gap-5">
          {ActivityData.map((activity) => (
            <div key={activity.id} className=" p-1 flex flex-col items-center">
              <CircularProgress
                value={activity.performance}
                image={activity.image}
              />
            </div>
          ))}
        </div>
        {/* overall performance in chart */}
        <div className="bg-white rounded-2xl  w-full p-3 flex flex-col gap-3">
          <span className="text-center text-gray-600">Overall Performance</span>
          {/* <CircularProgress /> */}
          <PerformanceChart />
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
