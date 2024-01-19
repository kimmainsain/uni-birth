import React, { useMemo } from "react";
import { Line } from "@react-three/drei";

const MeshConstellation = ({
  constellationList,
  num,
  starmultiple,
  xdamper,
}) => {
  const constellationMeshes = useMemo(
    () =>
      constellationList?.constellationList.flatMap((constellation, index) => {
        const { boardSize, constellationId, imageUrl, lineList, title, color } =
          constellation;

        return lineList.flatMap((line) => {
          const [y1, x1, z1, y2, x2, z2] = line;

          return (
            <>
              <mesh
                key={`${constellationId}-${index}-1`}
                position={[
                  x1 * starmultiple + num * index + xdamper,
                  y1 * starmultiple,
                  z1 * starmultiple,
                ]}
                onClick={() =>
                  handleBoxClick(constellationId, title, boardSize, imageUrl)
                }
              >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={5}
                />
              </mesh>
              <mesh
                key={`${constellationId}-${index}-2`}
                position={[
                  x2 * starmultiple + num * index + xdamper,
                  y2 * starmultiple,
                  z2 * starmultiple,
                ]}
                onClick={() =>
                  handleBoxClick(constellation, constellationId, title)
                }
              >
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={5}
                />
              </mesh>
              <mesh>
                <Line
                  key={index}
                  points={[
                    [
                      x1 * starmultiple + num * index + xdamper,
                      y1 * starmultiple,
                      z1 * starmultiple,
                    ],
                    [
                      x2 * starmultiple + num * index + xdamper,
                      y2 * starmultiple,
                      z2 * starmultiple,
                    ],
                  ]}
                  color="white"
                />
              </mesh>
            </>
          );
        });
      }),
    [constellationList],
  );

  return <>{constellationMeshes}</>;
};

export default MeshConstellation;
