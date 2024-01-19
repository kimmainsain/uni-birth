import React, { useRef, useEffect, useState, useMemo } from "react";
import { useSetRecoilState } from "recoil";
import { currentconstellationListState } from "../../../recoil/atoms";
import * as THREE from "three";
const MeshCons = ({
  constellationList,
  ConstellationIndex,
  setCurrentConstellation,
}) => {
  const meshRef = useRef();
  // frustumCulled 속성 false
  useEffect(() => {
    // meshRef.current에 접근하여 frustumCulled 속성을 false로 설정합니다.
    if (meshRef.current) {
      meshRef.current.frustumCulled = false;
    }
  }, []);

  // 별자리 반경
  const radius = 2000;
  // 별 개수 에 따라 segment 변경
  const segments = 11; // 세그먼트 수 변경 가능 갯수에 따라 달라져야 하는 로직 필요
  // count 변수
  const [vertices, setVertices] = useState([]);

  useEffect(() => {}, [ConstellationIndex]);

  // 별자리 간격 조정
  const constellationGap = 30;
  // 처음 밝기 조정
  const firstBrightness = 1;
  // 별 크기 조정
  const spherenum = 7;
  // 행성 갯수 limit 걸기
  const limitCount = 111;
  // 별자리 Z 값 변경
  const correctionZ = 0.3;

  // DetailPlanet 리스트, 인덱스 관리
  const setCurrentList = useSetRecoilState(currentconstellationListState);

  const [AllSphereList, setAllSphereList] = useState([]);

  const handleConsClick = (INDEX) => {
    setCurrentConstellation(INDEX);
  };

  useEffect(() => {
    const verticesArray = meshRef.current.geometry.attributes.position.array;
    setVertices(verticesArray);
    const newConstellationList = [];
    for (let i = segments * 3; i < verticesArray.length; i += 3) {
      if (verticesArray[i + 2] !== 0) {
        const vertex = {
          x: verticesArray[i],
          y: verticesArray[i + 1],
          z: verticesArray[i + 2],
        };
        newConstellationList.push(vertex);
      }
    }
    setAllSphereList(newConstellationList);
    // 1부터 8까지 동일함
  }, [vertices]);

  const constellationMeshes = useMemo(() => {
    const meshModels = [];
    const StarsIndexList = [];
    for (let i = 0; i < constellationList?.constellationList.length; i++) {
      if (i === limitCount) {
        break;
      }
      const position = new THREE.Vector3(0, 0, 1);
      const target = new THREE.Vector3(
        AllSphereList[i].x,
        AllSphereList[i].y,
        AllSphereList[i].z,
      );

      const direction = new THREE.Vector3()
        .subVectors(target, position)
        .normalize();

      direction.multiplyScalar(constellationGap);

      const xyz = {
        x: AllSphereList[i].x + direction.x,
        y: AllSphereList[i].y + direction.y,
        z: AllSphereList[i].z + direction.z,
        constellationId: constellationList.constellationList[i].constellationId,
      };
      StarsIndexList.push(xyz);
      const groupKey = constellationList?.constellationList[i].constellationId; // planet ID 정보로 사용 가능
      const INDEX = i;
      const group = (
        <group key={groupKey} onClick={() => handleConsClick(INDEX)}>
          {constellationList.constellationList[i].lineList.map(
            (line, index) => {
              const [x1, y1, z1, x2, y2, z2] = line;
              const geometry = new THREE.BufferGeometry();
              delete geometry.attributes.uv;
              geometry.setFromPoints([
                new THREE.Vector3(
                  x1 * constellationGap + xyz.x,
                  y1 * constellationGap + xyz.y,
                  z1 * constellationGap * correctionZ + xyz.z,
                ),
                new THREE.Vector3(
                  x2 * constellationGap + xyz.x,
                  y2 * constellationGap + xyz.y,
                  z2 * constellationGap * correctionZ + xyz.z,
                ),
              ]);
              geometry.deleteAttribute("uv");
              return (
                <line
                  frustumCulled={false}
                  ref={meshRef}
                  key={`line_${i}_${index}`}
                  geometry={geometry}
                >
                  <lineBasicMaterial
                    color="white"
                    transparent={true}
                    opacity={0.5}
                  />
                </line>
              );
            },
          )}
          {constellationList?.constellationList[i]?.pointList.map(
            (point, index) => {
              return (
                <>
                  <mesh
                    frustumCulled={false}
                    ref={meshRef}
                    key={`point_${i}_${index}`}
                    position={[
                      point.x * constellationGap + xyz.x,
                      point.y * constellationGap + xyz.y,
                      point.z * constellationGap * correctionZ + xyz.z,
                    ]}
                  >
                    <sphereGeometry args={[spherenum, 5, 5]} />
                    <meshStandardMaterial
                      color={constellationList?.constellationList[i].color}
                      emissive={constellationList?.constellationList[i].color}
                      emissiveIntensity={
                        point.brightness === -1
                          ? 1
                          : firstBrightness + point.brightness / 10
                      }
                      toneMapped={false}
                      // transparent={true}
                      // opacity={0.01}
                    />
                  </mesh>
                </>
              );
            },
          )}
          <mesh
            frustumCulled={false}
            key={`position_${groupKey}`}
            position={[
              AllSphereList[i].x,
              AllSphereList[i].y,
              AllSphereList[i].z,
            ]}
          >
            <sphereGeometry args={[180, 32, 32]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </group>
      );
      meshModels.push(group);
    }
    setCurrentList(StarsIndexList);
    return meshModels;
  }, [constellationList]);

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshBasicMaterial
          color="white"
          wireframe={true}
          transparent={true}
          opacity={0.01}
        />
      </mesh>
      {constellationMeshes}
    </>
  );
};

export default MeshCons;
