// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import ListSectionStar from "../blocks/ListSectionStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundflagState, nicknameState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import Footer from "../../../common/blocks/Footer";
import { useParams } from "react-router-dom";
import useConstellationApi from "../../../api/useConstellationApi";
import Header1 from "../../../common/blocks/Header1";
import CustomAlert from "../../../common/atoms/CustomAlert";

const DetailConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(false);
  }, []);
  const { constellationId } = useParams();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [constellationContent, setConstellationConstent] = useState([]);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    getConstellationContent(constellationId);
  }, [constellationId]);

  const getConstellationContent = async (constellationId) => {
    try {
      const response = await useConstellationApi.constellationsGetDetail(
        constellationId,
      );
      if (response.status === 200) {
        setConstellationConstent(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("별자리 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("별자리 정보를 불러오는데 실패했습니다.");
    }
  };
  const {
    navigateToBack,
    navigateToMainPlanet,
    navigateToMemberProfile,
    navigateToSearchQuration,
    navigateToLoginMember,
  } = useNavigation();
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];
  const buttonsFooter = [
    {
      onClick: navigateToSearchQuration,
    },
    {
      onClick: navigateToMainPlanet,
    },
  ];
  const nickname = useRecoilValue(nicknameState);

  const token = sessionStorage.getItem("accessToken");
  const mypageClick = () => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };
  if (token === null) {
    buttonsFooter.push({
      onClick: navigateToLoginMember,
    });
  } else {
    buttonsFooter.push({
      onClick: mypageClick,
    });
  }

  return (
    <div>
      <div className="absolute z-50 max-w-screen-sm">
        <Header1 buttons={buttonsHeader} />
      </div>
      <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-lg bg-transparent p-2  text-white">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => {
            setIsAlertVisible(false);
            if (alertMessage === "별자리 정보를 불러오는데 실패했습니다.") {
              navigateToBack();
            }
          }}
        />
        <div className="my-2 flex items-baseline justify-center text-white">
          <p className="mt-0 text-xl">
            {constellationContent.constellationTitle}
          </p>
          <div className="text-md">&nbsp;자리</div>
        </div>
      </div>
      <div className="absolute left-1/2 top-2/3 z-10 -translate-x-1/2 -translate-y-1/2 text-white">
        <button
          className="relative mx-8 my-3 w-28 rounded-full border font-Pretendard"
          onClick={() => setIsActive(!isActive)}
        >
          자세히 보기
        </button>
        {isActive && (
          <div className="absolute flex w-44 flex-col justify-center">
            <div className="text-bold flex justify-center">설명</div>
            <div>{constellationContent?.description}</div>
          </div>
        )}
      </div>

      <ListSectionStar className="relative left-0 top-0 z-0 h-full w-full" />
      <div className="fixed bottom-3 left-1/2 z-10 -translate-x-1/2 space-x-4">
        <Footer buttons={buttonsFooter} />
      </div>
    </div>
  );
};

export default DetailConstellation;
