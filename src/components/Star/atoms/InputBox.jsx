import React from "react";

const InputBox = ({ content, setContent }) => {
  return (
    <div className="flex h-40 w-80 flex-row justify-center">
      <div className="flex flex-col">
        <div className="flex justify-center text-white">
          <label htmlFor="text">내용 </label>
        </div>
        <textarea
          className="focus:shadow-outline ease-in-outfocus:border-purple-500 mb-1 flex h-80 w-52 transform items-center justify-center rounded-lg border bg-transparent bg-opacity-75 py-2 text-center text-base text-black text-white ring-offset-2 ring-offset-current transition duration-500 focus:outline-none
          focus:ring-2
          "
          type="text"
          id="text"
          name="text"
          value={content}
          maxLength={100}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력해주세요!"
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default InputBox;
