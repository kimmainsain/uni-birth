import React, { useEffect, useState } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import { useSetRecoilState } from "recoil";
import {
  database,
  ref,
  onValue,
  off,
  checkAlarm,
} from "../../../api/useFirebaseApi";
import { backgroundflagState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useLocation } from "react-router-dom";
import StarBig from "../../../assets/icons/js/starBig";

const UserAlarm = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const location = useLocation();
  const nickname = location.state;
  const [alarms, setAlarms] = useState([]);
  const { navigateToDetailConstellation, navigateToBack } = useNavigation();

  const handleBackClick = () => {
    navigateToBack();
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: handleBackClick,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          알림
        </span>
      ),
    },
  ];

  useEffect(() => {
    const invitedRef = ref(database, `invited/${nickname}`);
    const handleNewAlarm = (snapshot) => {
      const userAlarms = snapshot.val();
      if (userAlarms) {
        const formattedAlarms = Object.entries(userAlarms);
        const sortedAlarms = formattedAlarms.sort(
          (a, b) => b[1].timestamp - a[1].timestamp,
        );
        setAlarms(sortedAlarms);
      }
    };

    onValue(invitedRef, handleNewAlarm);

    return () => {
      off(invitedRef, "value", handleNewAlarm);
    };
  }, [nickname]);

  useEffect(() => {
    checkAlarm(nickname, Date.now());
  }, []);

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-0 text-white">
      <div>
        <Header2 buttons={buttonsHeader} />
        {alarms.length === 0 ? (
          <div className="text-center">
            <p className="border-t"></p>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <StarBig className="mx-auto" />
              <p className="text-white text-opacity-60">
                알림 내역이 없습니다.
              </p>
            </div>
          </div>
        ) : (
          <ul>
            {alarms.map(([alarmId, alarmData]) => (
              <li
                key={alarmId}
                onClick={() =>
                  navigateToDetailConstellation(alarmData.constellationId)
                }
                className="border-t px-4 py-4"
              >
                <div className="text-base">
                  {alarmData.sender}님이 {alarmData.constellationTitle}로
                  초대하였습니다.
                </div>
                {alarmData.timestamp && (
                  <div className="mt-2 text-xs">
                    {new Date(alarmData.timestamp).toLocaleString()}
                  </div>
                )}
              </li>
            ))}
            <li className="border-t"></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserAlarm;
