import React, { useState, useRef, useEffect } from "react";
import { PLANET_LIST } from "../../../constants/constants";

const InputDropDown2 = ({ planetId, setPlanetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleContainer = useRef(null);

  const handleSelect = (value) => {
    setPlanetId(value);
    setIsOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (
      toggleContainer.current &&
      !toggleContainer.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border-double bg-transparent text-white"
      ref={toggleContainer}
    >
      <div className="relative flex w-40 justify-center text-white">
        <button
          type="button"
          className=" flex w-32 flex-row justify-center rounded-lg border bg-transparent p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>{PLANET_LIST[planetId - 1]?.name}</div>
        </button>
        <div
          className={`absolute mt-2 rounded-lg ${
            isOpen
              ? "visible opacity-100 transition-all duration-300 ease-out"
              : "invisible opacity-0 transition-all duration-300 ease-out"
          }`}
        >
          {isOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 rounded-lg border bg-black bg-opacity-75">
              {PLANET_LIST.map((planet) => (
                <div
                  className="flex w-32 cursor-pointer
                      justify-center p-2"
                  key={planet.planetId}
                  onClick={() => {
                    handleSelect(planet.planetId);
                    setIsOpen(false);
                  }}
                >
                  {planet.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputDropDown2;
