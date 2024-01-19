import React, { useRef } from "react";
const SpreadConstellation = ({ constellationList, constellationPosition }) => {
  const meshRef = useRef();
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color="hotpink" wireframe={true} />
    </mesh>
  );
};

export default SpreadConstellation;
