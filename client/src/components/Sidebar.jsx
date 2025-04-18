import React, { useState } from "react";
import image from "../assets/school.jpg";
import { TbAppsFilled } from "react-icons/tb";
import { PiStudentFill } from "react-icons/pi";
import { MdEmojiEvents } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="h-[100vh] w-[250px] bg-white shadow-xl">
      <div>
        <div className="flex flex-col items-center gap-2 p-2 border-b border-b-slate-200">
          <img
            src={image}
            className="h-auto w-[150px] rounded-[50%] object-cover"
            alt="school logo"
          />
          <h1 className="text-md text-[#92959f]">Harmony Elementry School</h1>
        </div>
        <p className="p-3 font-semibold text-[#92959f]">Main Menu</p>
        {/* links */}
        <div className="">
          <ul className="flex flex-col  gap-4 font-semibold">
            <li className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
              <TbAppsFilled className="text-xl" />
              Home
            </li>
            <li className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
              <PiStudentFill className="text-xl" />
              Students
            </li>
            <li className=" p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
              <FaRankingStar className="text-xl" />
              Class Ranking
            </li>
            <li className="bg-white p-3 flex items-center gap-3 cursor-pointer hover:bg-purple-300 transition-translate duration-300">
              <MdEmojiEvents className="text-xl" />
              Events
            </li>
          </ul>
        </div>
        {/* profiles */}
        <div className="flex flex-col gap-3 mt-2 font-semibold">
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
      </div>
    </div>
  );
};

export default Sidebar;
