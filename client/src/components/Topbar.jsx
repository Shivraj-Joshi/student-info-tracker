import React from "react";
import { SiGoogleclassroom } from "react-icons/si";
import { RiSearchEyeLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className=" h-[50px] w-[90vw] ">
      <div className="topbar  p-3 flex items-center justify-evenly gap-3 bg-gray-200">
        <h1 className="text-[#606265]">Home Page</h1>
        <div className="search w-[200px] md:w-[350px] bg-white rounded-lg flex gap-2 p-2 md:p-1 items-center  text-[#606265]">
          <input
            type="search"
            placeholder="Search Student.."
            className="outline-none w-full"
          />
          <RiSearchEyeLine />
        </div>
        <div className="bg-white rounded-lg p-2 px-3 flex items-center gap-1">
          {" "}
          <SiGoogleclassroom />{" "}
          <h1 className="font-semibold text-[#606265]">Class</h1>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
