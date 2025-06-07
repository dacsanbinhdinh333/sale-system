// *********************
// Role of the component: Product item component 
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Product item component that contains product image, title, link to the single product page, price, button...
// *********************

import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2 bg-white rounded-lg shadow-lg p-4 w-full max-w-xs min-h-[480px]">
      <Link href={`/product/${product.slug}`} className="w-full flex justify-center">
        <Image
          src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
          width={250}
          height={250}
          sizes="100vw"
          className="object-cover rounded-md w-full h-[200px]"
          alt={product?.title}
        />
      </Link>
      <Link
        href={`/product/${product.slug}`}
        className={
          color === "black"
            ? `text-xl text-black font-semibold mt-2 uppercase text-center w-full min-h-[56px] flex items-center justify-center line-clamp-2`
            : `text-xl text-blue-700 font-semibold mt-2 uppercase text-center w-full min-h-[56px] flex items-center justify-center line-clamp-2`
        }
      >
        {product.title}
      </Link>
      <p
        className={
          color === "black"
            ? "text-lg text-black font-bold text-center w-full"
            : "text-lg text-blue-700 font-bold text-center w-full"
        }
      >
        ${product.price}
      </p>
      <div className="my-2">
        <ProductItemRating productRating={product?.rating} />
      </div>
      <div className="mt-auto w-full">
        <Link
          href={`/product/${product?.slug}`}
          className="block w-full text-center uppercase bg-blue-500 px-0 py-2 text-base border border-blue-700 font-bold text-white shadow-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
        >
          <p>Xem chi tiết</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
