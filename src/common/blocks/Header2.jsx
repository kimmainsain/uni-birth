import React from "react"; // useState

const Header2 = ({ buttons }) => {
  return (
    <div className="flex justify-between space-x-4 px-2 py-4">
      <div className="flex items-center">
        {buttons &&
          buttons.map((button, index) => {
            const ButtonComponent = button.component;
            return (
              <ButtonComponent
                key={index}
                className="w-10 font-Pretendard"
                value={button.value}
                onClick={button.onClick}
                icon={button.icon}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Header2;
