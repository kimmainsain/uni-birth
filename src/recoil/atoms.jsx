import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
export const nicknameState = atom({
  key: "nicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const targetNicknameState = atom({
  key: "targetNicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const updateTimeState = atom({
  key: "updateTimeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const starListState = atom({
  key: "starListState",
  default: { starList: [] },
  effects_UNSTABLE: [persistAtom],
});

export const boardSizeState = atom({
  key: "boardSizeState",
  default: 5,
  effects_UNSTABLE: [persistAtom],
});

export const memberProfileImageState = atom({
  key: "memberProfileImageState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 사용자 최대 생성갯수, n번추가하면 + 1
export const starCountState = atom({
  key: "starCountState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const constellationLimitState = atom({
  key: "constellationLimitState",
  default: 5,
  effects_UNSTABLE: [persistAtom],
});

export const constellationLinkList = atom({
  key: "constellationLinkList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// Star Box content
export const boxcontentState = atom({
  key: "boxcontentState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const boxtitleState = atom({
  key: "boxtitleState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const boxnicknameState = atom({
  key: "boxnicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const boxurlState = atom({
  key: "boxurlState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const boxidState = atom({
  key: "boxidState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
export const boxcreatedState = atom({
  key: "boxcreatedState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const StellaIdState = atom({
  key: "StellaIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const DetailStellaFullNumState = atom({
  key: "DetailStellaFullNumState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const DetailStellaNumstate = atom({
  key: "DetailStellaNumstate",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const StartPlanets = atom({
  key: "StartPlanets",
  default: { x: 0, y: 0, z: 0 },
  effects_UNSTABLE: [persistAtom],
});

export const backgroundflagState = atom({
  key: "backgroundflagState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const currentplanetState = atom({
  key: "currentplanetState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const currentConsIndexState = atom({
  key: "currentConsIndexState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const currentconstellationListState = atom({
  key: "currentconstellationListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
