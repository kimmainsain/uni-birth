import React from "react";

const Header3 = ({ buttons }) => {
  const ButtonComponent = buttons[0] && buttons[0].component;

  return (
    <div className="flex justify-between space-x-4 px-2 py-4">
      <div className="flex items-center">
        {ButtonComponent && (
          <ButtonComponent
            className="w-10 font-Pretendard"
            onClick={buttons[0].onClick}
            icon={buttons[0].icon}
            value={buttons[0].value}
          />
        )}
      </div>
      <div className="flex items-center space-x-4">
        {buttons.slice(1).map((button, index) => {
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
    </div>
  );
};

export default Header3;
