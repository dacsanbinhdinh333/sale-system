"use client";
import { DashboardSidebar, StatsElement } from "@/components";
import React, { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const AdminDashboardPage = () => {
  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto max-xl:flex-col">
      <DashboardSidebar />
      <div className="flex flex-col items-center ml-5 gap-y-8 w-full max-xl:ml-0 max-xl:px-4 max-xl:mt-5 max-md:gap-y-4">
        <div className="w-full flex flex-wrap justify-between gap-6 max-md:flex-col max-md:gap-y-4">
          <StatsElement />
          <StatsElement />
          <StatsElement />
        </div>
        <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-lg text-white h-44 flex flex-col justify-center items-center gap-y-2 p-6">
          <h4 className="text-3xl font-bold drop-shadow max-[400px]:text-2xl tracking-tight">
            Số lượt truy cập hôm nay
          </h4>
          <p className="text-4xl font-extrabold">1200</p>
          <p className="text-green-200 flex gap-x-2 items-center text-lg font-semibold">
            <FaArrowUp className="text-green-300" />
            12.5%{" "}
            <span className="text-white font-normal">so với tháng trước</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
