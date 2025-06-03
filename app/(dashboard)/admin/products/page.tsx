"use client";
import {
  CustomButton,
  DashboardProductTable,
  DashboardSidebar,
} from "@/components";
import React from "react";

const DashboardProducts = () => {
  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto min-h-[80vh] max-xl:flex-col max-xl:h-fit max-xl:gap-y-6 rounded-2xl shadow-lg p-4">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col gap-y-8 xl:ml-5 max-xl:ml-0 max-xl:px-2">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 mt-4 max-md:text-2xl uppercase tracking-wide">
          Quản lý sản phẩm
        </h1>
        <DashboardProductTable />
      </div>
    </div>
  );
};

export default DashboardProducts;
