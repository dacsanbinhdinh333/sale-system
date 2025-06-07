// *********************
// Role of the component: Topbar of the header
// Name of the component: HeaderTop.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeaderTop />
// Input parameters: no input parameters
// Output: topbar with phone, email and login and register links
// *********************

"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  }
  return (
    <div className="h-10 text-white bg-blue-500 border-b border-blue-600 shadow-sm max-lg:px-3 max-lg:h-16">
      <div className="flex justify-between items-center h-full max-lg:flex-col max-lg:justify-center max-lg:items-center max-w-screen-2xl mx-auto px-6 md:px-12 transition-all duration-300">
        <ul className="flex items-center h-full gap-x-6 md:gap-x-10 text-sm md:text-base font-semibold max-[370px]:text-xs max-[370px]:gap-x-2">
          <li className="flex items-center gap-x-2">
            <FaHeadphones className="text-white text-lg md:text-xl" />
            <span className="hidden sm:inline">+381 61 123 321</span>
          </li>
          <li className="flex items-center gap-x-2">
            <FaRegEnvelope className="text-white text-lg md:text-xl" />
            <span className="hidden sm:inline">datsanbinhdinh77@email.com</span>
          </li>
        </ul>
        <ul className="flex items-center gap-x-4 md:gap-x-7 h-full text-sm md:text-base font-semibold max-[370px]:text-xs max-[370px]:gap-x-2">
          {!session ? (
            <>
              <li className="flex items-center">
                <Link href="/login" className="flex items-center gap-x-2 px-2 py-1 rounded hover:bg-blue-600 transition">
                  <FaRegUser className="text-white" />
                  <span className="">Đăng nhập</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <span className="ml-4 text-xs md:text-base truncate max-w-[120px] md:max-w-[200px] block">{session.user?.email}</span>
              <li className="flex items-center relative group">
                <button
                  className="flex items-center gap-x-2 px-2 py-1 rounded hover:bg-blue-600 transition focus:outline-none"
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded="false"
                  title="Tùy chọn tài khoản"
                >
                  <FaRegUser className="text-white" />
                  <span className="hidden xs:inline">Profile</span>
                  <svg className="w-3 h-3 ml-1 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                <ul className="absolute right-0 top-full mt-2 min-w-[160px] bg-white text-blue-700 rounded shadow-lg border border-blue-100 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition z-50">
                  <li>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-blue-50 rounded-t transition whitespace-nowrap">Thông tin cá nhân</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-blue-50 rounded-b transition text-red-600 whitespace-nowrap">Đăng xuất</button>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
