import useAxiosInstance from "./useAxiosInstance";

const constellationsGetPlanet = async (planetId) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/list/${planetId}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    } else if (e.response.data.status === 400) {
      return e.response.data;
    }
  }
};

const constellationsGetConstellation = async (constellationId) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/${constellationId}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsGetPin = async (constellationId) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/pin/${constellationId}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsGetAttendList = async (nickname) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/profiles?nickname=${nickname}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsGetPinList = async (nickname) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/profiles/pins?nickname=${nickname}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsPostConstellation = async (constellation) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .post(`/constellations/register`, constellation);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsGetDetail = async (constellationId) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/detail/${constellationId}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsGetTemplateList = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/constellations/templates`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const constellationsDeletePin = async (constellationId) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .delete(`/constellations/pin/${constellationId}`);
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
  constellationsGetPlanet,
  constellationsGetConstellation,
  constellationsGetPin,
  constellationsGetAttendList,
  constellationsGetPinList,
  constellationsPostConstellation,
  constellationsGetDetail,
  constellationsGetTemplateList,
  constellationsDeletePin,
};
