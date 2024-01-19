import React, { useRef, useMemo } from "react";
import { Html } from "@react-three/drei";
import earth1 from "../../../assets/images/planet01.jpg";
import earth2 from "../../../assets/images/planet02.jpg";
import earth3 from "../../../assets/images/planet03.jpg";
import earth4 from "../../../assets/images/planet04.jpg";
import earth5 from "../../../assets/images/planet05.jpg";
import earth6 from "../../../assets/images/planet06.jpg";
import earth7 from "../../../assets/images/planet07.jpg";
import earth8 from "../../../assets/images/planet08.jpg";

import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useSetRecoilState } from "recoil";
import { currentplanetState } from "../../../recoil/atoms";
import { PLANET_LIST } from "../../../constants/constants";

const MeshPlanet = ({ navigateToDetailPlanet }) => {
  const planetImage = [
    earth1,
    earth2,
    earth3,
    earth4,
    earth5,
    earth6,
    earth7,
    earth8,
  ];
  const setCurrentplanet = useSetRecoilState(currentplanetState);
  const planetList = PLANET_LIST;
  const rotationValues = Array(planetList.length)
    .fill()
    .map(() => (Math.random() - 0.5) * 0.005); // Generate random rotation values

  const meshRefs = useRef([]);
  meshRefs.current = [];
  meshRefs.current = planetList.map((_, i) => meshRefs.current[i] ?? useRef());

  useFrame(() => {
    meshRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.rotation.y += rotationValues[index];
        ref.current.rotation.x += rotationValues[index];
      }
    });
  });
  // Geometry Reuse
  const geometry = useMemo(() => new THREE.SphereGeometry(3, 32, 32), []);

  return (
    <>
      {planetList?.map((planet, index) => (
        <group key={index}>
          <mesh
            ref={meshRefs.current[index]}
            position={[planet.x, planet.y, planet.z]}
            onClick={() => {
              navigateToDetailPlanet(planet.planetId);
              setCurrentplanet(planet.planetId - 1);
            }}
          >
            <primitive object={geometry} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              // emissive="#fbf59b"
              emissiveIntensity={10}
              // emissiveIntensity={starList.starList[index].brightness}
            />
            <meshBasicMaterial
              map={useLoader(THREE.TextureLoader, planetImage[index])}
            />
          </mesh>
          <Html
            zIndexRange={[40, 0]}
            position={[planet.x, planet.y + 5, planet.z]}
          >
            <div
              className="w-20"
              style={{
                color: "white",
                fontSize: "24x",
                textAlign: "center",
              }}
            >
              {planet.name}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

export default MeshPlanet;
