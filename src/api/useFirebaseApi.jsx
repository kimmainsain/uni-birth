import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  onValue,
  off,
  set,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCyOsqoZjmx3f75EIqqrrcFQrN2XsDZbeQ",
  authDomain: "uni-birth.firebaseapp.com",
  databaseURL: "https://uni-birth-default-rtdb.firebaseio.com",
  projectId: "uni-birth",
  storageBucket: "uni-birth.appspot.com",
  messagingSenderId: "157033568661",
  appId: "1:157033568661:web:bf12dbf7828658a87c3e9c",
  measurementId: "G-914K1QHY2Y",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

function sendMessage(message, sender, target) {
  const chatRoomId = [sender, target].sort().join("_");
  const chatRef = ref(database, `chats/${chatRoomId}`);

  const newMessageRef = push(chatRef);

  const messageData = {
    text: message,
    sender,
    timestamp: Date.now(),
  };

  set(newMessageRef, messageData);
}

function updateMessage(target, time) {
  const updateRef = ref(database, `updateMessage/${target}`);
  set(updateRef, `${time}`);
}

function checkMessage(target, time) {
  const checkRef = ref(database, `checkMessage/${target}`);
  set(checkRef, `${time}`);
}

function updateAlarm(target, time) {
  const updateRef = ref(database, `updateAlarm/${target}`);
  set(updateRef, `${time}`);
}

function checkAlarm(target, time) {
  const checkRef = ref(database, `checkAlarm/${target}`);
  set(checkRef, `${time}`);
}

function listenForMessages(callback, sender, target) {
  const chatRoomId = [sender, target].sort().join("_");
  const chatRef = ref(database, `chats/${chatRoomId}`);
  const offChildAdded = onChildAdded(chatRef, (snapshot) => {
    const newMessage = snapshot.val();
    callback(newMessage);
  });

  return () => {
    offChildAdded();
  };
}

function sendInvite(
  sender,
  targetNickname,
  constellationTitle,
  constellationId,
) {
  const inviteRef = ref(database, `invited/${targetNickname}`);
  const newInviteRef = push(inviteRef);

  const inviteData = {
    sender,
    timestamp: Date.now(),
    constellationTitle,
    constellationId,
  };

  set(newInviteRef, inviteData);
}

export {
  app,
  analytics,
  storage,
  database,
  ref,
  onValue,
  off,
  sendMessage,
  sendInvite,
  listenForMessages,
  updateMessage,
  checkMessage,
  updateAlarm,
  checkAlarm,
};
