import React from "react";

const Footer2 = ({ buttons }) => {
  return (
    <footer className="mt-16 flex flex-row items-center justify-between space-x-4">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;

          return (
            <ButtonComponent
              key={index}
              className="h-20 w-20 font-Pretendard"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </footer>
  );
};

export default Footer2;
