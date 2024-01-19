import React from "react";

const InputImage = ({ setImageUrl }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-2 font-Pretendard">
      <label htmlFor="profileimage">프로필 이미지</label>
      <input
        className=" w-52 border border-gray-300"
        type="file"
        name="profileimage"
        id="profileimage"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default InputImage;
