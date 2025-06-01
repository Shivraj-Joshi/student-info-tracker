import React from "react";

const Events = () => {
  return (
    <div className="h-[86dvh] w-[78dvw] bg-[#F7F8FB] rounded-2xl p-3 flex flex-col gap-10">
      <h2 className="text-center text-[#273d5e] font-bold text-3xl ">
        Upcoming School Events
      </h2>
      <div className="filterp-2 flex justify-center">
        <div className="hover:bg-red-300 cursor-pointer p-1 w-[90px] flex justify-center items-center rounded-l-lg border ">
          This week
        </div>
        <div className="hover:bg-sky-300 cursor-pointer p-1 w-[90px] flex justify-center items-center border">
          {" "}
          This month
        </div>
        <div className="hover:bg-slate-400 cursor-pointer p-1 w-[90px] flex justify-center items-center border rounded-r-lg">
          All Events
        </div>
      </div>
      <div className="event-cards p-2 grid grid-cols-2 gap-10 ">
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-600">
          <h3 className="text-lg font-semibold">Test</h3>
          <p className="text-gray-600 text-sm">12 june 2025</p>
          <p className="text-gray-500 text-sm mt-1">Maths test</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md  border border-gray-600">
          <h3 className="text-lg font-semibold">Sports</h3>
          <p className="text-gray-600 text-sm">12 june 2025</p>
          <p className="text-gray-500 text-sm mt-1">Maths test</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md  border border-gray-600">
          <h3 className="text-lg font-semibold">Cultural Activity</h3>
          <p className="text-gray-600 text-sm">12 june 2025</p>
          <p className="text-gray-500 text-sm mt-1">Maths test</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md  border border-gray-600">
          <h3 className="text-lg font-semibold">Parents Teacher Meeting</h3>
          <p className="text-gray-600 text-sm">12 june 2025</p>
          <p className="text-gray-500 text-sm mt-1">Maths test</p>
        </div>
      </div>
    </div>
  );
};

export default Events;
