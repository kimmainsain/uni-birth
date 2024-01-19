import React from "react";
import Button1 from "../atoms/Button1";
import { useNavigation } from "../../hooks/useNavigation";

const QurationStar = ({ data }) => {
  const { navigateToDetailStar, navigateToDetailConstellation } =
    useNavigation();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* 이미지 */}
      <div
        className="w-full cursor-pointer"
        onClick={() => navigateToDetailStar(data.starId)}
      >
        <img
          src={data.imageUrl}
          alt="별 이미지"
          className="mb-4 h-auto max-h-96 w-full object-cover"
        />
      </div>

      <div className="mb-2 flex w-full items-center justify-between pl-4">
        <div className="text-xl font-bold">{data.title}</div>
        <div className="flex">
          <Button1
            value="별 자리"
            className="text-base font-normal"
            onClick={() => navigateToDetailConstellation(data.constellationId)}
          />
        </div>
      </div>

      {/* 닉네임, 내용 및 버튼 */}
      <div className="mb-4 flex w-full justify-between pl-4 pr-1">
        <div
          className="flex h-12 w-2/3 self-start text-xl text-white"
          style={{
            wordBreak: "break-all",
            textOverflow: "ellipsis",
          }}
        >
          {data?.content
            ?.split("\n")
            .slice(0, 2)
            .map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
        </div>

        <div className="mb-2 ml-4 w-1/3 text-end font-bold">
          {data.nickname}
        </div>
      </div>
    </div>
  );
};

export default QurationStar;
