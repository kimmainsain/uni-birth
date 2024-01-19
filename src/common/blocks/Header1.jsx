import React from "react";

const Header1 = ({ buttons }) => {
  return (
    <div className=" h-flex flex-row space-x-4 px-2 py-4">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              key={index}
              className="w-10 font-Pretendard text-white"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </div>
  );
};

export default Header1;
