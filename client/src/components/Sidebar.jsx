import React, { useState } from "react";
import image from "../assets/school.jpg";
import { TbAppsFilled } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { MdEmojiEvents } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { Link } from "react-router";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="  h-[100px] w-[100vw]  flex items-center md:h-[100vh] md:w-[250px] bg-white shadow-xl">
      {/* for greater than small devices  */}
      <div className="  flex flex-row  md:flex-col  p-2 w-full justify-between">
        <div className=" flex md:flex-col items-center gap-2 p-2 md:border-b border-b-slate-200">
          <img
            src={image}
            className="h-auto w-[80px] md:w-[150px] rounded-[50%] object-cover"
            alt="school logo"
          />
          <h1 className="hidden md:flex text-md text-[#92959f]">
            H. Elementry School
          </h1>
        </div>
        <p className="hidden md:flex p-3 font-semibold text-[#92959f]">
          Main Menu
        </p>
        {/* links */}
        <div className="hidden md:flex flex-col">
          <ul className="flex flex-col  gap-4 font-semibold">
            <Link to="/">
              <li className="  p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
                <TbAppsFilled className="text-xl" />
                Home
              </li>
            </Link>
            <Link to="/students">
              <li className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
                <PiStudentFill className="text-xl" />
                Students
              </li>
            </Link>
            <Link to="/classranking">
              <li className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
                <FaRankingStar className="text-xl" />
                Class Ranking
              </li>
            </Link>
            <Link to="/events">
              <li className="bg-white p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
                <MdEmojiEvents className="text-xl" />
                Events
              </li>
            </Link>
          </ul>
        </div>
        {/* profiles */}
        <div className=" hidden md:flex flex-col gap-3 mt-2 font-semibold">
          <div className="p-3 cursor-pointer hover:bg-purple-400 transition-translate duration-300">
            <h1 className="flex items-center gap-3">
              {" "}
              <FaUser className="text-xl" />
              Login
            </h1>
          </div>
          <div className=" p-3 cursor-pointer hover:bg-purple-400 transition-translate duration-300 ">
            <h1 className="flex items-center  gap-3">
              {" "}
              <RiAdminFill className="text-xl" />
              Admin
            </h1>
          </div>
        </div>
        <div className="menu flex items-center  md:hidden p-2 ">
          <IoMenu
            onClick={(e) => setIsMenuOpen(!isMenuOpen)}
            className="text-5xl"
          />
        </div>
      </div>

      {/* for small devices */}
      {isMenuOpen ? (
        <ul className="md:hidden space-y-2 absolute top-[10%] left-0 w-full flex flex-col gap-2 items-center bg-[#fff] text-black transition-translate duration-300 ">
          <li>Home</li>
          <li>Students</li>
          <li>Class Ranking</li>
          <li>Events</li>
          <li>Login</li>
          <li>Admin</li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
