"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [editName, setEditName] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="text-center py-10 text-blue-600 font-semibold text-xl">
        Đang tải thông tin...
      </div>
    );
  }
  if (!session) return null;

  const handleSaveName = async () => {
    setSaving(true);
    // TODO: Gọi API cập nhật tên ở đây
    setTimeout(() => {
      setEditName(false);
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-extrabold mb-10 text-blue-700 flex items-center gap-2">
        Thông tin cá nhân
      </h1>

      <div className="bg-white bg-opacity-80 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-blue-100">
        <InfoRow label="Email:">
          <span className="text-gray-900 text-base break-all">{session.user?.email}</span>
        </InfoRow>

        <InfoRow label="Tên hiển thị:">
          {editName ? (
            <div className="flex items-center gap-2 w-full max-w-md">
              <input
                className="border border-blue-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white flex-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saving}
                placeholder="Nhập tên hiển thị"
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 font-medium shadow"
                onClick={handleSaveName}
                disabled={saving || !name.trim()}
              >
                {saving ? "Đang lưu..." : "Lưu"}
              </button>
              <button
                className="text-gray-400 hover:text-red-500 text-xl"
                onClick={() => setEditName(false)}
                disabled={saving}
                title="Hủy"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-gray-900 text-base flex-1">{session.user?.name || "Chưa cập nhật"}</span>
              <button
                className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-full p-2 transition shadow"
                onClick={() => setEditName(true)}
                title="Sửa tên hiển thị"
              >
                <FaRegEdit />
              </button>
            </div>
          )}
        </InfoRow>

        <InfoRow label="Ngày tạo tài khoản:">
          <span className="text-gray-500 italic">Chưa hỗ trợ</span>
        </InfoRow>
        <InfoRow label="Số điện thoại:">
          <span className="text-gray-500 italic">Chưa cập nhật</span>
        </InfoRow>
        <InfoRow label="Địa chỉ:">
          <span className="text-gray-500 italic">Chưa cập nhật</span>
        </InfoRow>
      </div>
    </div>
  );
};

const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
    <span className="font-medium text-gray-700 min-w-[160px]">{label}</span>
    <div className="flex-1">{children}</div>
  </div>
);

export default ProfilePage;
