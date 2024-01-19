import React, { useRef } from "react";

const CustomConfirm = ({ message, isVisible, onClose, onConfirm }) => {
  const ref = useRef(null);

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
      <div
        ref={ref}
        className="flex flex-col rounded-md border-2 bg-slate-800 bg-opacity-100 p-5 shadow-lg"
      >
        <p className="mb-3 flex items-center justify-center text-center text-white">
          {message}
        </p>
        <div className="flex flex-row justify-center space-x-4">
          <button
            className="my-auto inline-flex w-12 items-center justify-center rounded-xl border p-2 text-white"
            onClick={onConfirm}
          >
            확인
          </button>
          <button
            className="my-auto inline-flex w-12 items-center justify-center rounded-xl border p-2 text-white"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
