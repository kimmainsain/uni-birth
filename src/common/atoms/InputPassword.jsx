import React, { useState } from "react";

const InputPassword = ({ onChange }) => {
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length < 4 && newPassword.length > 0) {
      setError("비밀번호는 최소 4자리 이상이어야 합니다.");
    } else if (newPassword.length >= 12) {
      setError("비밀번호는 최대 12자리까지 가능합니다.");
    } else {
      setError("");
    }
    onChange(e);
  };

  return (
    <div className="mr-2 flex w-1/2 items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="password"
          className="inline-block w-20 font-bold text-gray-200"
        >
          비밀번호
        </label>
        <div className="mt-2">
          <input
            className="w-full flex-1 flex-row border-b-2 border-gray-400 bg-transparent py-2 text-white 
          placeholder-gray-400 outline-none
          focus:border-purple-400"
            type="password"
            id="password"
            name="password"
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
            autoComplete="off"
            maxLength={12}
            minLength={4}
          />
          {/* 에러 메시지 또는 투명한 텍스트를 항상 표시 */}
          <div className="mt-2 text-red-500">
            {error || <span style={{ opacity: 0 }}>Placeholder</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
