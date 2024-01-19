import React from "react";

const InputStella = ({ constellationName, setConstellationName }) => {
  // 글자수 제한 필요합니다.

  return (
    <div className="flex flex-col items-center justify-center border-b-2">
      <label
        htmlFor="constellationName"
        className="inline-block w-20 
          text-center font-bold text-gray-200"
      >
        별자리
      </label>
      <div className="w-full">
        <div className=" flex flex-row items-center justify-center">
          <input
            type="text"
            id="constellationName"
            name="constellationName"
            value={constellationName}
            maxLength={8}
            className="bg-transparent py-2 text-center text-white outline-none "
            onChange={(e) => setConstellationName(e.target.value)}
            autoComplete="off"
          />
          <p className="text-sm text-white">자리</p>
        </div>
      </div>
    </div>
  );
};

export default InputStella;
