"use client";
import { CustomButton, SectionTitle } from "@/components";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    // chechking if user has already registered redirect to home page
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target[0].value;
    const lastname = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const confirmPassword = e.target[4].value;

    if (!isValidEmail(email)) {
      setError("Email không hợp lệ");
      toast.error("Email không hợp lệ");
      return;
    }

    if (!password || password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      toast.error("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    if (confirmPassword !== password) {
      setError("Mật khẩu xác nhận không khớp");
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          password,
        }),
      });

      if (res.status === 400) {
        toast.error("Email đã được đăng ký");
        setError("Email đã được đăng ký");
      }
      if (res.status === 200) {
        setError("");
        toast.success("Đăng ký thành công");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
      setError("Có lỗi xảy ra, vui lòng thử lại");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <h1 className="text-center text-blue-600 text-2xl font-semibold mt-10">Đang tải...</h1>;
  }
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 min-h-screen">
      {/* <SectionTitle title="Đăng ký tài khoản" path="Trang chủ | Đăng ký" /> */}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center flex-col items-center">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-blue-700 drop-shadow mb-2">
            Tạo tài khoản mới
          </h2>
          <p className="text-gray-600 text-center text-base mb-4">
            Đăng ký để mua hàng và nhận ưu đãi từ chúng tôi
          </p>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-8 py-10 shadow-xl rounded-2xl border border-blue-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-blue-700"
                >
                  Họ
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Nhập họ của bạn"
                    className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-blue-700"
                >
                  Tên
                </label>
                <div className="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    required
                    placeholder="Nhập tên của bạn"
                    className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-700"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Nhập email"
                    className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-blue-700"
                >
                  Mật khẩu
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="Nhập mật khẩu"
                    className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block text-sm font-medium text-blue-700"
                >
                  Nhập lại mật khẩu
                </label>
                <div className="mt-2">
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="Nhập lại mật khẩu"
                    className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Tôi đồng ý với{" "}
                  <a
                    href="#"
                    className="text-blue-600 underline"
                  >
                    chính sách bảo mật
                  </a>
                </label>
              </div>
              <div>
                <CustomButton
                  buttonType="submit"
                  text="Đăng ký"
                  paddingX={3}
                  paddingY={1.5}
                  customWidth="full"
                  textSize="base"
                />
                <p className="text-red-600 text-center text-base my-4 min-h-[24px]">
                  {error && error}
                </p>
              </div>
            </form>
            <div className="mt-6 text-center">
              <span className="text-gray-600">Đã có tài khoản?</span>
              <button
                onClick={() => router.push("/login")}
                className="ml-2 text-blue-600 font-semibold hover:underline"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
