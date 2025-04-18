import React from "react";
import { RiSearchEyeLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
// import student from "../assets/student1.jpg";
import { StudentData } from "../data/Data";

const Home = () => {
  return (
    <div className=" bg-transparent w-full">
      {/* topbar */}
      <div className="topbar p-3 flex items-center justify-evenly bg-transparent">
        <h1 className="text-[#606265]">Home Page</h1>
        <div className="search w-[350px] bg-white rounded-lg flex gap-2 p-1 items-center  text-[#606265]">
          <input
            type="search"
            placeholder="Search Student.."
            className="outline-none w-full"
          />
          <RiSearchEyeLine />
        </div>
        <div className="bg-white rounded-lg px-3 flex items-center gap-1">
          {" "}
          <SiGoogleclassroom />{" "}
          <h1 className="font-semibold text-[#606265]">Class</h1>
        </div>
      </div>
      {/* main container */}
      <h1 className="text-center text-[#606265] font-semibold">
        Top Performers
      </h1>
      <div className="bg-transparent w-full h-auto p-3 flex flex-wrap justify-center gap-5">
        {StudentData.map((project) => (
          <div
            key={project.id}
            className="student-card flex flex-col p-3 gap-3 md:gap-2 items-center bg-white rounded-lg shadow-lg h-[350px] w-[350px] md:h-[250px] md:w-[250px]  cursor-pointer"
          >
            <img
              src={project.image}
              alt=""
              className=" h-[200px] w-[200px] md:h-[120px] md:w-[120px] rounded-[50%] "
            />
            <h1>Name: {project.Name}</h1>
            <p>Roll No: {project.rollNo}</p>
            <p>Study: {project.class}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
