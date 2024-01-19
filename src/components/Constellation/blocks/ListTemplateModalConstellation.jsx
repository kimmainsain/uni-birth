import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useConstellationApi from "../../../api/useConstellationApi";
import CustomAlert from "../../../common/atoms/CustomAlert";

const ListTemplateModalConstellation = ({
  setIsModalOpen,
  setPointList,
  setLineList,
}) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [templateList, setTemplateList] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePutTemplateConstellation = (template) => {
    setPointList(template.pointList);
    setLineList(template.lineList);
    handleCloseModal();
  };

  const getTemplateModalConstellation = async () => {
    try {
      const response =
        await useConstellationApi.constellationsGetTemplateList();
      if (response.status === 200) {
        setTemplateList(response.resultData.templateList);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("템플릿 정보가 없습니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getTemplateModalConstellation();
  }, []);

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
      <div className="flex w-2/3 flex-col rounded-md border-2  bg-transparent p-5 shadow-lg">
        <Slider {...settings}>
          {templateList.map((template) => (
            <div
              key={template.templateId}
              className="flex flex-col items-center text-white"
            >
              <img
                src={template.imageUrl}
                onClick={() => {
                  handlePutTemplateConstellation(template);
                }}
                className="mx-auto mb-2 block cursor-pointer"
              />
              <div>{""}</div>
            </div>
          ))}
        </Slider>
        <button
          className="mx-auto mt-4 inline-flex w-24 items-center justify-center rounded-full border  p-2 text-white "
          onClick={handleCloseModal}
        >
          창 닫기
        </button>
      </div>
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
    </div>
  );
};

export default ListTemplateModalConstellation;
