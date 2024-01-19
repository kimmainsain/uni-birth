import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ value, onChange, searchList }) => {
  // valie 처음 값, onchange 값이 바뀔때마다 실행되는 함수, searchList 검색할 리스트
  const [isOpen, setIsOpen] = useState(false);
  const toggleContainer = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      toggleContainer.current &&
      !toggleContainer.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex w-16 flex-col items-center justify-end rounded-lg border-double bg-transparent font-Pretendard text-white"
      ref={toggleContainer}
    >
      <div className="relative w-full text-white">
        <button
          className="w-16 bg-transparent p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value}
        </button>
        <div
          className={`absolute mt-2 rounded-lg ${
            isOpen
              ? "visible opacity-100 transition-all duration-300 ease-out"
              : "invisible opacity-0 transition-all duration-300 ease-out"
          }`}
        >
          {isOpen && (
            <div className="absolute mt-2 w-16 rounded-lg border bg-slate-800 bg-opacity-100 ">
              {searchList.map(
                (option) =>
                  option.name !== value && (
                    <div
                      className="cursor-pointer p-2 
                      "
                      key={option.name}
                      onClick={() => {
                        onChange(option.name); // 선택된 값을 부모 컴포넌트에 전달
                        setIsOpen(false);
                      }}
                    >
                      {option.name}
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;
