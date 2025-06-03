"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="text-center py-10 text-blue-600 font-semibold text-xl">Đang tải thông tin...</div>;
  }

  if (!session) return null;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Thông tin cá nhân</h1>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
        <div>
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="ml-2 text-gray-900">{session.user?.email}</span>
        </div>
        <div>
          <span className="font-semibold text-gray-700">Tên hiển thị:</span>
          <span className="ml-2 text-gray-900">{session.user?.name || "Chưa cập nhật"}</span>
        </div>
        {/* Thêm các trường thông tin khác nếu có */}
      </div>
    </div>
  );
};

export default ProfilePage;
