import React from "react";
import { Routes, Route } from "react-router-dom";

// Home
import Home from "./components/Home/screens/Home";

// Member
import LoginMember from "./components/Member/screens/LoginMember";
import RegisterMember from "./components/Member/screens/RegisterMember";
import ModifyMember from "./components/Member/screens/ModifyMember";

// Constellation
import DetailConstellation from "./components/Constellation/screens/DetailConstellation";
import RegisterConstellation from "./components/Constellation/screens/RegisterConstellation";
import DrawingConstellation from "./components/Constellation/screens/DrawingConstellation";
// Planet
import DetailPlanet from "./components/Planet/screens/DetailPlanet";
import MainPlanet from "./components/Planet/screens/MainPlanet";

// Profile
import MemberProfile from "./components/Profile/screens/MemberProfile";
// import Followings from "./components/Profile/screens/Followings";
// import Followers from "./components/Profile/screens/Followers";
import Follow from "./components/Profile/screens/Follow";
import ModifyProfile from "./components/Profile/screens/ModifyProfile";
import DirectMessage from "./components/Profile/screens/DirectMessage";
import MessageBox from "./components/Profile/screens/MessageBox";
import MyStars from "./components/Profile/screens/MyStars";
import UserAlarm from "./components/Profile/screens/UserAlarm";

// Star
import RegisterStar from "./components/Star/screens/RegisterStar";
import DetailStar from "./components/Star/screens/DetailStar";

// Search
import SearchCommon from "./common/screens/SearchCommon";
import SearchQuration from "./common/screens/SearchQuration";
import { Canvas } from "@react-three/fiber";
import Background from "./common/atoms/Background";
import { useRecoilValue } from "recoil";
import { backgroundflagState } from "./recoil/atoms";

const App = () => {
  const backgroundflag = useRecoilValue(backgroundflagState);
  return (
    <div className="">
      {backgroundflag && (
        <div className="fixed z-0 h-screen w-screen">
          <Canvas>
            <Background />
          </Canvas>
        </div>
      )}
      <div className="absolute h-screen w-screen font-Pretendard">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/members/login" element={<LoginMember />} />
          <Route path="/members/profiles/:id" element={<ModifyProfile />} />
          <Route path="/members/register" element={<RegisterMember />} />
          <Route path="/planets/:planetId" element={<DetailPlanet />} />
          <Route path="/planets" element={<MainPlanet />} />
          <Route
            path="/constellations/detail/:constellationId"
            element={<DetailConstellation />}
          />
          <Route
            path="/constellations/register"
            element={<RegisterConstellation />}
          />
          <Route
            path="/constellations/drawing"
            element={<DrawingConstellation />}
          />
          <Route path="/stars/register" element={<RegisterStar />} />
          <Route path="/profiles" element={<MemberProfile />} />
          <Route path="/stars/detail/:starId" element={<DetailStar />} />
          <Route path="/profiles/follow" element={<Follow />} />
          {/* <Route path="/profiles/followings" element={<Followings />} />
          <Route path="/profiles/followers" element={<Followers />} /> */}
          <Route path="/stars" element={<MyStars />} />
          <Route path="/useralarm" element={<UserAlarm />} />
          <Route path="/members/profiles" element={<ModifyProfile />} />
          <Route path="/members/update" element={<ModifyMember />} />
          <Route path="/profiles/directmessage" element={<DirectMessage />} />
          <Route path="/profiles/messagebox" element={<MessageBox />} />
          <Route path="/search/quration" element={<SearchQuration />} />
          <Route path="/search" element={<SearchCommon />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
