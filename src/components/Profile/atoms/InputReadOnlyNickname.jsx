import React from "react";

const InputReadOnlyNickname = () => {
  return (
    <div className="w-full flex-initial items-center justify-center font-Pretendard">
      <div className="w-full flex-row">
        <label
          htmlFor="nickname"
          className="inline-block w-24 font-bold text-gray-200"
        >
          닉네임
        </label>
        <div className="mt-2 w-full flex-row">
          <input
            className="w-full flex-1 flex-row border-b-2 border-gray-400 bg-transparent py-2 text-white 
        placeholder-gray-400 outline-none
        focus:border-purple-400"
            type="text"
            name="nickname"
            autoComplete="off"
            id="nickname"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default InputReadOnlyNickname;
