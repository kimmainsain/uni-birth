// API URL
export const API_URL = "https://i9a410.p.ssafy.io/api/";

export const CONTENT_TYPE_JSON = "application/json";

const num = 20;

export const PLANET_LIST = [
  { planetId: 1, name: "취미", x: num, y: 0, z: 0 },
  {
    planetId: 2,
    name: "음악",
    x: num * Math.sin(45),
    y: 0,
    z: num * Math.sin(45),
  },
  { planetId: 3, name: "운동", x: 0, y: 0, z: num },
  { planetId: 4, name: "챌린지", x: -num * Math.sin(45), y: 0, z: num },
  { planetId: 5, name: "음식", x: -num, y: 0, z: 0 },
  {
    planetId: 6,
    name: "여행",
    x: -num * Math.sin(45),
    y: 0,
    z: -num * Math.sin(45),
  },
  { planetId: 7, name: "일상", x: 0, y: 0, z: -num },
  {
    planetId: 8,
    name: "반려동물",
    x: num * Math.sin(45),
    y: 0,
    z: -num * Math.sin(45),
  },
];

export const SEARTCH_LIST = [
  { sub: "all", name: "전체" },
  { sub: "constellation", name: "별자리" },
  { sub: "star", name: "별" },
  { sub: "nickname", name: "닉네임" },
];
