import React from "react";
const InputIntroduction = ({ value, onChange }) => {
  return (
    <div className="flex w-full items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="introduction"
          className="inline-block w-20 
          font-bold text-gray-200"
        >
          소개
        </label>
        <div className="mt-2 w-full">
          <input
            className="w-full flex-1 border-b-2 border-gray-400 bg-transparent py-2 text-white 
            placeholder-gray-400 outline-none
            focus:border-purple-400"
            type="text"
            id="introduction"
            name="introduction"
            onChange={onChange}
            autoComplete="off"
            value={value}
            maxLength={14}
          />
        </div>
      </div>
    </div>
  );
};

export default InputIntroduction;
