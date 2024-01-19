import React from "react";

const Button7 = ({ value, onClick, className, icon, disabled }) => {
  return (
    <button
      className={`mx-auto my-auto inline-flex w-36 items-center justify-center rounded-full border border p-2 text-white ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button7;
