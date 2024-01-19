import React, { useState, useEffect } from "react";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import { useNavigation } from "../../../hooks/useNavigation";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import InputImage from "../../Member/atoms/InputImage";
import useMemberApi from "../../../api/useMemberApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import InputIntroduction from "../atoms/InputIntroduction";
import { storage } from "../../../api/useFirebaseApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import earth from "../../../assets/images/earth.png";
import CustomAlert from "../../../common/atoms/CustomAlert";
import { useRecoilValue } from "recoil";
import { memberProfileImageState } from "../../../recoil/atoms";
import Inputdropdown from "../../Constellation/atoms/InputDropdown";
// import { PLANET_LIST } from "../../../constants/constants";

const ModifyProfile = () => {
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const [introduction, setIntro] = useState("");
  const [nickname, setNickname] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const memberProfileImage = useRecoilValue(memberProfileImageState);
  const [imageUrl, setImageUrl] = useState(memberProfileImage);
  const [planetId, setPlanetId] = useState(1);

  const saveImgFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbUrl(e.target.result);
      setImageUrl(file);
    };
    reader.readAsDataURL(file);
  };
  const fetchData = async () => {
    try {
      const response = await useMemberApi.membersGetProfiles();
      if (response.status !== 200) {
        setIsAlertVisible(true);
        setAlertMessage("회원정보를 가져오는데 오류가 발생했습니다.");
        return;
      }
      setPlanetId(response.resultData.planetId + 1);
      setImageUrl(response.resultData.imageUrl);
      setThumbUrl(response.resultData.imageUrl);
      setIntro(response.resultData.introduction);
      setNickname(response.resultData.nickname);
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("회원정보를 가져오는데 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const handleCompleteClick = async (e) => {
    e.preventDefault();
    let finalImageUrl = imageUrl; // 잠재적으로 업데이트 될 수 있으므로 'let'을 사용

    // imageUrl이 File 객체일 때만 이미지를 Firebase에 업로드합니다.
    if (!(typeof imageUrl === "string")) {
      const storageRef = ref(storage, `images/${imageUrl.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageUrl);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            setIsAlertVisible(true);
            setAlertMessage("회원정보 수정에 실패하였습니다.");
            reject(error); // 에러가 발생하면 Promise를 reject합니다.
          },
          async () => {
            finalImageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(); // 업로드가 성공하면 Promise를 resolve합니다.
          },
        );
      });
    }

    const member = {
      introduction,
      imageUrl: finalImageUrl,
      planetId: planetId - 1,
    };

    try {
      const response = await useMemberApi.membersPutProfiles(member);
      if (response.status === 200) {
        navigateToMemberProfile(nickname);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("회원정보 수정에 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("회원정보 수정에 실패하였습니다.");
    }
  };

  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "완료하기",
      onClick: handleCompleteClick,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <header className="fixed top-0 z-10">
        <Header1 buttons={buttonsHeader} />
      </header>
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "회원정보를 가져오는데 오류가 발생했습니다.") {
            navigateToBack();
          }
        }}
      />
      <form className="mx-10 mt-32 flex-col items-center justify-center space-y-5">
        <img
          src={thumbUrl || earth}
          alt="이미지"
          className="mx-auto h-32 w-32 rounded-full object-cover"
        />
        <InputImage
          setImageUrl={setImageUrl}
          setThumbUrl={setThumbUrl}
          onChange={saveImgFile}
        />

        <Inputdropdown planetId={planetId} setPlanetId={setPlanetId} />
        <div className="w-full flex-initial items-center justify-center font-Pretendard">
          <div className="w-full flex-row">
            <label
              htmlFor="nickname"
              className="inline-block w-24 font-bold text-gray-200"
            >
              닉네임
            </label>
            <div className="mt-2 w-full flex-row">
              <input
                className="w-full flex-1 flex-row border-b-2 border-gray-400 bg-transparent py-2 text-white 
        placeholder-gray-400 outline-none
        focus:border-purple-400"
                type="text"
                name="nickname"
                autoComplete="off"
                id="nickname"
                value={nickname}
                readOnly
              />
            </div>
          </div>
        </div>
        <InputIntroduction
          value={introduction}
          placeholder={introduction}
          onChange={(e) => setIntro(e.target.value)}
        />
        <Footer1 buttons={buttonsFooter} />
      </form>
    </div>
  );
};

export default ModifyProfile;
