"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  // getting all wishlist items by user id
  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`http://localhost:3001/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug: string
      stockAvailabillity: number;
    }[] = [];

    wishlist.map((item: any) => productArray.push({ id: item?.product?.id, title: item?.product?.title, price: item?.product?.price, image: item?.product?.mainImage, slug: item?.product?.slug, stockAvailabillity: item?.product?.inStock }));

    setWishlist(productArray);
  };

  // getting user by email so I can get his user id
  const getUserByEmail = async () => {
    if (session?.user?.email) {

      fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <HeaderTop />
      {pathname.startsWith("/admin") === false && (
        <div className="h-28 bg-white flex items-center justify-between px-8 md:px-16 max-w-screen-2xl mx-auto transition-all duration-300 max-lg:flex-col max-lg:gap-y-5 max-lg:justify-center max-lg:h-auto py-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo-v1.png" width={180} height={60} alt="logo" className="w-44 md:w-56 h-auto object-contain" />
          </Link>
          <div className="flex-1 flex justify-center w-full max-w-xl mx-4 max-lg:mx-0 max-lg:w-full">
            <SearchInput />
          </div>
          <div className="flex gap-x-6 md:gap-x-10 items-center mt-0 max-lg:mt-4">
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
          </div>
        </div>
      )}
      {pathname.startsWith("/admin") === true && (
        <div className="flex justify-between items-center h-24 bg-white px-4 md:px-10 lg:px-16 max-w-screen-2xl mx-auto border-b border-gray-100">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-v1.png"
              width={120}
              height={40}
              alt="logo"
              className="w-32 md:w-44 h-auto object-contain"
            />
          </Link>
          <div className="flex gap-x-4 md:gap-x-8 items-center">
            <FaBell className="text-xl md:text-2xl text-blue-600 hover:text-blue-800 transition-colors cursor-pointer" />
            <div className="dropdown dropdown-end relative">
              <div tabIndex={0} role="button" title="Tài khoản" className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 shadow hover:shadow-lg transition-all cursor-pointer bg-white">
                <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content absolute right-0 mt-2 z-50 menu p-2 shadow-lg bg-white rounded-xl w-48 border border-gray-100 animate-fade-in"
              >
                <li>
                  <Link href="/admin" className="block px-4 py-2 hover:bg-blue-50 rounded-lg transition">Dashboard</Link>
                </li>
                <li>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-blue-50 rounded-lg transition">Profile</Link>
                </li>
                <li onClick={handleLogout}>
                  <a className="block px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
