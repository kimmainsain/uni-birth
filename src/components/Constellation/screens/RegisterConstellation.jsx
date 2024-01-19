import React, { useEffect, useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import InputDropdown2 from "../atoms/InputDropdown2";
import InputStella from "../atoms/InputStella";
import InputDescription from "../atoms/InputDescription";
import { useNavigation } from "../../../hooks/useNavigation";
// import planet1 from "../../../assets/images/planet1.png";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { backgroundflagState, currentplanetState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import CustomAlert from "../../../common/atoms/CustomAlert";

const RegistConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const currentPLanet = useRecoilValue(currentplanetState);
  const [planetId, setPlanetId] = useState(currentPLanet + 1);
  const [constellationName, setConstellationName] = useState("");
  const [constellationDescp, setConstellationDescp] = useState("");
  const { navigateToBack, navigateToDrawingConstellation } = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleSubmit = () => {
    if (planetId && constellationName && constellationDescp) {
      navigateToDrawingConstellation({
        planetId,
        constellationName,
        constellationDescp,
      });
    } else if (!constellationName) {
      setIsAlertVisible(true);
      setAlertMessage("별자리 이름을 입력해주세요.");
    } else if (!constellationDescp) {
      setIsAlertVisible(true);
      setAlertMessage("별자리 설명을 입력해주세요.");
    } else if (!planetId) {
      setIsAlertVisible(true);
      setAlertMessage("행성을 선택해주세요.");
    }
  };
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          별자리 그리기
        </span>
      ),
    },
  ];
  const buttonsFooter = [
    {
      component: Button1,
      className: "font-Pretendard",
      value: "별자리 그리기",
      onClick: handleSubmit,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
      <div>
        <Header1 buttons={buttonsHeader} />
        <div className="mt-24 flex flex-col items-center justify-center space-y-5">
          <img
            src={`/images/planet0${planetId}.jpg`}
            alt="행성1 이미지 예시"
            className="h-32 w-32 rounded-full"
          />
          <p className="font-Pretendard text-white">행성 명</p>
          <InputDropdown2 planetId={planetId} setPlanetId={setPlanetId} />
          <InputStella
            constellationName={constellationName}
            setConstellationName={setConstellationName}
          />
          <InputDescription
            constellationDescp={constellationDescp}
            setConstellationDescp={setConstellationDescp}
          />
        </div>
        <div>
          <Footer1
            buttons={buttonsFooter}
            planetId={planetId}
            constellationDescp={constellationDescp}
            constellationName={constellationName}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistConstellation;
