import React from "react";

const Button5 = ({ value, onClick, className, icon }) => {
  return (
    <button
      className={`my-auto inline-flex items-center justify-center rounded-full border text-white ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button5;
