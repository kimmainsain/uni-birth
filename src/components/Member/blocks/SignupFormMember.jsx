import React, { useCallback, useState } from "react";
import InputPassword from "../../../common/atoms/InputPassword";
import Inputnickname2 from "../atoms/Inputnickname2";
import InputPasswordConfirm from "../atoms/InputPasswordConfirm";
import InputEmail3 from "../../../common/atoms/InputEmail3";
import Button1 from "../../../common/atoms/Button1";
import useMemberApi from "../../../api/useMemberApi";
import InputZodiac from "../atoms/InputZodiac";
import { debounce } from "lodash";
import { Jodiac } from "../../../constants/zodiac";
// import { PLANET_LIST } from "../../../constants/constants";
import CustomAlert from "../../../common/atoms/CustomAlert";
import Inputdropdown from "../atoms/InputDropdown";

const MemberRegistrationForm = ({
  nickname,
  setNickname,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  zodiac,
  setZodiac,
  birthdate,
  setBirthdate,
  image,
  setImage,
  interest,
  setInterest,
}) => {
  const [content, setContent] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const isNicknameValid = (nickname) => {
    const regex = /^[a-zA-Z0-9가-힣]+$/;
    return regex.test(nickname);
  };

  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const [jodiacname, setJodiacname] = useState("당신의 별자리는?");
  const duplicateCheck = useCallback(async (type, value) => {
    if (value === "") {
      setIsAlertVisible(true);
      setAlertMessage("사용자 " + type + "을 입력해주세요.");
      return;
    }

    const checkFunc =
      type === "Email"
        ? useMemberApi.membersPostCheckEmail
        : useMemberApi.membersPostCheckNickname;

    const param = type === "Email" ? { email: value } : { nickname: value };

    try {
      const response = await checkFunc(param);

      if (response.status === 200) {
        setIsAlertVisible(true);
        setAlertMessage(`사용 가능한 ${type}입니다.`);
      } else if (response.status === 409) {
        setIsAlertVisible(true);
        setAlertMessage(`이미 사용중인 ${type}입니다.`);
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage(`사용자 ${type} 확인 중 오류가 발생했습니다.`);
    }
  }, []);

  const debouncedSetImage = useCallback(
    debounce((value) => {
      setImage(value);
      const [, month, day] = value.split("-");
      const birthdateAsNumber = parseInt(month + day, 10);
      if (birthdateAsNumber <= 120) {
        setImage(Jodiac[0].image);
        setContent("");
        setJodiacname(Jodiac[0].name);
      } else if (birthdateAsNumber <= 218) {
        setImage(Jodiac[1].image);
        setContent("");
        setJodiacname(Jodiac[1].name);
      } else if (birthdateAsNumber <= 320) {
        setImage(Jodiac[2].image);
        setContent("");
        setJodiacname(Jodiac[2].name);
      } else if (birthdateAsNumber <= 419) {
        setImage(Jodiac[3].image);
        setContent("");
        setJodiacname(Jodiac[3].name);
      } else if (birthdateAsNumber <= 520) {
        setImage(Jodiac[4].image);
        setContent("");
        setJodiacname(Jodiac[4].name);
      } else if (birthdateAsNumber <= 621) {
        setImage(Jodiac[5].image);
        setContent("");
        setJodiacname(Jodiac[5].name);
      } else if (birthdateAsNumber <= 722) {
        setImage(Jodiac[6].image);
        setContent("");
        setJodiacname(Jodiac[6].name);
      } else if (birthdateAsNumber <= 822) {
        setImage(Jodiac[7].image);
        setContent("");
        setJodiacname(Jodiac[7].name);
      } else if (birthdateAsNumber <= 922) {
        setImage(Jodiac[8].image);
        setContent("");
        setJodiacname(Jodiac[8].name);
      } else if (birthdateAsNumber <= 1023) {
        setImage(Jodiac[9].image);
        setContent("");
        setJodiacname(Jodiac[9].name);
      } else if (birthdateAsNumber <= 1122) {
        setImage(Jodiac[10].image);
        setContent("");
        setJodiacname(Jodiac[10].name);
      } else if (birthdateAsNumber <= 1221) {
        setImage(Jodiac[11].image);
        setContent("");
        setJodiacname(Jodiac[11].name);
      } else if (birthdateAsNumber <= 1231) {
        setImage(Jodiac[0].image);
        setContent("");
        setJodiacname(Jodiac[0].name);
      }
    }, 300),
    [],
  );

  return (
    <div className="mx-10 flex flex-col justify-center space-y-5">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
      <div className="flex flex-col justify-center">
        <InputZodiac
          onChange={(e) => {
            setBirthdate(e.target.value);
            debouncedSetImage(e.target.value);
          }}
          zodiac={zodiac}
          setZodiac={setZodiac}
          image={image}
          setImage={setImage}
          content={content}
          setContent={setContent}
          jodiacname={jodiacname}
        />
        <Inputdropdown planetId={interest} setPlanetId={setInterest} />
      </div>
      <div className="flex flex-row">
        <Inputnickname2
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button1
          value="확인"
          className="flex w-16 font-Pretendard"
          onClick={(event) => {
            event.preventDefault();
            if (!isNicknameValid(nickname)) {
              setIsAlertVisible(true);
              setAlertMessage("닉네임 형식을 확인해주세요.");
              return;
            }
            if (nickname.length < 2) {
              setIsAlertVisible(true);
              setAlertMessage("닉네임은 최소 2자리 이상이어야 합니다.");
              return;
            }
            duplicateCheck("Nickname", nickname);
          }}
        />
      </div>
      <div className="flex flex-row">
        <InputEmail3 value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button1
          value="확인"
          className="flex w-16 font-Pretendard"
          onClick={(event) => {
            event.preventDefault();
            if (!isEmailValid(email)) {
              setIsAlertVisible(true);
              setAlertMessage("이메일 형식을 확인해주세요.");
              return;
            }
            duplicateCheck("Email", email);
          }}
        />
      </div>
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

export default MemberRegistrationForm;
