// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[700px] w-full bg-gradient-to-r from-blue-500 to-blue-400 max-lg:h-[900px] max-md:h-[750px] flex items-center">
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-10">
        <div className="flex flex-col gap-y-7 max-lg:order-last col-span-2 justify-center">
          <h1 className="text-6xl text-white font-extrabold mb-3 drop-shadow-lg max-xl:text-5xl max-md:text-4xl max-sm:text-3xl tracking-wide">
            SẢN PHẨM MỚI
          </h1>
          <p className="text-white text-lg max-sm:text-base leading-relaxed drop-shadow-md">
            Cá mai rim tỏi ớt với hương vị thơm ngon của món cá mai được tẩm theo một công thức truyền thống đặc sắc của Bình Định.
            Món có sự kết hợp của vị dai thơm từ khô, vị cay the the của ớt và thơm mùi tỏi. Thêm một chút đường để tạo độ kết dính. Và để miếng cá mai được thấm dẻo tròn vị. Đây là món ăn vặt chiều lòng được nhiều dân sành ăn. Món Cá mai rim tỏi ớt quý khách có thể làm mồi nhậu rai rai với bia và rượu, hay ăn với cơm, mì hoặc ăn vặt thì không có vị ngon nào diễn tả được bằng lời bởi hương vị cá rim tỏi ớt bình định trứ danh này rất đặc biệt mà nơi khác không thể kiếm được.
          </p>
          <div className="flex gap-x-4 max-lg:flex-col max-lg:gap-y-3 mt-2">
            <button className="bg-white text-blue-600 font-bold px-12 py-3 rounded-lg shadow-md text-xl max-lg:text-xl max-sm:text-lg hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200">
              MUA NGAY
            </button>
            <button className="bg-blue-600 text-white font-bold px-12 py-3 rounded-lg shadow-md text-xl max-lg:text-xl max-sm:text-lg hover:bg-blue-700 transition-colors duration-200 border border-white">
              XEM CHI TIẾT
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/dashboard/new/ca-mai-riem.jpg"
            width={420}
            height={420}
            alt="ca mai"
            className="rounded-2xl shadow-2xl object-cover max-md:w-[300px] max-md:h-[300px] max-sm:h-[220px] max-sm:w-[220px] w-[420px] h-[420px] border-4 border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
