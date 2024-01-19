import React, { useRef } from "react";

const PickConstellationColor = ({
  constellationColor,
  setconstellationColor,
}) => {
  const inputRef = useRef(null);

  const handleCircleClick = () => {
    inputRef.current.click();
  };

  const handleColorChange = (event) => {
    setconstellationColor(event.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="color"
        ref={inputRef}
        value={constellationColor}
        onChange={handleColorChange}
        className="hidden"
      />
      <div
        onClick={handleCircleClick}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full"
        style={{ backgroundColor: constellationColor }}
      >
        색상
      </div>
    </div>
  );
};

export default PickConstellationColor;
