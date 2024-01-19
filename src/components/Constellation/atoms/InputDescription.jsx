import React from "react";

const InpuitDescription = ({ constellationDescp, setConstellationDescp }) => {
  // const [inputStella, setinputStella] = useState("Option 1");

  return (
    <div className="flex flex-col items-center justify-center border-b-2">
      <label
        htmlFor="constellationDescp"
        className="inline-block w-20 
          text-center font-bold text-gray-200"
      >
        설명
      </label>
      <div className="w-full">
        <div className="flex flex-row items-center justify-center">
          <p className="inline-block text-sm text-white">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
          <textarea
            style={{
              overflow: "hidden",
              resize: "none",
              minHeight: "1.5rem",
            }}
            rows="1"
            type="text"
            id="constellationDescp"
            name="constellationDescp"
            value={constellationDescp}
            maxLength={50}
            className="w-44 bg-transparent text-center text-white outline-none"
            onChange={(e) => {
              setConstellationDescp(e.target.value);
              e.target.style.height = "inherit";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            autoComplete="off"
          />
          <p className="inline-block text-sm text-white">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>
    </div>
  );
};

export default InpuitDescription;
