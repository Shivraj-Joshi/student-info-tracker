import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div className="md:flex h-screen w-screen">
      <Sidebar />
      <div className="md:flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <div className="md:flex-1 overflow-hidden p-4 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
