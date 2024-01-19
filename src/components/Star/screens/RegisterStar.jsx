import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import BodyRegisterStar from "../blocks/BodyRegisterStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  StellaIdState,
  backgroundflagState,
  constellationLimitState,
} from "../../../recoil/atoms";
import useStarApi from "../../../api/useStarApi";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../api/useFirebaseApi";

import LeftArrow from "../../../assets/icons/js/leftArrow";
import InputImage from "../atoms/InputImage";
import earth from "../../../assets/images/earth.png";
import CustomAlert from "../../../common/atoms/CustomAlert";
const RegisterStar = () => {
  useEffect(() => {
    backgroundflag(true);
  }, []);

  const backgroundflag = useSetRecoilState(backgroundflagState);
  const constellationId = useRecoilValue(StellaIdState);
  const { navigateToBack, navigateToDetailConstellation } = useNavigation(); // navigateToDetailConstellation
  const [title, setTitle] = useState("");
  const defaultImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/uni-birth.appspot.com/o/Zordiac%2Fearth.png?alt=media&token=0ecc42f5-7022-4197-827b-751ecb92c983";

  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [thumbUrl, setThumbUrl] = useState("");
  const [content, setContent] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const setConstellationLimitState = useSetRecoilState(constellationLimitState);

  const createStar = async () => {
    if (isLoading) {
      return;
    }
    setLoading(true); // 로딩 상태 시작

    if (title.trim() === "") {
      setIsAlertVisible(true);
      setAlertMessage("제목을 입력해주세요.");
      setLoading(false);
      return;
    } else if (content.trim() === "") {
      setIsAlertVisible(true);
      setAlertMessage("내용을 입력해주세요.");
      setLoading(false);
      return;
    }

    if (imageUrl === defaultImageUrl) {
      saveStarData(imageUrl); // 기본 이미지 URL 사용
    } else {
      const storageRef = ref(storage, `images/${imageUrl.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageUrl);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        () => {
          setIsAlertVisible(true);
          setAlertMessage("이미지 업로드에 실패하였습니다.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            saveStarData(downloadURL);
          } catch (error) {
            setIsAlertVisible(true);
            setAlertMessage("별 생성에 실패하였습니다.");
          }
        },
      );
    }
  };
  const saveStarData = async (imageUrlToSave) => {
    const data = {
      constellationId,
      title,
      imageUrl: imageUrlToSave,
      content,
    };

    try {
      const response = await useStarApi.starsPostStar(data);
      if (response.status === 200) {
        setConstellationLimitState(response.resultData.constellationLimit);
        navigateToDetailConstellation(constellationId);
      } else if (response.status === 400) {
        setIsAlertVisible(true);
        setAlertMessage("이미 완성된 별자리입니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("별 생성에 실패하였습니다.");
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
          별 생성
        </span>
      ),
    },
  ];
  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (
            alertMessage === "이미 완성된 별자리입니다." ||
            alertMessage === "별 생성에 실패하였습니다."
          ) {
            navigateToBack();
          }
        }}
      />
      <div>
        <Header1 buttons={buttonsHeader} />
        <div className="mt-24 flex flex-col items-center justify-center space-y-10">
          <img src={thumbUrl || earth} alt="이미지" className="w-1/2" />
          <InputImage setImageUrl={setImageUrl} setThumbUrl={setThumbUrl} />
          <BodyRegisterStar
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        </div>
        <div className="flex justify-center py-20 ">
          <Button1 value="별 생성" onClick={createStar} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default RegisterStar;
