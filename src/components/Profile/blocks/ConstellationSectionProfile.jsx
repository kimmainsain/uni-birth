import React, { useState, useEffect } from "react";
import useConstellationApi from "../../../api/useConstellationApi";
import Button3 from "../../../common/atoms/Button3";
import { useNavigation } from "../../../hooks/useNavigation";
import CustomAlert from "../../../common/atoms/CustomAlert";

const ConstellationSectionProfile = ({ locationNickname }) => {
  const [images, setImages] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const { navigateToDetailConstellation, navigateToBack } = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleButtonClick = (buttonValue) => {
    setSelectedButton(buttonValue);
  };
  const handlePinClick = async () => {
    try {
      const response = await useConstellationApi.constellationsGetPinList(
        locationNickname,
      );
      if (response.status === 200) {
        setImages(response.resultData.constellationList);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("존재하지 않는 회원입니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("오류가 발생했습니다.");
    }
  };

  const handleParticipateClick = async () => {
    try {
      const response = await useConstellationApi.constellationsGetAttendList(
        locationNickname,
      );
      if (response.status === 200) {
        setImages(response.resultData.constellationList);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("존재하지 않는 회원입니다.");
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
    setSelectedButton("참여한 별자리");
    handleParticipateClick();
  }, []);

  return (
    <div>
      <div className="mx-auto flex flex-row items-center justify-between border-y-2 border-purple-100 bg-slate-950 bg-opacity-70 font-Pretendard text-white">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => {
            setIsAlertVisible(false);
            if (
              alertMessage === "존재하지 않는 회원입니다." ||
              alertMessage === "오류가 발생했습니다." ||
              alertMessage === "로그인이 필요한 서비스입니다."
            ) {
              navigateToBack();
            }
          }}
        />
        <Button3
          value="참여한 별자리"
          className="mx-auto  w-full border-r border-purple-100 font-Pretendard text-white"
          selectedValue={selectedButton}
          onSelect={handleButtonClick}
          onClick={handleParticipateClick}
        />
        <Button3
          value="핀한 별자리"
          className="mx-auto w-full border-l font-Pretendard text-white"
          selectedValue={selectedButton}
          onSelect={handleButtonClick}
          onClick={handlePinClick}
        />
      </div>
      <div className="flex flex-row flex-wrap">
        {images.length === 0 ? (
          <div className="absolute left-1/2 top-2/3 w-full -translate-x-1/2 -translate-y-1/2 transform py-4 text-center">
            <p className="text-white text-opacity-60">별자리가 없습니다.</p>
          </div>
        ) : (
          images.map((img) => (
            <div
              key={img.constellationId}
              className="w-1/3  p-4"
              onClick={() => navigateToDetailConstellation(img.constellationId)}
            >
              {" "}
              <img src={img.imageUrl} className="avatar" />
            </div>
          ))
        )}
      </div>
      <div className="h-12"></div>
    </div>
  );
};

export default ConstellationSectionProfile;
