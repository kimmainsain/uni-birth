import React, { useState, useEffect } from "react";
import Button2 from "../atoms/Button2";
import { useNavigation } from "../../hooks/useNavigation";
import Button7 from "../atoms/Button7";
import SearchHeader from "../blocks/SearchHeader";
import QurationStar from "../blocks/QurationStar";
import Footer from "../blocks/Footer";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { backgroundflagState, nicknameState } from "../../recoil/atoms";
import LeftArrow from "../../assets/icons/js/leftArrow";
import Header5 from "../blocks/Header5";
import useSearchApi from "../../api/useSearchApi";
import CustomAlert from "../atoms/CustomAlert";

const SearchQuration = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const nickname = useRecoilValue(nicknameState);
  const [alertMessage, setAlertMessage] = useState("");

  const { navigateToBack, navigateToMainPlanet, navigateToMemberProfile } =
    useNavigation();
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [currentState, setCurrentState] = useState("팔로우");
  const [followingData, setFollowingData] = useState([]);
  const [interestData, setInterestData] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const buttonsFooter = [
    {
      onClick: () => {},
    },
    {
      onClick: navigateToMainPlanet,
    },
    {
      onClick: () => navigateToMemberProfile(nickname),
    },
  ];

  const getQurationStar = async () => {
    try {
      const response = await useSearchApi.searchGetMemberCuration(nickname);
      if (response.status === 200) {
        setFollowingData(response.resultData[0]);
        setInterestData(response.resultData[1]);
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage(response.message);
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getQurationStar();
  }, []);
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const buttonsHeader2 = [
    {
      component: Button7,
      className: "w-36",
      value: "팔로우",
      onClick: () => setCurrentState("팔로우"),
    },
    {
      component: Button7,
      className: "w-36",
      value: "관심행성",
      onClick: () => setCurrentState("관심행성"),
    },
  ];

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm">
      <header className="sticky top-0 z-10 bg-black bg-opacity-90">
        <SearchHeader
          buttons={buttonsHeader}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />
      </header>
      <div className="bg-space-black mx-auto flex h-screen max-w-screen-sm flex-col text-white">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => {
            setIsAlertVisible(false);
            if (
              alertMessage === "로그인이 필요한 서비스입니다." ||
              alertMessage === "오류가 발생했습니다." ||
              alertMessage === "아직 별이 없습니다."
            ) {
              navigateToBack();
            }
          }}
        />
        <div className="mb-10 flex flex-1 flex-col p-4">
          <div className="my-4">
            <Header5 buttons={buttonsHeader2} />
          </div>
          <div className="flex flex-col items-center justify-center"></div>
          {currentState === "팔로우" && <QurationStar data={followingData} />}
          {currentState === "관심행성" && <QurationStar data={interestData} />}
        </div>
        <div className="fixed bottom-3 left-1/2 z-10 -translate-x-1/2">
          <Footer buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default SearchQuration;
