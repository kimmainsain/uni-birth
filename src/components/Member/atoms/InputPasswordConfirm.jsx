import React from "react";

const InputPasswordConfirm = ({ onChange }) => {
  return (
    <div className="ml-2 flex w-1/2 items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="confirmPassword"
          className="inline-block w-24 font-bold text-gray-200"
        >
          비밀번호 확인
        </label>
        <div className="mt-2">
          <input
            className="w-full flex-1 border-b-2 border-gray-400 bg-transparent py-2 text-white  
        placeholder-gray-400 outline-none
        focus:border-purple-400"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
            placeholder="비밀번호 확인"
            autoComplete="off"
            maxLength={12}
            minLength={4}
          />
          <div className="mt-2 text-red-500">
            {<span style={{ opacity: 0 }}>Placeholder</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPasswordConfirm;
