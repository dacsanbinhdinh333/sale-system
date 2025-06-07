"use client";
import { CustomButton, DashboardSidebar, SectionTitle } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName,
} from "../../../../../utils/categoryFormating";
import { nanoid } from "nanoid";

interface DashboardProductDetailsProps {
  params: { id: number };
}

const DashboardProductDetails = ({
  params: { id },
}: DashboardProductDetailsProps) => {
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const router = useRouter();

  // functionality for deleting product
  const deleteProduct = async () => {
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status !== 204) {
          if (response.status === 400) {
            toast.error(
              "Cannot delete the product because of foreign key constraint"
            );
          } else {
            throw Error("There was an error while deleting product");
          }
        } else {
          toast.success("Product deleted successfully");
          router.push("/admin/products");
        }
      })
      .catch((error) => {
        toast.error("There was an error while deleting product");
      });
  };

  // functionality for updating product
  const updateProduct = async () => {
    if (
      product?.title === "" ||
      product?.slug === "" ||
      product?.price.toString() === "" ||
      product?.manufacturer === "" ||
      product?.description === ""
    ) {
      toast.error("You need to enter values in input fields");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`http://localhost:3001/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw Error("There was an error while updating product");
        }
      })
      .then((data) => toast.success("Product successfully updated"))
      .catch((error) => {
        toast.error("There was an error while updating product");
      });
  };

  // functionality for uploading main image file
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("http://localhost:3001/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        toast.error("File upload unsuccessful.");
      }
    } catch (error) {
      console.error("There was an error while during request sending:", error);
      toast.error("There was an error during request sending");
    }
  };

  // fetching main product data including other product images
  const fetchProductData = async () => {
    fetch(`http://localhost:3001/api/products/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      });

    const imagesData = await fetch(`http://localhost:3001/api/images/${id}`, {
      cache: "no-store",
    });
    const images = await imagesData.json();
    setOtherImages((currentImages) => images);
  };

  // fetching all product categories. It will be used for displaying categories in select category input
  const fetchCategories = async () => {
    fetch(`http://localhost:3001/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-8 xl:ml-5 w-full max-xl:px-4">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 mt-4 max-md:text-2xl uppercase tracking-wide">
          Chi tiết sản phẩm
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Cột trái: Thông tin cơ bản */}
          <div className="flex flex-col gap-y-5">
            {/* Product name */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Tên sản phẩm</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.title}
                onChange={(e) =>
                  setProduct({ ...product!, title: e.target.value })
                }
              />
            </label>
            {/* Product price */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Giá</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.price}
                onChange={(e) =>
                  setProduct({ ...product!, price: Number(e.target.value) })
                }
              />
            </label>
            {/* Manufacturer */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Hãng sản xuất</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.manufacturer}
                onChange={(e) =>
                  setProduct({ ...product!, manufacturer: e.target.value })
                }
              />
            </label>
            {/* Slug */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Slug</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.slug && convertSlugToURLFriendly(product?.slug)}
                onChange={(e) =>
                  setProduct({
                    ...product!,
                    slug: convertSlugToURLFriendly(e.target.value),
                  })
                }
              />
            </label>
            {/* In stock */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Còn hàng?</span>
              </div>
              <select
                className="select select-bordered"
                value={product?.inStock}
                onChange={(e) => {
                  setProduct({ ...product!, inStock: Number(e.target.value) });
                }}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </select>
            </label>
            {/* Category */}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Danh mục</span>
              </div>
              <select
                className="select select-bordered"
                value={product?.categoryId}
                onChange={(e) =>
                  setProduct({
                    ...product!,
                    categoryId: e.target.value,
                  })
                }
              >
                {categories &&
                  categories.map((category: Category) => (
                    <option key={category?.id} value={category?.id}>
                      {formatCategoryName(category?.name)}
                    </option>
                  ))}
              </select>
            </label>
          </div>
          {/* Cột phải: Ảnh và mô tả */}
          <div className="flex flex-col gap-y-5">
            {/* Main image upload */}
            <div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-lg w-full max-w-sm"
                onChange={(e) => {
                  const selectedFile = e?.target?.files?.[0];

                  if (selectedFile) {
                    uploadFile(selectedFile);
                    setProduct({ ...product!, mainImage: selectedFile.name });
                  }
                }}
              />
              {product?.mainImage && (
                <Image
                  src={`/${product?.mainImage}`}
                  alt={product?.title}
                  className="w-auto h-auto mt-2 rounded-lg shadow"
                  width={120}
                  height={120}
                />
              )}
            </div>
            {/* Other images */}
            <div className="flex gap-x-2 flex-wrap">
              {otherImages &&
                otherImages.map((image) => (
                  <Image
                    src={`/${image.image}`}
                    key={nanoid()}
                    alt="product image"
                    width={80}
                    height={80}
                    className="w-auto h-auto rounded shadow"
                  />
                ))}
            </div>
            {/* Description */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Mô tả sản phẩm</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-32"
                value={product?.description}
                onChange={(e) =>
                  setProduct({ ...product!, description: e.target.value })
                }
              ></textarea>
            </label>
          </div>
        </div>
        {/* Action buttons */}
        <div className="flex gap-x-4 max-sm:flex-col mt-4">
          <button
            type="button"
            onClick={updateProduct}
            className="uppercase bg-blue-500 px-10 py-3 text-base border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 rounded-lg transition-colors duration-200"
          >
            Cập nhật
          </button>
          <button
            type="button"
            onClick={deleteProduct}
            className="uppercase bg-red-600 px-10 py-3 text-base border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 rounded-lg transition-colors duration-200"
          >
            Xóa sản phẩm
          </button>
        </div>
        <p className="text-base text-error mt-2">
          Để xóa sản phẩm, bạn cần xóa tất cả các bản ghi liên quan trong đơn hàng
          (customer_order_product table).
        </p>
      </div>
    </div>
  );
};

export default DashboardProductDetails;
