import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <div className="flex-1 overflow-hidden p-4 bg-gray-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
