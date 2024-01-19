import React, { useRef, useState, useEffect } from "react";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GradientBackground from "../../../common/atoms/GradientBackground";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  backgroundflagState,
  currentConsIndexState,
  currentconstellationListState,
} from "../../../recoil/atoms";
import MeshCons from "../atoms/MeshCons";
import { gsap } from "gsap";
import HtmlConstellation from "../atoms/HtmlConstellation";
import { useNavigation } from "../../../hooks/useNavigation";
import DrawingIcon from "../../../assets/icons/js/DrawingIcon";
// import Zoomout from "../../../assets/icons/js/zoomout";
// import Zoomin from "../../../assets/icons/js/zoomin";
import { PiCubeFocus } from "react-icons/pi";
import Button1 from "../../../common/atoms/Button1";

// R3F 훅 카메라 컨트롤러 컴포넌트
function CameraController({
  setEnableFlag,
  ConstellationPosition,
  zoomed,
  setRotateFlag,
  setIsVisible,
}) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const zoomFactor = 0.1;
  const multiFactor = 1.5;
  useEffect(() => {}, [ConstellationPosition]);
  useEffect(() => {
    if (ConstellationPosition) {
      const targetPosition = zoomed
        ? {
            x: ConstellationPosition.x * multiFactor + 4000,
            y: ConstellationPosition.y * multiFactor - 5000,
            z: ConstellationPosition.z * multiFactor + 4000,
          }
        : {
            x: ConstellationPosition.x * zoomFactor,
            y: ConstellationPosition.y * zoomFactor,
            z: ConstellationPosition.z * zoomFactor,
          };
      const startPosition = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      };

      const updateCameraPosition = () => {
        cameraRef.current.position.set(
          startPosition.x,
          startPosition.y,
          startPosition.z,
        );
        cameraRef.current.lookAt(0, 0, 0);
        cameraRef.current.updateProjectionMatrix();
      };

      gsap.to(startPosition, {
        duration: 1.5, // duration in seconds
        x: -targetPosition.x,
        y: -targetPosition.y,
        z: -targetPosition.z,
        onStart: () => {
          setEnableFlag(false);
          setIsVisible(true);
        },
        onUpdate: updateCameraPosition,
        ease: "Power1.inOut",
        onComplete: () => {
          setEnableFlag(true);
          if (zoomed) {
            setRotateFlag(true);
          } else {
            setRotateFlag(false);
          }
        },
      });
    }
  }, [ConstellationPosition, zoomed]);
  return null;
}

const Scene = ({ constellationList }) => {
  // 화면 회전
  const [enabledFlag, setEnableFlag] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const setBackgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    setBackgroundflag(false);
  }, []);
  const controlsRef = useRef();
  const { navigateToRegisterConstellation } = useNavigation();
  useEffect(() => {}, [constellationList]);

  // 별자리 인덱스 이동
  const [ConstellationIndex, setConstellationIndex] = useRecoilState(
    currentConsIndexState,
  );
  const currentconstellationList = useRecoilValue(
    currentconstellationListState,
  );

  // 확대 축소
  const [zoomed, setZoomed] = useState(false);
  // 별자리 보정계수
  // const moveNum = 50;

  // 별자리 인덱스
  const [currentConstellation, setCurrentConstellation] = useState(
    ConstellationIndex % currentconstellationList.length,
  );
  // orbitcontrolsRotation
  const [rotateFlag, setRotateFlag] = useState(false);

  const handleButtonClick = (direction) => {
    if (buttonClicked) return;

    setButtonClicked(true);

    setTimeout(() => {
      setButtonClicked(false); // 일정 시간 후 버튼 눌림 상태를 초기화
    }, 800); // 800ms 후에 다시 버튼을 누를 수 있게 설정

    if (direction === "left") {
      setIsVisible(true);
      setCurrentConstellation((prevIndex) =>
        prevIndex === currentconstellationList.length - 1 ? 0 : prevIndex + 1,
      );
      setConstellationIndex((prevIndex) =>
        prevIndex === currentconstellationList.length - 1 ? 0 : prevIndex + 1,
      );
    } else if (direction === "right") {
      setIsVisible(true);
      setCurrentConstellation((prevIndex) =>
        prevIndex === 0 ? currentconstellationList.length - 1 : prevIndex - 1,
      );
      setConstellationIndex((prevIndex) =>
        prevIndex === 0 ? currentconstellationList.length - 1 : prevIndex - 1,
      );
    }
  };

  const preventKeyClick = (e) => {
    if (e.key === "Enter" || e.key === " ") e.preventDefault();
  };

  // 확대축소 버튼
  const handleZoomClick = () => {
    setZoomed(!zoomed);
  };

  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <button
        className="absolute left-4 top-1/2 z-10 flex flex-col text-4xl text-white opacity-50"
        onClick={() => handleButtonClick("left")}
        onKeyDown={preventKeyClick}
      >
        <BiSolidLeftArrow />
      </button>
      <button
        className="absolute right-4 top-1/2 z-10 flex flex-col text-4xl text-white opacity-50"
        onClick={() => handleButtonClick("right")}
        onKeyDown={preventKeyClick}
      >
        <BiSolidRightArrow />
      </button>
      <button
        className="absolute bottom-40 right-4 z-10 flex flex-col text-lg text-white opacity-100"
        onClick={navigateToRegisterConstellation}
      >
        <DrawingIcon />
      </button>
      <Button1
        className="absolute bottom-24 right-4 z-10 flex flex-col text-4xl text-white opacity-100"
        onClick={handleZoomClick}
        icon={<PiCubeFocus size={30} />}
      />

      <HtmlConstellation
        constellationId={
          currentconstellationList[currentConstellation]?.constellationId
        }
        currentconstellationList={currentconstellationList}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, -500, 0]}
          near={0.1}
          far={12000}
          fov={40}
        />
        <GradientBackground />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0}
            height={200}
            intensity={0.5}
          />
        </EffectComposer>
        <Stars
          radius={2300}
          depth={30}
          count={1500}
          factor={4}
          saturation={1}
          fade
        />
        <MeshCons
          constellationList={constellationList}
          ConstellationIndex={ConstellationIndex}
          setConstellationIndex={setConstellationIndex}
          setCurrentConstellation={setCurrentConstellation}
          currentConstellation={currentConstellation}
        />
        <OrbitControls
          enabled={enabledFlag}
          ref={controlsRef}
          // enablePan={true}
          enableDamping={true}
          rotateSpeed={-0.2}
          // minDistance={1} // minimum zoom distance
          maxDistance={9000} // maximum zoom distance
          dampingFactor={0.5}
          autoRotate={rotateFlag}
          autoRotateSpeed={0.3}
          enablepen={false}
        />
        <CameraController
          ConstellationPosition={currentconstellationList[currentConstellation]}
          controlsRef={controlsRef}
          zoomed={zoomed}
          setRotateFlag={setRotateFlag}
          setEnableFlag={setEnableFlag}
          setIsVisible={setIsVisible}
        />
      </Canvas>
    </>
  );
};

export default Scene;
