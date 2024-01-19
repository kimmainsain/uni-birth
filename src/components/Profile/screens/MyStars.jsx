import React, { useState, useEffect } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useLocation } from "react-router";
import CustomAlert from "../../../common/atoms/CustomAlert";

const MyStars = () => {
  const { navigateToBack, navigateToDetailStar } = useNavigation();

  const location = useLocation();
  const locationNickname = location.state;
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          띄운별
        </span>
      ),
    },
  ];

  const [starList, setStarList] = useState([]);

  const handleToDetailStar = (starId) => {
    navigateToDetailStar(starId);
  };

  const getStarList = async () => {
    try {
      const response = await useStarApi.starsGetStarList(locationNickname);
      if (response.status === 200) {
        setStarList(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("별 리스트를 불러오는데 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("별 리스트를 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    getStarList();
  }, []);

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-0">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "별 리스트를 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <header className="fixed top-0 z-10 w-full bg-black bg-opacity-90">
        <Header2 buttons={buttonsHeader} />
      </header>
      <div className="pt-10">
        <ul className="mt-10 flex flex-col items-center px-4 text-white">
          {starList.map((star) => (
            <li
              key={star.starId}
              className="animate-sparkle flex w-full items-start border-b border-purple-200 px-4 py-4"
              onClick={() => handleToDetailStar(star.starId)}
            >
              <img
                src={star.imageUrl}
                alt={star.content}
                className="my-auto mr-4 h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between space-y-2">
                <div className="text-lg font-semibold">{star.title} 자리</div>
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
                <div className="font-bold text-white">{locationNickname}</div>
                <span className="mt-2 text-xs text-white">
                  {formatDate(star.createdAt)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyStars;
