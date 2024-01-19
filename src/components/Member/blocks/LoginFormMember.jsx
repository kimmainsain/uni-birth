import React, { useEffect } from "react";
import InputEmail from "../../../common/atoms/InputEmail";
import InputPassword from "../../../common/atoms/InputLoginPassword";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onKeyDown,
  rememberId,
  setRememberId,
}) => {
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail && rememberId) {
      setEmail(savedEmail);
    }
  }, [rememberId]);
  return (
    <div className="mx-10 mb-10 mt-60 flex-col items-center justify-center space-y-5">
      <InputEmail
        type="email"
        value={email}
        className="w-full"
        onChange={(e) => setEmail(e.target.value)}
        rememberId={rememberId}
        setRememberId={setRememberId}
      />
      <InputPassword
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default LoginForm;
