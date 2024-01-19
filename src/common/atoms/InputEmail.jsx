import React from "react";
const InputEmail = ({ value, onChange, rememberId, setRememberId }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center font-Pretendard">
      <div className="flex w-full flex-row items-center justify-between space-x-2">
        <label
          htmlFor="email"
          className="inline-block w-20 
          font-bold text-gray-200"
        >
          이메일
        </label>
        <div className="flex flex-row">
          <input
            className=" text-white accent-purple-500"
            type="checkbox"
            checked={rememberId}
            onChange={(e) => setRememberId(e.target.checked)}
            autoComplete="off"
          />
          <label className="text-md ml-2 text-white">이메일 저장</label>
        </div>
      </div>
      <div className="mt-2 flex w-full">
        <input
          className="w-full border-b-2 border-gray-400 bg-transparent py-2 text-white 
          placeholder-gray-400 outline-none
          focus:border-purple-400"
          type="email"
          id="email"
          name="email"
          value={value}
          onChange={onChange}
          maxLength={25}
          minLength={5}
          placeholder="이메일을 입력하세요"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default InputEmail;
