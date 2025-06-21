import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import { fetchProducts } from "@/utils/api";

const ProductsSection = async () => {
  let products = [];
  try {
    products = await fetchProducts();
  } catch (error) {
    // Xử lý lỗi nếu cần
  }
  return (
    <div className="bg-blue-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="ĐẶC SẢN NỔI BẬC" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} color="white" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
