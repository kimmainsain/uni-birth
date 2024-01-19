import React from "react";

const Header7 = ({ buttons }) => {
  const LeftButtons = buttons.slice(0, 2);
  const RightButtons = buttons.slice(2);

  return (
    <div className="flex justify-between space-x-4 px-2 py-4">
      <div className="flex items-center">
        {LeftButtons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              className="w-10 font-Pretendard"
              key={index}
              onClick={button.onClick}
              icon={button.icon}
              value={button.value}
            />
          );
        })}
      </div>
      <div className="flex items-center space-x-4">
        {RightButtons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              className="w-16 font-Pretendard"
              key={index}
              onClick={button.onClick}
              icon={button.icon}
              value={button.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Header7;
