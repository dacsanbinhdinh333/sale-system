"use client";

import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface AddToWishlistBtnProps {
  product: Product;
  slug: string;
}

const AddToWishlistBtn = ({ product, slug }: AddToWishlistBtnProps) => {
  const { data: session, status } = useSession();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const [isProductInWishlist, setIsProductInWishlist] = useState<boolean>();

  const addToWishlistFun = async () => {
    // getting user by email so I can get his user id
    if (session?.user?.email) {
      // sending fetch request to get user id because we will need it for saving wish item
      fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) =>
          fetch("http://localhost:3001/api/wishlist", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product?.id, userId: data?.id }),
          })
            .then((response) => response.json())
            .then((data) => {
              addToWishlist({
                id: product?.id,
                title: product?.title,
                price: product?.price,
                image: product?.mainImage,
                slug: product?.slug,
                stockAvailabillity: product?.inStock,
              });
              toast.success("Product added to the wishlist");
            })
        );
    } else {
      toast.error("You need to be logged in to add a product to the wishlist");
    }
  };

  const removeFromWishlistFun = async () => {
    if (session?.user?.email) {
      // sending fetch request to get user id because we will need to delete wish item
      fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          return fetch(
            `http://localhost:3001/api/wishlist/${data?.id}/${product?.id}`,
            {
              method: "DELETE",
            }
          );
        })
        .then((response) => {
          removeFromWishlist(product?.id);
          toast.success("Product removed from the wishlist");
        });
    }
  };

  const isInWishlist = async () => {
    // sending fetch request to get user id because we will need it for cheching whether the product is in wishlist
    if (session?.user?.email) {
      fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          // checking is product in wishlist
          return fetch(
            `http://localhost:3001/api/wishlist/${data?.id}/${product?.id}`
          );
        })
        .then((response) => response.json())
        .then((data) => {
          if (data[0]?.id) {
            setIsProductInWishlist(() => true);
          } else {
            setIsProductInWishlist(() => false);
          }
        });
    }
  };

  useEffect(() => {
    isInWishlist();
  }, [session?.user?.email, wishlist]);

  return (
    <div className="flex items-center gap-2 mt-4">
      {isProductInWishlist ? (
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors border border-red-300 shadow-sm text-red-600 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-red-400"
          onClick={removeFromWishlistFun}
        >
          <FaHeartCrack className="text-xl text-red-500" />
          <span>XÓA KHỎI DANH SÁCH YÊU THÍCH</span>
        </button>
      ) : (
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors border border-blue-300 shadow-sm text-blue-700 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={addToWishlistFun}
        >
          <FaHeart className="text-xl text-blue-500" />
          <span>THÊM VÀO DANH SÁCH YÊU THÍCH</span>
        </button>
      )}
    </div>
  );
};

export default AddToWishlistBtn;
