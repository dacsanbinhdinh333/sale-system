import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
    <div className="py-24 bg-gradient-to-l from-white via-blue-100 to-blue-600">
      <div className="text-center flex flex-col gap-y-8 items-center max-w-3xl mx-auto px-4">
        <h2 className="text-7xl font-extrabold text-center mb-2 max-md:text-5xl max-[480px]:text-3xl tracking-tight drop-shadow-lg">
          <span className="text-blue-700">GIỚI THIỆU </span>
          <span className="text-black">ĐẶC SẢN </span>
          <span className="text-blue-600">BÌNH ĐỊNH</span>
        </h2>
        <div className="space-y-2">
          <p className="text-blue-900 text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base drop-shadow-sm">
            Xem các mặt hàng mới nhất.
          </p>
          <p className="text-blue-900 text-center text-2xl font-semibold max-md:text-xl max-[480px]:text-base drop-shadow-sm">
            Các sản phẩm được yêu thích nhất dành cho bạn.
          </p>
        </div>
        <Link href="/shop" className="block text-white bg-gradient-to-r from-blue-600 to-blue-400 font-bold px-16 py-4 text-2xl rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all duration-200 max-md:text-lg max-md:px-10 max-md:py-3 max-md:w-72 max-[480px]:w-60 mx-auto mt-4">
          XEM NGAY
        </Link>
      </div>
    </div>
  );
};

export default IntroducingSection;
