import React from "react";

const InputImage = ({ setImageUrl, setThumbUrl, onChange }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
      setThumbUrl(URL.createObjectURL(file));
    }
  };
  return (
    <div className="flex flex-col content-center items-center justify-center font-Pretendard">
      <input
        type="file"
        name="profileimage"
        id="profileimage"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <label
        htmlFor="profileimage"
        className="mx-auto flex cursor-pointer items-center rounded  text-white"
      >
        별 이미지 변경
      </label>
    </div>
  );
};

export default InputImage;
