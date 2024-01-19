import React, { useEffect, useRef } from "react";

const CustomAlert = ({ message, isVisible, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div
        ref={ref}
        className="z-10 flex flex-col rounded-md border border-2  border-opacity-25 bg-slate-800 p-5 shadow-lg"
      >
        <p className="mb-3 flex items-center justify-center text-center text-white">
          {message}
        </p>
        <button
          className="mx-auto my-auto inline-flex w-16 items-center justify-center rounded-full border border p-2 text-white "
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
