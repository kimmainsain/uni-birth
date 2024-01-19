import React, { useEffect, useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  nicknameState,
  boardSizeState,
  backgroundflagState,
  starCountState,
  constellationLimitState,
} from "../../../recoil/atoms";
import LoginFormMember from "../blocks/LoginFormMember";
import useMemberApi from "../../../api/useMemberApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import CustomAlert from "../../../common/atoms/CustomAlert";

const LoginMember = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [nickname, setNickname] = useRecoilState(nicknameState);
  // eslint-disable-next-line no-unused-vars
  const [boardSize, setBoardSize] = useRecoilState(boardSizeState);
  const setStarCount = useSetRecoilState(starCountState);
  const setConstellationLimit = useSetRecoilState(constellationLimitState);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const { navigateToBack, navigateToRegisterMember, navigateToMainPlanet } =
    useNavigation();
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberId(true);
    }
  }, []);

  const handleLogin = async () => {
    const member = {
      email,
      password,
    };
    try {
      const response = await useMemberApi.membersPostLogin(member);
      if (response.status === 200) {
        if (rememberId) {
          localStorage.setItem("savedEmail", email);
        } else {
          localStorage.removeItem("savedEmail");
        }
        sessionStorage.setItem("accessToken", response.resultData.accessToken);
        setBoardSize(response.resultData.purchasedBoard);
        setNickname(response.resultData.nickname);
        setStarCount(response.resultData.starCount);
        setConstellationLimit(response.resultData.constellationLimit);
        navigateToMainPlanet();
      } else {
        setIsAlertVisible(true);
        setAlertMessage(`${response.message}`);
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("로그인에 실패하였습니다.");
    }
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-Pretendard",
      value: "",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];
  const buttonsFooter = [
    {
      component: Button1,
      className: "font-Pretendard",
      value: "로그인",
      onClick: handleLogin,
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "회원가입",
      onClick: navigateToRegisterMember,
    },
  ];
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // 엔터 키로 바로 handleLogin 호출
    }
  };
  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
      <div>
        <Header1 buttons={buttonsHeader} />
        <form className="justify-center">
          <LoginFormMember
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onKeyDown={handleKeyDown}
            rememberId={rememberId}
            setRememberId={setRememberId}
          />
        </form>
      </div>
      <div className="mx-10">
        <Footer1 buttons={buttonsFooter} email={email} password={password} />
      </div>
    </div>
  );
};

export default LoginMember;
