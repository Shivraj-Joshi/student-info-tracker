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
    <div className="h-[100vh] w-[250px] bg-green-400">
      Harmony Elementry School
      <div>
        <div className="flex flex-col items-center gap-2 p-2">
          <img
            src={image}
            className="h-auto w-[150px] rounded-[50%] object-cover"
            alt="school logo"
          />
          <h1>Harmony Elementry School</h1>
        </div>
        <p>Main Menu</p>
        {/* links */}
        <div className="bg-pink-300 p-3 ">
          <ul className="flex flex-col gap-5">
            <li className="bg-white p-2 flex gap-3">
              <TbAppsFilled />
              Home
            </li>
            <li className="bg-white p-2 flex gap-3">
              <PiStudentFill />
              Students
            </li>
            <li className="bg-white p-2 flex gap-3">
              <FaRankingStar />
              Class Ranking
            </li>
            <li className="bg-white p-2 flex gap-3">
              <MdEmojiEvents />
              Events
            </li>
          </ul>
        </div>
        {/* profiles */}
        <div className="flex flex-col gap-3">
          <div className="bg-purple-500 p-3">
            <h1>
              {" "}
              <FaUser />
              Login
            </h1>
          </div>
          <div className="bg-purple-500 p-3">
            <h1>
              {" "}
              <RiAdminFill />
              Admin
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
