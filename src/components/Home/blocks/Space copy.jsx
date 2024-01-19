// import React, { useMemo, useRef } from "react";
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
//       const velocity = new THREE.Vector3(
//         (Math.random() - 0.5) / 10,
//         (Math.random() - 0.5) / 10,
//         (Math.random() - 0.5) / 10,
//       );
//       const acceleration = new THREE.Vector3(0, 0, 0);
//       const brightness = Math.random();
//       const color = new THREE.Color(
//         Math.random(),
//         Math.random(),
//         Math.random(),
//       );

//       spheres.push({ position, velocity, acceleration, brightness, color });
//     }
//     return spheres;
//   }, []);

//   const meshRefs = useRef([]);
//   meshRefs.current = stars.map((_, i) => meshRefs.current[i] || useRef());

//   useFrame(({ camera }) => {
//     stars.forEach((star, index) => {
//       const mesh = meshRefs.current[index].current;

//       // Update position based on velocity and acceleration
//       star.velocity.add(star.acceleration);
//       mesh.position.add(star.velocity);

//       // Reset if out of bounds
//       if (mesh.position.y < -200) {
//         mesh.position.y = 200;
//         star.velocity.set(0, 0, 0);
//       }

//       // Calculate distance from the camera
//       const dx = camera.position.x - mesh.position.array[index * 3];
//       const dy = camera.position.y - mesh.position.array[index * 3 + 1];
//       const dz = camera.position.z - mesh.position.array[index * 3 + 2];
//       const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

//       // Adjust opacity based on distance
//       const minDist = 50; // Minimum distance for full opacity
//       const maxDist = 200; // Maximum distance for zero opacity
//       mesh.material.opacity = THREE.MathUtils.clamp(
//         0.5 - (distance - minDist) / (maxDist - minDist),
//         0,
//         0.5,
//       );
//     });
//   });

//   return (
//     <>
//       <axesHelper scale={5} />
//       {stars.map((star, index) => (
//         <mesh
//           ref={meshRefs.current[index]}
//           position={star.position}
//           key={index}
//         >
//           <sphereGeometry args={[1, 32, 32]} />
//           <meshStandardMaterial
//             transparent // Added for opacity to work
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
