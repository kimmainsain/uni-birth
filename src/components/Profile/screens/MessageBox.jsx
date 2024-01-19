import React, { useEffect, useState } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import {
  database,
  ref,
  onValue,
  off,
  checkMessage,
} from "../../../api/useFirebaseApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { nicknameState, targetNicknameState } from "../../../recoil/atoms";
import MessageBig from "../../../assets/icons/js/messageBig";

const MessageBox = () => {
  const nickname = useRecoilValue(nicknameState);
  const [chatRooms, setChatRooms] = useState([]);
  const { navigateToDirectMessage, navigateToBack } = useNavigation();
  const setTargetNickname = useSetRecoilState(targetNicknameState);
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => <span className="ml-4 text-2xl text-white">메시지</span>,
    },
  ];

  const handleNavigateToChat = (chatId) => {
    const [sender, target] = chatId.split("_");
    const otherNickname = sender === nickname ? target : sender;
    setTargetNickname(otherNickname);
    navigateToDirectMessage(otherNickname); // 해당 페이지로 이동
  };

  useEffect(() => {
    const chatRef = ref(database, "chats");
    const handleNewChatRoom = (snapshot) => {
      const allChats = snapshot.val();
      const userChats = Object.entries(allChats || {}).filter(([chatId]) => {
        const [sender, target] = chatId.split("_");
        return sender === nickname || target === nickname;
      });

      // timestamp를 기준으로 내림차순 정렬
      userChats.sort(([, chatDataA], [, chatDataB]) => {
        const messagesA = Object.values(chatDataA);
        const messagesB = Object.values(chatDataB);

        const lastTimestampA = messagesA[messagesA.length - 1]?.timestamp || 0;
        const lastTimestampB = messagesB[messagesB.length - 1]?.timestamp || 0;

        return lastTimestampB - lastTimestampA;
      });

      setChatRooms(userChats);
    };

    onValue(chatRef, handleNewChatRoom);

    return () => {
      off(chatRef, "value", handleNewChatRoom);
    };
  }, [nickname]);

  useEffect(() => {
    checkMessage(nickname, Date.now());
  }, []);

  return (
    <div className="mx-auto h-screen max-w-screen-sm bg-slate-100 bg-opacity-0">
      <div>
        <Header2 buttons={buttonsHeader} />
        {chatRooms.length === 0 ? (
          <div className="text-center">
            <p className="border-t"></p>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <MessageBig className="mx-auto" />
              <p className="text-white text-opacity-60">
                메시지 내역이 없습니다.
              </p>
            </div>
          </div>
        ) : (
          <ul>
            {chatRooms.map(([chatId, chatData]) => {
              const [sender, target] = chatId.split("_");
              const otherNickname = sender === nickname ? target : sender;

              const messages = Object.values(chatData);
              const lastMessage = messages[messages.length - 1];

              return (
                <li
                  key={chatId}
                  className="border-t px-4 py-4 text-white"
                  onClick={() => handleNavigateToChat(chatId)}
                >
                  <strong className="text-xl">{otherNickname}</strong>
                  <div className="py-1"></div>
                  {lastMessage && (
                    <div
                      className="text-sm"
                      style={{
                        maxHeight: "10em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {lastMessage.text}
                    </div>
                  )}
                </li>
              );
            })}
            <li className="border-t"></li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
