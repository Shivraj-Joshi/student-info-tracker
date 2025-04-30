import React, { useState } from "react";
import image from "../assets/student1.jpg";
import CircularProgress from "../components/CircularProgress";

const StudentInfo = () => {
  const [progress, setProgress] = useState(90);
  return (
    <div className="md:h-[100dvh] md:w-[100dvw] bg-sky-400 md:flex p-2 gap-5">
      {/* div for student profile and personal information  */}
      <div className="left-div h-[85dvh] w-[18dvw] bg-white p-2 rounded-2xl">
        {" "}
        <div className="bg-transparent p-2 flex flex-col gap-3 items-center">
          <img
            src={image}
            alt="student profile"
            className="h-[200px] w-[200px] md:h-[150px] md:w-[150px] rounded-[50%] border-3 border-purple-500  "
          />
          <h1 className="uppercase font-semibold">Sumit</h1>
        </div>
        <div className="flex flex-col gap-2 p-2  ">
          <h1 className="text-gray-600 font-mono text-center">
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
          <h1 className="text-gray-600">
            Address: <p className="text-black">new market, sarai, faridabad</p>
          </h1>
        </div>
      </div>
      {/* div for students academics performance  */}
      <div className="right-div h-[85dvh] w-[60dvw] bg-amber-300 p-3 text-wrap rounded-2xl ">
        <div className="h-[180px] w-full bg-white p-2 ">
          <h1 className="text-center text-gray-600">
            Subject Based Performance
          </h1>
          <div className="subjects bg-pink-300 flex justify-evenly gap-2 p-4">
            <CircularProgress value={progress} />
            {/* <div className="bg-green-600 h-[80px] w-[80px] rounded-[50%] flex flex-col items-center justify-center ">
              <p>75%</p>
              Maths
            </div>
            <div className="bg-green-600 h-[80px] w-[80px] rounded-[50%] flex items-center justify-center ">
              Maths
            </div>
            <div className="bg-green-600 h-[80px] w-[80px] rounded-[50%] flex items-center justify-center ">
              Maths
            </div>
            <div className="bg-green-600 h-[80px] w-[80px] rounded-[50%] flex items-center justify-center ">
              Maths
            </div>
            <div className="bg-green-600 h-[80px] w-[80px] rounded-[50%] flex items-center justify-center ">
              Maths
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
