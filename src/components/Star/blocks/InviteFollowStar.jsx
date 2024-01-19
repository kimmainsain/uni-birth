import useProfileApi from "../../../api/useProfileApi";
import React, { useEffect, useState } from "react";
import { nicknameState, StellaIdState } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { HiPaperAirplane } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";
import { sendInvite, updateAlarm } from "../../../api/useFirebaseApi";
import useConstellationApi from "../../../api/useConstellationApi";
import CustomAlert from "../../../common/atoms/CustomAlert";
import { useNavigation } from "../../../hooks/useNavigation";
const InviteFollowStar = () => {
  const nickname = useRecoilValue(nicknameState);
  const [followList, setFollowList] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState({}); // 초대한 사용자 추적
  const constellationId = useRecoilValue(StellaIdState);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { navigateToBack } = useNavigation();
  useEffect(() => {
    getFollowList(nickname);
  }, [nickname]);

  const getFollowList = async (nickname) => {
    try {
      const followingsResponse = await useProfileApi.profilesGetFollowings(
        nickname,
      );
      const followersResponse = await useProfileApi.profilesGetFollowers(
        nickname,
      );
      if (
        followingsResponse.status !== 200 ||
        followersResponse.status !== 200
      ) {
        setIsAlertVisible(true);
        setAlertMessage("팔로우 목록을 불러오는데 실패하였습니다.");
        return;
      }

      // 결과를 하나의 배열로 합치기
      const combinedResults = [
        ...followingsResponse.resultData,
        ...followersResponse.resultData,
      ];

      const uniqueResults = Array.from(
        new Set(combinedResults.map((item) => item.nickname)),
      ).map((nickname) => {
        return combinedResults.find((item) => item.nickname === nickname);
      });
      setFollowList(uniqueResults);
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("팔로우 목록을 불러오는데 실패하였습니다.");
    }
  };

  const handleInvite = async (targetNickname) => {
    try {
      const response = await useConstellationApi.constellationsGetDetail(
        constellationId,
      );
      const constellationTitle = response.resultData.constellationTitle;

      await sendInvite(
        nickname,
        targetNickname,
        constellationTitle,
        constellationId,
      );

      setInvitedUsers({ ...invitedUsers, [targetNickname]: true });
      await updateAlarm(targetNickname, Date.now());
    } catch (error) {}
  };

  return (
    <div className="p-4 text-purple-400">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "팔로우 목록을 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <div className="h-[calc(3*4rem)] overflow-y-auto">
        {followList.length === 0 ? (
          <div className="py-4 text-center">
            <p>팔로우 목록이 비어있습니다.</p>
          </div>
        ) : (
          followList.map((item) => {
            return (
              <div
                key={item.nickname}
                className="mb-3 flex items-center space-x-4 p-2"
              >
                <img
                  src={item.imageUrl}
                  alt={`${item.nickname}'s profile`}
                  className="glow mr-4 h-12 w-12 rounded-full object-cover"
                />
                <div className="font-semibold">{item.nickname}</div>
                <button
                  onClick={() => handleInvite(item.nickname)}
                  className="text-purple-500"
                >
                  {invitedUsers[item.nickname] ? (
                    <BsCheck className="h-6 w-6" />
                  ) : (
                    <HiPaperAirplane className="h-6 w-6" />
                  )}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default InviteFollowStar;
