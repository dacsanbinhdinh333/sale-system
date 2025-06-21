"use client";
import { CustomButton } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  // const session = useSession();
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    // if user has already logged in redirect to home page
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmailAddressFormat(email)) {
      setError("Email không hợp lệ");
      return;
    }

    if (!password || password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email hoặc mật khẩu không đúng");
    } else {
      setError("");
      toast.success("Đăng nhập thành công");
    }
  };

  if (sessionStatus === "loading") {
    return <h1 className="text-center text-blue-600 text-2xl font-semibold mt-10">Đang tải...</h1>;
  }
  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-200 min-h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-blue-700 drop-shadow mb-2">
            Đăng nhập vào tài khoản
          </h2>
          <p className="text-gray-600 text-center text-base mb-4">Nhập thông tin để tiếp tục mua sắm và sử dụng dịch vụ</p>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-8 py-10 shadow-xl rounded-2xl border border-blue-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-700">Email</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="Nhập email" className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base" />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-700">Mật khẩu</label>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Nhập mật khẩu" className="block w-full rounded-lg border border-blue-200 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 sm:text-base" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">Nhớ mật khẩu</label>
                </div>
                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-blue-600 hover:underline">Quên mật khẩu?</a>
                </div>
              </div>
              <div>
                <CustomButton buttonType="submit" text="Đăng nhập" paddingX={3} paddingY={1.5} customWidth="full" textSize="base" />
                <p className="text-red-600 text-center text-base my-4 min-h-[24px]">{error && error}</p>
              </div>
            </form>
            <div className="mt-6 text-center">
              <span className="text-gray-600">Chưa có tài khoản?</span>
              <button onClick={() => router.push('/register')} className="ml-2 text-blue-600 font-semibold hover:underline">Đăng ký</button>
            </div>
            <div className="relative mt-10">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Hoặc đăng nhập bằng</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => { signIn("google"); }}>
                <FcGoogle />
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]" onClick={() => { signIn("github"); }}>
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold leading-6">GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
