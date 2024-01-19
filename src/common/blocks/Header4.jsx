import React from "react";
import { BsX } from "react-icons/bs";

const Header4 = ({ buttons, isModalOpen, setIsModalOpen }) => {
  return (
    <div>
      <div className="z-70 relative">
        <button
          className="absolute right-0 top-0 text-2xl text-white"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <BsX />
        </button>
        <div className="z-60 flex flex-col px-2 py-4">
          {buttons &&
            buttons.map((button, index) => {
              const ButtonComponent = button.component;
              return (
                <ButtonComponent
                  key={index}
                  className="m-2 w-40 p-2 font-Pretendard"
                  value={button.value}
                  onClick={button.onClick}
                  icon={button.icon}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Header4;
