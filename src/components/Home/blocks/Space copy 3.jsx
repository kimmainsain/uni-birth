// import React, { useRef, useMemo } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// // import { OrbitControls } from "@react-three/drei";

// function Space() {
//   const starsRef = useRef();

//   const [starGeo, starMaterial] = useMemo(() => {
//     const starGeo = new THREE.SphereGeometry(1, 8, 8);
//     const vertices = [];
//     const velocity = [];
//     const acceleration = [];

//     for (let i = 0; i < 1000; i++) {
//       vertices.push(
//         Math.random() * 600 - 300,
//         Math.random() * 600 - 300,
//         Math.random() * 600 - 300,
//       );
//       velocity.push(0);
//       acceleration.push(0.003);
//     }

//     starGeo.setAttribute(
//       "position",
//       new THREE.Float32BufferAttribute(vertices, 3),
//     );
//     starGeo.setAttribute(
//       "velocity",
//       new THREE.Float32BufferAttribute(velocity, 1),
//     );
//     starGeo.setAttribute(
//       "acceleration",
//       new THREE.Float32BufferAttribute(acceleration, 0.5),
//     );

//     const starMaterial = new THREE.MeshBasicMaterial({
//       color: new THREE.Color(Math.random(), Math.random(), Math.random()),
//       // transparent: true,
//       // blending: THREE.MultiplyBlending,
//     });

//     return [starGeo, starMaterial];
//   }, []);

//   useFrame(({ camera }) => {
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
//       {/* <OrbitControls /> */}
//       <group ref={starsRef}>
//         <sphereGeometry attach="geometry" {...starGeo} />
//         <pointsMaterial attach="material" {...starMaterial} />
//       </group>
//     </>
//   );
// }

// export default Space;
