import React from "react";

const Footer1 = ({ buttons }) => {
  return (
    <footer className="flex flex-row items-center justify-between py-20">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;

          return (
            <ButtonComponent
              key={index}
              className="mt-6 w-36 font-Pretendard"
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
