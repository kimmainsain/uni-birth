import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
const Line = ({ start, end, rotation }) => {
  const lineRef = useRef();
  const startPoint = new THREE.Vector3(...start);
  const endPoint = new THREE.Vector3(...end);
  const currentPoint = new THREE.Vector3().copy(startPoint);
  useFrame(() => {
    if (lineRef.current) {
      const lineGeometry = lineRef.current.geometry;
      currentPoint.lerp(endPoint, 0.02);

      lineGeometry.setFromPoints([startPoint, currentPoint]);
      lineGeometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef} rotation={rotation}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  );
};

const LineDrawing = ({ lines, num, zero, zDamping, rotation, xDamping }) => {
  if (lines) {
    return (
      <>
        {lines.map((line, index) => (
          <Line
            rotation={rotation}
            key={index}
            start={[
              line[0] * num - zero,
              line[1] * num - xDamping,
              (line[2] * num) / zDamping,
            ]}
            end={[
              line[3] * num - zero,
              line[4] * num - xDamping,
              (line[5] * num) / zDamping,
            ]}
          />
        ))}
      </>
    );
  }
};

export default LineDrawing;
