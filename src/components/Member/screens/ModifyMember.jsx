import React, { useEffect, useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import ModifyFormMember from "../blocks/ModifyFormMember";
import { useNavigation } from "../../../hooks/useNavigation";
import useMemberApi from "../../../api/useMemberApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import CustomAlert from "../../../common/atoms/CustomAlert";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nicknameState, backgroundflagState } from "../../../recoil/atoms";
const RegisterMember = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const nickname = useRecoilValue(nicknameState);

  const modifyMember = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsAlertVisible(true);
      setAlertMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await useMemberApi.membersPutUpdate(password);
      if (response.status === 200) {
        setIsAlertVisible(true);
        setAlertMessage(response.message);
      } else {
        setIsAlertVisible(true);
        setAlertMessage(`${response.message}`);
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("비밀번호 변경에 실패하였습니다.");
    }
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];
  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "비밀번호 변경",
      onClick: modifyMember,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "비밀번호 변경이 완료되었습니다.") {
            navigateToMemberProfile(nickname);
          }
        }}
      />

      <div>
        <Header1 buttons={buttonsHeader} />
        <form className="justify-center">
          <ModifyFormMember
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        </form>
      </div>
      <div className="mx-10">
        <Footer1
          buttons={buttonsFooter}
          password={password}
          confirmPassword={confirmPassword}
          joinMember={modifyMember}
        />
      </div>
    </div>
  );
};

export default RegisterMember;
