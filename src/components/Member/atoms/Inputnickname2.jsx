import React, { useState } from "react";

const Inputnickname = ({ onChange }) => {
  const [error, setError] = useState("");
  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    if (newNickname.length < 2 && newNickname.length > 0) {
      setError("닉네임은 최소 2자리 이상이어야 합니다.");
    } else if (newNickname.length >= 8) {
      setError("닉네임은 최대 8자리까지 가능합니다.");
    } else {
      setError("");
    }
    onChange(e);
  };

  return (
    <div className="mr-2 flex w-1/2 items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="nickname"
          className="inline-block w-24 font-bold text-gray-200"
        >
          닉네임
        </label>
        <div className="mt-2">
          <input
            className="w-full flex-1 flex-row border-b-2 border-gray-400 bg-transparent py-2 text-white 
        placeholder-gray-400 outline-none
        focus:border-purple-400"
            type="text"
            name="nickname"
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력하세요"
            id="nickname"
            maxLength={8}
            minLength={2}
            autoComplete="off"
          />
          <div className="mt-2 text-red-500">
            {error || <span style={{ opacity: 0 }}>Placeholder</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputnickname;
