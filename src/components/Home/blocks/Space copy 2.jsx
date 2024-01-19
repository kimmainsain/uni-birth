// import React, { useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// function Space() {
//   const stars = useMemo(() => {
//     const spheres = [];
//     for (let i = 0; i < 1000; i++) {
//       const position = new THREE.Vector3(
//         Math.random() * 600 - 300,
//         Math.random() * 600 - 300,
//         Math.random() * 600 - 300,
//       );
//       const brightness = Math.random();
//       const color = new THREE.Color(
//         Math.random(),
//         Math.random(),
//         Math.random(),
//       );

//       spheres.push({ position, brightness, color });
//     }
//     return spheres;
//   }, []);

//   useFrame(({ starsRef, camera }) => {
//     const position = starsRef.current.geometry.attributes.position;
//     const velocity = starsRef.current.geometry.attributes.velocity;
//     const acceleration = starsRef.current.geometry.attributes.acceleration;

//     for (let i = 0; i < position.count; i++) {
//       velocity.array[i] += acceleration.array[i];
//       position.array[i * 3 + 1] -= velocity.array[i];

//       if (position.array[i * 3 + 1] < -200) {
//         position.array[i * 3 + 1] = 200;
//         velocity.array[i] = 0;
//       }
//       // Calculate distance from the camera
//       const dx = camera.position.x - position.array[i * 3];
//       const dy = camera.position.y - position.array[i * 3 + 1];
//       const dz = camera.position.z - position.array[i * 3 + 2];
//       const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

//       // Adjust opacity based on distance
//       const minDist = 50; // Minimum distance for full opacity
//       const maxDist = 200; // Maximum distance for zero opacity
//       starsRef.current.material.opacity = THREE.MathUtils.clamp(
//         0.5 - (distance - minDist) / (maxDist - minDist),
//         0,
//         0.5,
//       );
//     }

//     position.needsUpdate = true;

//     starsRef.current.rotation.y += 0.002;
//   });

//   return (
//     <>
//       <axesHelper scale={5} />
//       {stars.map((star, index) => (
//         <mesh position={star.position} key={index}>
//           <sphereGeometry args={[1, 32, 32]} />
//           <meshStandardMaterial
//             color={star.color}
//             emissive={star.color}
//             emissiveIntensity={star.brightness + 1 || 0.04}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }

// export default Space;
