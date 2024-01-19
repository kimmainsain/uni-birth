import useAxiosInstance from "./useAxiosInstance";

const profilesGetFollowings = async (nickname) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/profiles/followings?nickname=${nickname}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const profilesGetFollowers = async (nickname) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/profiles/followers?nickname=${nickname}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const profilesPostFollow = async (followData) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .post(`/profiles/follow`, followData);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const profilesDeleteFollow = async (nickname) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .delete(`/profiles/follow?to=${nickname}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const profilesGetCntFollowers = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/profiles/followers/cnt`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const profilesGetCntFollowings = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/profiles/followings/cnt`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

export default {
  profilesGetFollowings,
  profilesGetFollowers,
  profilesPostFollow,
  profilesDeleteFollow,
  profilesGetCntFollowers,
  profilesGetCntFollowings,
};
