import React from "react";

const Footer1 = ({ buttons }) => {
  return (
    <footer className="bold-text mt-10 flex flex-row items-center justify-between space-x-3">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;

          return (
            <ButtonComponent
              key={index}
              className="mt-24 w-28 font-Pretendard"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </footer>
  );
};

export default Footer1;
