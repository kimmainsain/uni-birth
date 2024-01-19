import React, { useState, useEffect } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useMemberApi from "../../../api/useMemberApi";
import useProfileApi from "../../../api/useProfileApi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nicknameState, memberProfileImageState } from "../../../recoil/atoms";
import Button5 from "../../../common/atoms/Button5";
import CustomAlert from "../../../common/atoms/CustomAlert";
import { PLANET_LIST } from "../../../constants/constants";

const MemberSectionProfile = ({ locationNickname }) => {
  const {
    navigateToModifyProfile,
    navigateToFollow,
    navigateToMyStars,
    navigateToBack,
  } = useNavigation();
  const [memberData, setMemberData] = useState();
  const [isFollowing, setIsFollowing] = useState(
    memberData?.resultData?.follow,
  );
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const setMemberProfileImage = useSetRecoilState(memberProfileImageState);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const nickname = useRecoilValue(nicknameState);
  useEffect(() => {
    fetchMemberData();
  }, [memberData]);

  const handleFollow = async (e) => {
    e.preventDefault();
    const followData = {
      followFrom: nickname,
      followTo: locationNickname,
    };
    try {
      const response = await useProfileApi.profilesPostFollow(followData);
      setAlertStatus(response.status);
      if (alertStatus === 200) {
        setIsFollowing(true);
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("팔로우 중 오류가 발생했습니다.");
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    try {
      const response = await useProfileApi.profilesDeleteFollow(
        locationNickname,
      );
      setAlertStatus(response.status);
      if (response.status === 200) {
        setIsFollowing(false);
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("팔로우 취소 중 오류가 발생했습니다.");
    }
  };

  const fetchMemberData = async () => {
    try {
      const response = await useMemberApi.membersGetDetail(locationNickname);
      setAlertStatus(response.status);
      if (response.status === 200) {
        setMemberData(response);
        setIsFollowing(response?.resultData?.follow);
        setMemberProfileImage(response?.resultData?.imageUrl);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("존재하지 않는 회원입니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("사용자 정보 에러 발생.");
    }
  };

  const handleToFollow = (locationNickname, currentState) => {
    const params = {
      locationNickname,
      currentState,
    };
    navigateToFollow(params);
  };

  return (
    <div className="space-x-4 overflow-hidden bg-slate-950 bg-opacity-60 px-5 py-5">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (
            alertMessage === "사용자 정보 에러 발생." ||
            alertStatus === 403 ||
            alertStatus === 404
          ) {
            navigateToBack();
          }
        }}
      />
      {memberData && (
        <div className="flex items-start space-x-4">
          <img
            src={memberData.resultData.imageUrl}
            className="mx-auto h-32 w-32 rounded-full object-cover"
            alt="Round image"
          />
          <div className="flex flex-grow flex-col justify-center space-y-10 font-Pretendard">
            <div className="flex flex-col">
              <div className="flex justify-end space-x-4">
                <div className="flex flex-row items-center">
                  <p
                    onClick={() => handleToFollow(locationNickname, "팔로잉")}
                    className="text-center text-white"
                  >
                    팔로잉: {memberData.resultData.followingCount}
                  </p>
                </div>
                <div className="flex items-center">
                  <p
                    onClick={() => handleToFollow(locationNickname, "팔로워")}
                    className="text-center text-white"
                  >
                    팔로워: {memberData.resultData.followerCount}
                  </p>
                </div>
                <div className="flex items-center">
                  <p
                    onClick={() => navigateToMyStars(locationNickname)}
                    className="text-center text-white"
                  >
                    띄운별: {memberData.resultData.starCount}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-end pt-2 text-center text-white">
                <div className="w-28">관심행성: </div>
                <div>{PLANET_LIST[memberData.resultData.planetId].name}</div>
              </div>
            </div>
            <div className=" text-right text-lg font-bold text-white">
              {memberData.resultData.introduction}
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-end space-x-4 bg-slate-950 bg-opacity-60 font-Pretendard">
        {nickname === locationNickname ? (
          <Button5
            value="수정"
            className="w-20"
            onClick={navigateToModifyProfile}
          />
        ) : isFollowing ? (
          <Button5 value="언팔로우" className="w-24" onClick={handleUnfollow} />
        ) : (
          <Button5 value="팔로우" className="w-20" onClick={handleFollow} />
        )}
      </div>
    </div>
  );
};

export default MemberSectionProfile;
