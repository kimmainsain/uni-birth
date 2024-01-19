import React from "react";

const Header5 = ({ buttons }) => {
  return (
    <footer className="flex flex-row items-center justify-between">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;

          return (
            <ButtonComponent
              key={index}
              className="font-Pretendard"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </footer>
  );
};

export default Header5;
