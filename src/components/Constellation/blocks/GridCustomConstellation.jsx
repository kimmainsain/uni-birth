import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect, Line, Star } from "react-konva";
import Button1 from "../../../common/atoms/Button1";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../api/useFirebaseApi";
import useConstellationApi from "../../../api/useConstellationApi";
import { useRecoilState } from "recoil";
import { boardSizeState, constellationLimitState } from "../../../recoil/atoms";
import { useNavigation } from "../../../hooks/useNavigation";
import PickConstellationColor from "../atoms/PickConstellationColor";
import CustomAlert from "../../../common/atoms/CustomAlert";
import { PLANET_LIST } from "../../../constants/constants";

const GridCustomConstellation = ({
  planetId,
  constellationName,
  constellationDescp,
  pointList,
  lineList,
  constellationColor,
  setconstellationColor,
}) => {
  const [points, setPoints] = useState([]);
  const [lines, setLines] = useState([]);
  const [grid, setGrid] = useState([]);
  const [shouldDeduplicate, setShouldDeduplicate] = useState(false);
  const [lastPoints, setLastPoints] = useState([]);
  const linesAndPointsLayerRef = useRef(null);
  const boardSize = useRecoilState(boardSizeState);
  const [constellationLimit, setConstellationLimit] = useRecoilState(
    constellationLimitState,
  );
  const stageSize = boardSize[0] * 50;
  const containerStyle = boardSize[0] === 5 ? "max-w-md mx-auto" : "w-full";
  const [templatePointSize, setTemplatePointsSize] = useState(0);
  const [templateLineSize, setTemplateLinesSize] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { navigateToDetailConstellation } = useNavigation();
  useEffect(() => {
    if (shouldDeduplicate) {
      deDuplication(lastPoints);
      setShouldDeduplicate(false);
    }
  }, [shouldDeduplicate, lastPoints]);

  useEffect(() => {
    if (pointList && lineList) {
      setTemplatePointsSize(pointList.length);
      setTemplateLinesSize(lineList.length);
      const updateGrid = grid.map((y) => y.slice());
      pointList.forEach((point) => {
        const yIndex = point[0];
        const xIndex = point[1];
        updateGrid[yIndex][xIndex] = true;
      });
      setGrid(updateGrid);
      setPoints(
        pointList.map((point) => ({
          centerY: point[0] * 50 + 25,
          centerX: point[1] * 50 + 25,
        })),
      );

      setLines(
        lineList.map((line) => [
          line[0] * 50 + 25,
          line[1] * 50 + 25,
          line[2] * 50 + 25,
          line[3] * 50 + 25,
        ]),
      );
    }
  }, [pointList, lineList]);

  const deDuplication = (input) => {
    const array = input;
    array.forEach((point) => {
      const yIndex = (point.centerY - 25) / 50;
      const xIndex = (point.centerX - 25) / 50;
      const existingPoint = points.find(
        (p) => p.centerX === point.centerX && p.centerY === point.centerY,
      );
      if (!existingPoint) {
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[yIndex][xIndex] = false;
          return newGrid;
        });
      }
    });
  };

  const handleBeforeClick = () => {
    if (
      points.length === templatePointSize &&
      lines.length === templateLineSize
    ) {
      handleResetClick(); // 템플릿 크기와 동일하면 초기화
      return;
    }
    let newPoints, newLines;
    if (points.length === 0) return;
    if (points.length % 2 === 1) {
      const lastPoint = points[points.length - 1];
      newPoints = points.slice(0, points.length - 1);
      setLastPoints([lastPoint]);
    } else if (points.length % 2 === 0) {
      const lastTwoPoints = points.slice(-2);
      newPoints = points.slice(0, points.length - 2);
      newLines = lines.slice(0, lines.length - 1);
      setLastPoints(lastTwoPoints);
      setLines(newLines);
    }
    setPoints(newPoints);
    setShouldDeduplicate(true);
  };

  const removeDuplicate = (lines) => {
    const uniquePoints = [];
    grid.forEach((yValue, y) => {
      yValue.forEach((xValue, x) => {
        if (xValue === true) {
          uniquePoints.push([y, x]);
        }
      });
    });
    const uniqueLines = [];
    const duplicateLines = [];
    for (const line of lines) {
      const reversedLine = [line[2], line[3], line[0], line[1]];
      const isDuplicate = duplicateLines.some(
        (uniqueLine) =>
          (uniqueLine[0] === line[0] &&
            uniqueLine[1] === line[1] &&
            uniqueLine[2] === line[2] &&
            uniqueLine[3] === line[3]) ||
          (uniqueLine[0] === reversedLine[0] &&
            uniqueLine[1] === reversedLine[1] &&
            uniqueLine[2] === reversedLine[2] &&
            uniqueLine[3] === reversedLine[3]),
      );

      if (!isDuplicate) {
        duplicateLines.push(line);
        uniqueLines.push([
          (line[0] - 25) / 50,
          (line[1] - 25) / 50,
          (line[2] - 25) / 50,
          (line[3] - 25) / 50,
        ]);
      }
    }
    return [uniquePoints, uniqueLines];
  };

  const handleSaveClick = () => {
    setLoading(true); // 로딩 상태 시작
    const [uniquePoints, uniqueLines] = removeDuplicate(lines);
    if (uniquePoints.length === 0 || uniqueLines.length === 0) {
      setIsAlertVisible(true);
      setAlertMessage("별자리를 그려주세요.");
      setLoading(false);
      return;
    }
    const imageUrl = linesAndPointsLayerRef.current.toDataURL();
    const [header, data] = imageUrl.split(",");
    const mimeType = header.split(";")[0].split(":")[1];
    const binary = atob(data);
    const array = Uint8Array.from(binary, (c) => c.charCodeAt(0));
    const imageName = `constellation-${new Date().getTime()}.png`;
    const storageRef = ref(storage, `images/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, array, {
      contentType: mimeType,
    });
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      () => {
        setIsAlertVisible(true);
        setAlertMessage("업로드에 실패했습니다.");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const constellation = {
            planetId,
            title: constellationName,
            description: constellationDescp,
            lineList: uniqueLines,
            pointList: uniquePoints,
            imageUrl: downloadURL,
            boardSize: boardSize[0],
            color: constellationColor,
          };
          const response =
            await useConstellationApi.constellationsPostConstellation(
              constellation,
            );
          if (response.status === 200) {
            setConstellationLimit((prevLimit) => prevLimit - 1);
            navigateToDetailConstellation(response.resultData.constellationId);
          } else if (response.status === 400) {
            setIsAlertVisible(true);
            setAlertMessage(response.message);
          } else if (response.status === 403) {
            setIsAlertVisible(true);
            setAlertMessage("로그인이 필요합니다.");
          } else {
            setIsAlertVisible(true);
            setAlertMessage("업로드에 실패했습니다.");
          }
        } catch (error) {
          setIsAlertVisible(true);
          setAlertMessage("업로드에 실패했습니다.");
        }
        setLoading(false); // 로딩 상태 종료
      },
    );
  };

  const handleGridClick = (y, x) => {
    const centerY = y * 50 + 25;
    const centerX = x * 50 + 25;
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[y][x] = true;
      return newGrid;
    });

    const newPoints = [...points, { centerY, centerX }];
    setPoints(newPoints);

    if (newPoints.length % 2 === 0) {
      const lastTwoPoints = newPoints.slice(-2);
      const newLine = [
        lastTwoPoints[0].centerY,
        lastTwoPoints[0].centerX,
        lastTwoPoints[1].centerY,
        lastTwoPoints[1].centerX,
      ];
      setLines([...lines, newLine]);
    }
  };

  if (grid.length === 0) {
    const rows = boardSize[0];
    const cols = boardSize[0];
    const tempGrid = Array(rows)
      .fill()
      .map(() => Array(cols).fill(false));
    setGrid(tempGrid);
  }

  const handleResetClick = () => {
    setPoints([]);
    setLines([]);
    setGrid(grid.map((yValue) => yValue.map((xValue) => false)));
    setLastPoints([]);
    setShouldDeduplicate(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />
      <div className="flex flex-row px-10 py-4 text-white">
        <div className="ml-5 flex flex-row space-x-5">
          <div className="flex flex-col">
            <p className="font-Pretendard">
              남은 생성 횟수: {constellationLimit}
            </p>
            <p className="font-Pretendard">
              행성명: {PLANET_LIST[planetId - 1].name}
            </p>
            <p className="font-Pretendard">별자리명: {constellationName}</p>
            <p
              className="font-Pretendard"
              style={{
                maxWidth: "200px", // 원하는 최대 너비를 설정합니다. 필요에 따라 조절하세요.
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              별자리설명:{" "}
              {constellationDescp.length > 8
                ? `${constellationDescp.slice(0, 8)}...`
                : constellationDescp}
            </p>
            {/* <p className="font-Pretendard">보드사이즈: {boardSize}</p> */}
          </div>
        </div>
        <div className="flex w-28 items-center justify-center">
          <div className="ml-3 flex">
            <PickConstellationColor
              setconstellationColor={setconstellationColor}
              constellationColor={constellationColor}
            />
          </div>
        </div>
      </div>
      <div className={`mt-10 items-center justify-center ${containerStyle}`}>
        <Stage width={stageSize} height={stageSize}>
          <Layer ref={linesAndPointsLayerRef}>
            {points.map((point, y) => (
              <Star
                key={y}
                x={point.centerX}
                y={point.centerY}
                rotation={107}
                numPoints={5}
                innerRadius={10}
                outerRadius={5}
                fill={constellationColor}
                shadowColor="#EEE5FF"
                shadowBlur={5}
                shadowOpacity={0.6}
              />
            ))}

            {lines.map((line, y) => (
              <Line
                key={y}
                points={[line[1], line[0], line[3], line[2]]}
                stroke="#FFFFFF"
                shadowColor="#FFFFFF"
                shadowBlur={5}
                opacity={0.5}
                tension={1}
              />
            ))}
          </Layer>
          <Layer>
            {grid &&
              grid.map((yValue, y) =>
                yValue.map((xValue, x) => (
                  <Rect
                    key={`${y}-${x}`}
                    y={y * 50}
                    x={x * 50}
                    width={50}
                    height={50}
                    stroke="#DDDDDD"
                    strokeWidth={1}
                    onTap={() => handleGridClick(y, x)}
                    onClick={() => handleGridClick(y, x)}
                    zIndex={2}
                  />
                )),
              )}
          </Layer>
        </Stage>
      </div>
      <div className="mt-20 space-x-4">
        <Button1 value="초기화" onClick={handleResetClick}></Button1>
        <Button1 value="이전" onClick={handleBeforeClick}></Button1>
        <Button1
          value="생성"
          onClick={handleSaveClick}
          disabled={isLoading}
        ></Button1>
      </div>
    </div>
  );
};

export default GridCustomConstellation;
