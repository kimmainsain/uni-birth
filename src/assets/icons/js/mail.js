import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import { get, ref } from "firebase/database";
import { database } from "../../../api/useFirebaseApi";

const Mail = () => {
  const nickname = useRecoilValue(nicknameState);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [checkUpdate, setCheckUpdate] = useState(null);

  useEffect(() => {
    const fetchUpdates = async () => {
      const checkUpdateRef = ref(database, `checkMessage/${nickname}`);
      const checkUpdateSnapshot = await get(checkUpdateRef);
      if (checkUpdateSnapshot.exists()) {
        setCheckUpdate(checkUpdateSnapshot.val());
      }

      const lastUpdateRef = ref(database, `updateMessage/${nickname}`);
      const lastUpdateSnapshot = await get(lastUpdateRef);
      if (lastUpdateSnapshot.exists()) {
        setLastUpdate(lastUpdateSnapshot.val());
      }
    };

    fetchUpdates();
  }, [nickname]);

  const fillColor = lastUpdate > checkUpdate ? "yellow" : "white";

  return (
    <div className="relative">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 0H0.012L0 18H24V0ZM21.6 15.75H2.4V4.5L12 10.125L21.6 4.5V15.75ZM12 7.875L2.4 2.25H21.6L12 7.875Z"
          fill="white"
        />
      </svg>
      {fillColor === "yellow" && (
        <div
          className="rounded-full bg-red-600"
          style={{
            position: "absolute",
            right: "-10px",
            top: "-1px",
            width: "8px",
            height: "8px",
          }}
        />
      )}
    </div>
  );
};

export default Mail;
