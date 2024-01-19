import React, { useEffect, useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import CanvasPlanet from "../blocks/CanvasPlanet";
import ListBestStars from "../blocks/ListBestStars";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  nicknameState,
  backgroundflagState,
  currentplanetState,
} from "../../../recoil/atoms";
import Footer from "../../../common/blocks/Footer";
import HelpCarousel from "../atoms/HelpCarousel";
import Question from "../../../assets/icons/js/Question";

const MainPlanet = () => {
  const [, setBackgroundflag] = useRecoilState(backgroundflagState);
  useEffect(() => {
    setBackgroundflag(false);
  }, []);

  const {
    navigateToLoginMember,
    navigateToMemberProfile,
    navigateToSearchQuration,
    navigateToDetailPlanet,
  } = useNavigation();

  // 행성 처음 위치
  const currentPlanetId = useRecoilValue(currentplanetState);
  const [currentPlanet, setCurrentPlanet] = useState(currentPlanetId % 8);

  const nickname = useRecoilValue(nicknameState);

  const token = sessionStorage.getItem("accessToken");

  const mypageClick = () => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };

  const buttonsFooter = [
    {
      onClick: navigateToSearchQuration,
    },
    {},
  ];

  if (token === null) {
    buttonsFooter.push({
      onClick: navigateToLoginMember,
    });
  } else {
    buttonsFooter.push({
      onClick: mypageClick,
    });
  }

  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute left-1/2 top-20 z-10 -translate-x-1/2 -translate-y-1/2 transform">
        {/* <ListSectionPlanet /> */}
      </div>
      <ListBestStars
        currentPlanet={currentPlanet}
        // setPlanetPosition={setPlanetPosition} 삭제 해야 할 것
      />
      <CanvasPlanet
        currentPlanet={currentPlanet}
        setCurrentPlanet={setCurrentPlanet}
        navigateToDetailPlanet={navigateToDetailPlanet}
      />
      <div className="fixed bottom-3 left-1/2 z-10 -translate-x-1/2 space-x-4">
        <Footer buttons={buttonsFooter} />
      </div>
      <button
        className="absolute bottom-40 right-4 z-50 rounded-lg text-white"
        onClick={() => setIsActive(!isActive)}
      >
        <Question />
      </button>
      {isActive && <HelpCarousel setIsActive={setIsActive} />}
    </div>
  );
};

export default MainPlanet;
