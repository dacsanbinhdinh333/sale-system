import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  return (
    <Link href={href} className="group block">
      <div
        className="flex flex-col items-center justify-center gap-y-3 rounded-xl bg-white p-6 shadow-md transition-all duration-200 border border-gray-100 hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-blue-50 hover:to-pink-50 cursor-pointer min-h-[180px] min-w-[140px] w-full h-full"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-100 to-pink-100 mb-2 group-hover:scale-110 transition-transform duration-200">
          {children}
        </div>
        <h3 className="font-bold text-lg text-center text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryItem;
