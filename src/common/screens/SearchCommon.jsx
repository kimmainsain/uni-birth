import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSearchApi from "../../api/useSearchApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundflagState, nicknameState } from "../../recoil/atoms";
import { useNavigation } from "../../hooks/useNavigation";
import Button2 from "../atoms/Button2";
import LeftArrow from "../../assets/icons/js/leftArrow";
import SearchHeader from "../blocks/SearchHeader";
import CustomAlert from "../atoms/CustomAlert";
import Button6 from "../atoms/Button6";
import Header5 from "../blocks/Header5";
import Footer from "../blocks/Footer";

const SearchCommon = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const nickname = useRecoilValue(nicknameState);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("constellation");
  const query = location.state.query;
  const category = location.state.categoryName;
  const [constellationList, setConstellationList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [starList, setStarList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("전체");

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    navigateToDetailConstellation,
    navigateToDetailStar,
    navigateToMemberProfile,
    navigateToBack,
    navigateToMainPlanet,
  } = useNavigation();

  useEffect(() => {
    getSearchGetSearch();
  }, [query, category]);

  const getSearchGetSearch = async () => {
    try {
      let submitCategory;
      if (category === "전체") {
        submitCategory = "all";
      } else if (category === "별자리") {
        submitCategory = "constellation";
      } else if (category === "닉네임") {
        submitCategory = "nickname";
      } else if (category === "별") {
        submitCategory = "star";
      }
      const response = await useSearchApi.searchGetSearch(
        submitCategory,
        query,
      );
      if (response.status === 200) {
        setConstellationList(response.resultData.constellationList || []);
        setMemberList(response.resultData.memberList || []);
        setStarList(response.resultData.starList || []);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("검색 결과를 불러오는데 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("검색 결과를 불러오는데 실패하였습니다.");
    }
  };
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleConstellationClick = (constellationId) => {
    navigateToDetailConstellation(constellationId);
  };

  const handleMemberClick = (nickname) => {
    navigateToMemberProfile(nickname);
  };

  const handleStarClick = (starId) => {
    navigateToDetailStar(starId);
  };
  const buttonsHeader = [
    {
      component: Button2, // Assuming you have this imported or you can adjust based on your needs
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const buttonsHeader2 = [
    {
      component: Button6,
      className: "w-20",
      value: "별자리",
      onClick: () => setActiveTab("constellation"),
    },
    {
      component: Button6,
      className: "w-20",
      value: "닉네임",
      onClick: () => setActiveTab("member"),
    },
    {
      component: Button6,
      className: "w-20",
      value: "별",
      onClick: () => setActiveTab("star"),
    },
  ];

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

  return (
    <div className="bg-space-black mx-auto flex h-screen max-w-screen-sm flex-col text-white">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "검색 결과를 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <header className="sticky top-0 z-10 bg-black bg-opacity-90">
        <SearchHeader
          buttons={buttonsHeader}
          category={searchCategory}
          setCategory={setSearchCategory}
          query={searchQuery}
          setQuery={setSearchQuery}
        />
      </header>

      <div className=" flex  flex-1  flex-col p-4">
        <div className="my-4">
          <Header5 buttons={buttonsHeader2} />
        </div>
        <p className="border-t"></p>
        <ul className="divide-nebula-blue mb-10 space-y-4 divide-y overflow-y-auto">
          {activeTab === "constellation" &&
            (constellationList.length === 0 ? (
              <div className="text-center">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <p className="text-white text-opacity-60">
                    검색된 별자리 목록이 없습니다.
                  </p>
                </div>
              </div>
            ) : (
              constellationList.map((constellation) => (
                <li
                  key={constellation.constellationId}
                  className="animate-sparkle flex items-center px-4 py-4"
                  onClick={() =>
                    handleConstellationClick(constellation.constellationId)
                  }
                >
                  <img
                    src={constellation.imageUrl}
                    alt={constellation.title}
                    className="glow mr-4 h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between space-y-2">
                    <div className="text-lg font-semibold">
                      {constellation.title}
                    </div>
                    <div className="max-h-10 overflow-hidden">
                      <p
                        className="text-md"
                        style={{
                          maxHeight: "4em",
                          maxWidth: "14em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {constellation.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            ))}

          {activeTab === "member" &&
            (memberList.length === 0 ? (
              <div className="text-center">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <p className="text-white text-opacity-60">
                    검색된 닉네임 목록이 없습니다.
                  </p>
                </div>
              </div>
            ) : (
              memberList.map((member) => (
                <li
                  key={member.nickname}
                  className="animate-sparkle flex items-center px-4 py-4"
                  onClick={() => handleMemberClick(member.nickname)}
                >
                  <img
                    src={member.imageUrl}
                    alt={member.nickname}
                    className="glow mr-4 h-20 w-20 rounded-full object-cover"
                  />
                  {member.nickname}
                </li>
              ))
            ))}
          {activeTab === "star" &&
            (starList.length === 0 ? (
              <div className="text-center">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <p className="text-white text-opacity-60">
                    검색된 별 목록이 없습니다.
                  </p>
                </div>
              </div>
            ) : (
              starList.map((star) => (
                <li
                  key={star.starId}
                  className="animate-sparkle flex items-start px-4 py-4"
                  onClick={() => handleStarClick(star.starId)}
                >
                  <img
                    src={star.imageUrl}
                    alt={star.content}
                    className="my-auto mr-4 h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between space-y-2">
                    <div className="text-lg font-semibold">{star.title}</div>
                    <div className="max-h-10 overflow-hidden">
                      <p
                        className="text-md"
                        style={{
                          maxHeight: "4em",
                          maxWidth: "14em",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {star.content}
                      </p>
                    </div>
                    <div className="font-bold text-white">{star.nickname}</div>
                    <span className="mt-2 text-xs text-white">
                      {formatDate(star.createdAt)}
                    </span>
                  </div>
                </li>
              ))
            ))}
        </ul>
        <div className="fixed bottom-3 left-1/2 z-10 -translate-x-1/2">
          <Footer buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default SearchCommon;
