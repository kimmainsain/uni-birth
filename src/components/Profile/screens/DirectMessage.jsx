import React, { useState, useEffect, useRef } from "react";
import Header1 from "../../../common/blocks/Header1";
import Button2 from "../../../common/atoms/Button2";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import { useNavigation } from "../../../hooks/useNavigation";
import {
  sendMessage,
  listenForMessages,
  updateMessage,
} from "../../../api/useFirebaseApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useLocation } from "react-router-dom";
import MessageSend from "../../../assets/icons/js/messageSend";

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const nickname = useRecoilValue(nicknameState);
  const location = useLocation();
  const locationNickname = location.state;
  const [newMessage, setNewMessage] = useState("");

  const { navigateToBack } = useNavigation();

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 50) {
      setNewMessage(inputValue);
    }
  };

  const backClick = () => {
    navigateToBack(); // 화면 이동을 처리하는 함수를 호출합니다.
  };
  const buttonsHeader = [
    {
      component: Button2,
      onClick: () => backClick(nickname),
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white">{locationNickname}</span>
      ),
    },
  ];

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const addNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const detachListener = listenForMessages(
      addNewMessage,
      nickname,
      locationNickname,
    );

    return () => {
      detachListener();
    };
  }, [nickname, locationNickname]);

  const handleSend = async () => {
    if (newMessage.trim()) {
      await sendMessage(newMessage, nickname, locationNickname);
      setNewMessage("");
      await updateMessage(locationNickname, Date.now());
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-0">
      <header className="fixed top-0 z-10 w-full bg-black bg-opacity-90">
        <Header1 buttons={buttonsHeader} />
      </header>
      <div className="px-4">
        <div className="pt-10">
          <div className="chat-container mt-10">
            <div
              className="messages flex flex-col"
              style={{ paddingBottom: "100px" }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`
              mt-2 flex justify-between rounded-md bg-gray-800 p-2 
              ${message.sender === nickname ? "ml-auto" : ""} 
              ${message.sender === locationNickname ? "mr-auto" : ""} 
            `}
                  style={{ maxWidth: "50%", wordWrap: "break-word" }}
                >
                  <div
                    className="flex-grow"
                    style={{ maxWidth: "90%", wordWrap: "break-word" }}
                  >
                    <p className="text-white">{message.text}</p>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <span className="ml-2 text-xs text-gray-500">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 mx-auto flex w-full max-w-screen-sm items-center border-t border-gray-200 px-4 py-2 ">
        <input
          className="mr-2 h-10 w-full rounded-full border p-2"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="메시지 입력..."
        />
        <button
          className="h-10 rounded-full bg-purple-600 px-4 py-2 text-white"
          onClick={handleSend}
        >
          <MessageSend />
        </button>
      </div>
    </div>
  );
};

export default DirectMessage;
