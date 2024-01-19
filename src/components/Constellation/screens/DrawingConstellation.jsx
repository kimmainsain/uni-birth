import React, { useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import GridCustomConstellation from "../blocks/GridCustomConstellation";
import ListTemplateModalConstellation from "../blocks/ListTemplateModalConstellation";
import { useLocation } from "react-router";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import Header7 from "../../../common/blocks/Header7";

const DrawingConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(true);
  const location = useLocation();
  const { planetId, constellationName, constellationDescp } = location.state;
  const { navigateToBack } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointList, setPointList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [constellationColor, setconstellationColor] = useState("#3ed4be");

  const handleModalOpen = () => {
    setIsModalOpen(true);
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
    {
      component: Button1,
      value: "템플릿",
      onClick: handleModalOpen,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <div>
        <Header7 buttons={buttonsHeader} />
        <div className="mt-20 justify-center space-y-10">
          <GridCustomConstellation
            planetId={planetId}
            constellationName={constellationName}
            constellationDescp={constellationDescp}
            pointList={pointList}
            lineList={lineList}
            constellationColor={constellationColor}
            setconstellationColor={setconstellationColor}
          />
          {isModalOpen && (
            <ListTemplateModalConstellation
              setIsModalOpen={setIsModalOpen}
              setPointList={setPointList}
              setLineList={setLineList}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawingConstellation;
