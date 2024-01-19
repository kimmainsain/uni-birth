import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import { get, ref } from "firebase/database";
import { database } from "../../../api/useFirebaseApi";

const Right = () => {
  const nickname = useRecoilValue(nicknameState);
  const [lastUpdateAlarm, setLastUpdateAlarm] = useState(null);
  const [checkUpdateAlarm, setCheckUpdateAlarm] = useState(null);
  const [lastUpdateMessage, setLastUpdateMessage] = useState(null);
  const [checkUpdateMessage, setCheckUpdateMessage] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      const checkUpdateAlarmRef = ref(database, `checkAlarm/${nickname}`);
      const checkUpdateAlarmSnapshot = await get(checkUpdateAlarmRef);
      if (checkUpdateAlarmSnapshot.exists()) {
        setCheckUpdateAlarm(checkUpdateAlarmSnapshot.val());
      }

      const lastUpdateAlarmRef = ref(database, `updateAlarm/${nickname}`);
      const lastUpdateAlarmSnapshot = await get(lastUpdateAlarmRef);
      if (lastUpdateAlarmSnapshot.exists()) {
        setLastUpdateAlarm(lastUpdateAlarmSnapshot.val());
      }

      const checkUpdateMessageRef = ref(database, `checkMessage/${nickname}`);
      const checkUpdateMessageSnapshot = await get(checkUpdateMessageRef);
      if (checkUpdateMessageSnapshot.exists()) {
        setCheckUpdateMessage(checkUpdateMessageSnapshot.val());
      }

      const lastUpdateMessageRef = ref(database, `updateMessage/${nickname}`);
      const lastUpdateMessageSnapshot = await get(lastUpdateMessageRef);
      if (lastUpdateMessageSnapshot.exists()) {
        setLastUpdateMessage(lastUpdateMessageSnapshot.val());
      }
    };

    fetchUpdates();
  }, [nickname]);

  const fillColor =
    lastUpdateAlarm > checkUpdateAlarm || lastUpdateMessage > checkUpdateMessage
      ? "yellow"
      : "white";

  return (
    <>
      <svg
        width="103"
        height="47"
        viewBox="0 0 103 47"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M79 46.5H79.5C92.2025 46.5 102.5 36.2025 102.5 23.5C102.5 10.7975 92.2025 0.5 79.5 0.5H79H1H0.5V1V46V46.5H1H79Z"
          stroke="#EEE5FF"
        />
        <svg
          x="41"
          y="15"
          width="18"
          height="18"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 2.875C13.0813 2.875 14.375 4.16875 14.375 5.75C14.375 7.33125 13.0813 8.625 11.5 8.625C9.91875 8.625 8.625 7.33125 8.625 5.75C8.625 4.16875 9.91875 2.875 11.5 2.875ZM11.5 15.8125C15.3813 15.8125 19.8375 17.6669 20.125 18.6875V20.125H2.875V18.7019C3.1625 17.6669 7.61875 15.8125 11.5 15.8125ZM11.5 0C8.32312 0 5.75 2.57312 5.75 5.75C5.75 8.92688 8.32312 11.5 11.5 11.5C14.6769 11.5 17.25 8.92688 17.25 5.75C17.25 2.57312 14.6769 0 11.5 0ZM11.5 12.9375C7.66187 12.9375 0 14.8637 0 18.6875V23H23V18.6875C23 14.8637 15.3381 12.9375 11.5 12.9375Z"
            fill="white"
          />
        </svg>
      </svg>
      {fillColor === "yellow" && (
        <div
          className="rounded-full bg-red-600"
          style={{
            position: "fixed",
            right: "38px",
            bottom: "28px",
            width: "8px",
            height: "8px",
          }}
        />
      )}
    </>
  );
};

export default Right;
