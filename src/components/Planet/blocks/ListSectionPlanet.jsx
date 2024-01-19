import React from "react";
import { useNavigation } from "../../../hooks/useNavigation";

const ListSectionPlanet = () => {
  const { navigateToDetailPlanet } = useNavigation();
  const planetList = [
    [1, "Planet1"],
    [2, "Planet2"],
    [3, "Planet3"],
    [4, "Planet4"],
    [5, "Planet5"],
    [6, "Planet6"],
    [7, "Planet7"],
    [8, "Planet8"],
  ];

  return (
    <div className="top-20 flex flex-row flex-wrap justify-center">
      <div className="absolute top-20">
        <div className="flex flex-row">
          {planetList?.map((planet) => (
            <div
              key={planet[0]}
              onClick={() => navigateToDetailPlanet(planet[0])}
              className="cursor-pointer rounded-lg bg-gray-300 p-4"
            >
              <p>{planet[1]}</p>
            </div>
          ))}
        </div>
      </div>
      <span className="text-white">
        이 위치에 행성 큐레이션이 나와야 합니다.
      </span>
    </div>
  );
};

export default ListSectionPlanet;
