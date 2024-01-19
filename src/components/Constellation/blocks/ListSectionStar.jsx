import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useConstellationApi from "../../../api/useConstellationApi";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import {
  starListState,
  boxnicknameState,
  boxtitleState,
  boxurlState,
  boxidState,
  boxcreatedState,
  StellaIdState,
} from "../../../recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as THREE from "three";
import Background from "../../../common/atoms/Background";
import CustomAlert from "../../../common/atoms/CustomAlert";
import Close2 from "../../../assets/icons/js/close2";
import Star2 from "../../../assets/icons/js/star2";
import LineDrawing from "../atoms/LineDrawing";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import InviteFollowStar from "../../Star/blocks/InviteFollowStar";
import InviteFollow from "../../../assets/icons/js/InviteFollow";
import DrawingIcon from "../../../assets/icons/js/DrawingIcon";

const ListSectionStar = () => {
  const ref = useRef();
  // const tooltipRef = useRef(null);
  const { constellationId } = useParams();
  const setStellaId = useSetRecoilState(StellaIdState);
  const { navigateToDetailStar } = useNavigation();
  const [starList, setStarList] = useRecoilState(starListState);
  const [starListIndex, setStarListIndex] = useState([]);
  const [alreadyPined, setAlreadyPined] = useState(false);
  const [isFulledStar, setIsFulledStar] = useState(false);
  const [responseState, setResponseState] = useState();
  // Star box Content
  const [boxnickname, setBoxnickname] = useRecoilState(boxnicknameState);
  const [boxtitle, setBoxtitle] = useRecoilState(boxtitleState);
  const [boxurl, setBoxurl] = useRecoilState(boxurlState);
  const [boxid, setBoxid] = useRecoilState(boxidState);
  const [boxcreated, setBoxcreated] = useRecoilState(boxcreatedState);
  const [brightness, setBrightness] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // tooltip
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });
  const [showModal, setShowModal] = useState(false);

  const { navigateToRegisterStar, navigateToBack } = useNavigation();
  const handleBoxClick = ({ event, index }) => {
    const mouse = new THREE.Vector2();
    mouse.x = event.clientX + 100;
    mouse.y = event.clientY - 100;
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // const rect = event.target.getBoundingClientRect();
    setTooltipStyle({
      left: `${mouse.x}px`,
      top: `${mouse.y}px`,
      display: "block",
    });

    // Set StarBox Content
    setBoxnickname(starListIndex[index]?.nickname);
    setBoxurl(starListIndex[index]?.imageUrl);
    setBoxid(starListIndex[index]?.starId);
    setBoxtitle(starListIndex[index]?.title);
    setBoxcreated(starListIndex[index]?.createdAt);
    setBrightness(starListIndex[index]?.brightness);
  };
  useEffect(() => {
    getStarList(constellationId);
    setStellaId(constellationId);
  }, [constellationId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getStarList = async (constellationId) => {
    try {
      const response = await useConstellationApi.constellationsGetConstellation(
        constellationId,
      );
      setResponseState(response.status);
      if (response.status === 200) {
        setStarList(response.resultData);
        setStarListIndex(response.resultData.starList);
        setAlreadyPined(response.resultData.alreadyPined);
        setIsFulledStar(response.resultData.completion);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("별 리스트를 불러오는데 실패했습니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("오류가 발생했습니다.");
    }
  };

  // starPotisions recoil 저장
  const starPoint = starList?.pointList;
  const num = 10; // 별 거리 조절
  const zero = 40;
  const xDamping = 20;
  const zDamping = 3;
  const rotation = [0, 0, -Math.PI / 2]; // 별 회전
  // const znum = (Math.floor(Math.random() * 11) - 5) * num;
  const starPotisions = starPoint?.map((star) => ({
    x: star[0] * num - zero,
    y: star[1] * num - xDamping,
    z: (star[2] * num) / zDamping,
    // brightness: starList?.Star.brightness,
    // starId: starList?.Star.starId,
    // memberId: starList?.Star.memberId,
    // imageUrl: starList?.Star.constellationId,
  }));

  const lines = starList?.lineList;

  const handlePinClick = async (constellationId) => {
    if (alreadyPined) {
      try {
        const response = await useConstellationApi.constellationsDeletePin(
          constellationId,
        );
        setResponseState(response.status);
        if (response.status === 200) {
          setAlreadyPined(false);
        } else if (response.status === 404) {
          setIsAlertVisible(true);
          setAlertMessage("핀 취소에 실패했습니다.");
        } else if (response.status === 403) {
          setIsAlertVisible(true);
          setAlertMessage("로그인이 필요한 서비스입니다.");
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류가 발생했습니다.");
      }
    } else {
      try {
        const response = await useConstellationApi.constellationsGetPin(
          constellationId,
        );
        setResponseState(response.status);
        setAlreadyPined(true);
      } catch (error) {}
    }
  };

  return (
    <div className="relative bottom-0 h-screen w-screen">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (
            alertMessage === "오류가 발생했습니다." ||
            responseState === 403 ||
            responseState === 404
          ) {
            navigateToBack();
          }
        }}
      />

      {!isFulledStar && (
        <button
          className="fixed bottom-56 right-4 z-10 flex flex-col text-4xl text-white"
          onClick={toggleModal}
        >
          <InviteFollow />
        </button>
      )}

      {!isFulledStar && (
        <button
          className="absolute bottom-40 right-4 z-10 flex flex-col text-lg text-white opacity-100"
          onClick={navigateToRegisterStar}
        >
          <DrawingIcon />
        </button>
      )}

      {showModal && (
        <div className="fixed bottom-56 right-4 z-50 w-64 rounded-lg shadow-lg">
          <div className="absolute inset-0 rounded-lg bg-white opacity-70"></div>
          <div className="relative rounded-lg bg-white">
            <button
              onClick={toggleModal}
              className="float-right rounded p-2 text-xl"
            >
              X
            </button>
            <InviteFollowStar />
          </div>
        </div>
      )}

      <div className="absolute right-5 top-5 z-10 text-white">
        <div
          className="mt-1 flex cursor-pointer"
          onClick={() => handlePinClick(constellationId)}
        >
          {alreadyPined ? (
            <AiFillPushpin size={30} />
          ) : (
            <AiOutlinePushpin size={30} />
          )}
        </div>
      </div>
      <Canvas camera={{ position: [0, 0, 90] }}>
        <Background />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.5} height={800} />
        </EffectComposer>
        {starPotisions?.map((star, index) => (
          <group key={index} rotation={rotation}>
            <mesh
              ref={ref}
              position={[star.x, star.y, star.z]}
              onClick={(event) => {
                if (starListIndex[index]) {
                  handleBoxClick({ event, index });
                }
              }}
            >
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial
                color={starList.color ? starList.color : "#ffffff"}
                emissive={starList.color ? starList.color : "#ffffff"}
                // emissive="#fbf59b"
                // emissiveMap={material}
                emissiveIntensity={starListIndex[index]?.brightness + 1 || 0.04}
                // emissiveIntensity={starList.starList[index].brightness}
              />
            </mesh>
          </group>
        ))}
        <LineDrawing
          lines={lines}
          num={num}
          zero={zero}
          zDamping={zDamping}
          rotation={rotation}
          xDamping={xDamping}
        />
      </Canvas>
      <div>
        {/* 별을 클릭했을 때 위치 조정 필요 */}
        <div
          className={`
  absolute z-50
  w-screen max-w-screen-sm rounded-lg bg-slate-600 bg-opacity-80 p-2
  ${tooltipStyle.display === "none" ? "hidden" : ""}`}
          style={
            {
              bottom: "30%",
              left: "50%",
              transform: "translateX(-50%)",
            }
            // parseInt(tooltipStyle.left) < 400
            //   ? { left: tooltipStyle.left, top: tooltipStyle.top }
            //   : { left: tooltipStyle.left - 400, top: tooltipStyle.top }
            // right: `${
            //   window.innerWidth -
            //   parseInt(tooltipStyle.left) -
            //   tooltipRef.current.offsetWidth
            // }px`,
            // top: tooltipStyle.top,
          }
        >
          <div className="relative flex flex-col items-center justify-center font-Pretendard text-white">
            <button
              className="absolute right-1 top-1 rounded-lg font-bold"
              onClick={() =>
                setTooltipStyle({ ...tooltipStyle, display: "none" })
              }
            >
              <Close2 />
            </button>
            <div className="flex-flex-row relative">
              <div className="flex items-center justify-center">
                <img
                  className="mt-10 h-64 w-80 rounded-lg"
                  src={boxurl}
                  alt="star"
                  style={{ objectFit: "cover", overflow: "hidden" }}
                />
                <div
                  className="absolute left-0 top-10 flex items-center p-2 font-bold text-white"
                  style={{
                    zIndex: 1,
                    verticalAlign: "text-bottom",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <Star2 />
                  <p className="mb-0 ml-2 text-purple-500">: {brightness}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between p-2">
                  <p className="flex font-bold">{boxnickname}</p>
                  <p className="flex">{boxcreated?.slice(0, 10)}</p>
                </div>
                <p className="overflow-ellipsis p-2">{boxtitle}</p>
                <p></p>
              </div>
            </div>
            <button
              className="my-4 w-40 rounded-full border-2 bg-transparent p-2 text-white"
              onClick={() => navigateToDetailStar(boxid)}
            >
              상세정보
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSectionStar;
