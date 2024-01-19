import React from "react";
import { Stars, OrbitControls } from "@react-three/drei";

const Canvas = () => {
  return (
    <>
      <OrbitControls
        autoRotate={true}
        autoRotateSpeed={-0.5}
        rotateSpeed={-0.25}
      />
      <Stars
        radius={100}
        depth={50}
        count={10000}
        factor={4}
        saturation={3}
        fade
      />
    </>
  );
};

export default Canvas;
