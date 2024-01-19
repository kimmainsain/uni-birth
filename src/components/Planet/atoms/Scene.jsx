import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Scene = () => {
  const cameraRef = useRef();

  useFrame(({ camera }) => {
    cameraRef.current = camera;
  });

  return (
    <>
      <OrbitControls
        ref={cameraRef}
        enableDamping
        dampingFactor={0.05}
        enablePan
        panSpeed={0.5}
      />
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
      <axesHelper scale={5} />
      <color attach="background" args={["black"]} />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={1}
        fade
      />
    </>
  );
};

export default Scene;
