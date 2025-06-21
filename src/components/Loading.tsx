import React from "react";

const Loading = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        <span className="ml-4 text-xl font-semibold text-blue-700">Đang tải...</span>
    </div>
);

export default Loading;
