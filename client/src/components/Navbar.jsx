import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaRankingStar } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className=" flex items-center justify-between p-4 bg-[#ededed]">
      <div className="logo text-2xl cursor-pointer">Student Report</div>
      <div className="links hidden md:flex  p-2 w-xl ">
        <ul className="flex w-full justify-around font-semibold  text-2xl ">
          <li className="cursor-pointer">
            <IoHome />
          </li>
          <li className="cursor-pointer">
            <FaRankingStar />{" "}
          </li>
          <li className="cursor-pointer">
            <IoNewspaperOutline />
          </li>
        </ul>
      </div>
      <IoMenu className="text-3xl cursor-pointer md:hidden" />
      <div className="profiles hidden md:flex text-3xl cursor-pointer">
        <div>
          <FaChalkboardTeacher />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
