import React from "react";
import InputPassword from "../../../common/atoms/InputPassword";
import InputPasswordConfirm from "../atoms/InputPasswordConfirm";
const MemberModifyForm = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <div className="mx-10 mb-10 mt-72 flex-col items-center justify-center space-y-5">
      <div className="flex flex-row">
        <InputPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputPasswordConfirm
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MemberModifyForm;
