"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaHeadphones, FaRegEnvelope, FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Đăng xuất thành công!");
  };

  return (
    <div className="h-10 text-white bg-blue-600 border-b border-blue-700 shadow-sm max-lg:h-16 max-lg:px-3">
      <div className="flex justify-between items-center h-full max-lg:flex-col max-lg:justify-center max-lg:gap-2 max-w-screen-2xl mx-auto px-4 md:px-8">

        {/* Contact Info */}
        <ul className="flex items-center gap-x-6 text-sm md:text-base font-medium max-[370px]:gap-x-2">
          <li className="flex items-center gap-x-2">
            <FaHeadphones className="text-white text-lg" />
            <span className="hidden sm:inline">098 4145 495</span>
          </li>
          <li className="flex items-center gap-x-2">
            <FaRegEnvelope className="text-white text-lg" />
            <span className="hidden sm:inline">datsanbinhdinh77@email.com</span>
          </li>
        </ul>

        {/* Auth Section */}
        <ul className="flex items-center gap-x-5 text-sm md:text-base font-medium max-[370px]:gap-x-2">
          {!session ? (
            <li>
              <Link
                href="/login"
                className="flex items-center gap-x-2 px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                <FaRegUser className="text-white" />
                <span>Đăng nhập</span>
              </Link>
            </li>
          ) : (
            <>
              {/* <span className="ml-2 truncate text-xs md:text-sm max-w-[140px] sm:max-w-[200px] block">{session.user?.email}</span> */}
              <li className="relative group">
                <button
                  className="flex items-center gap-x-2 px-3 py-1 rounded hover:bg-blue-700 transition"
                  title="Tài khoản"
                >
                  <FaRegUser className="text-white" />
                  <span className="hidden sm:inline">Profile</span>
                  <svg
                    className="w-3 h-3 ml-1 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <ul className="absolute right-0 top-full mt-2 w-48 bg-white text-blue-700 rounded-md shadow-lg border border-blue-100 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-all z-50 overflow-hidden">
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-blue-50 transition"
                    >
                      Thông tin cá nhân
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-red-600 transition"
                    >
                      Đăng xuất
                    </button>
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
