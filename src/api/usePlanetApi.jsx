import useAxiosInstance from "./useAxiosInstance";

const planetsGetPlanetList = async () => {
  try {
    const response = await useAxiosInstance.apiClient.get(`/planets`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const planetsGetStarList = async (planetId) => {
  try {
    const response = await useAxiosInstance.apiClient.get(
      `/planets/${planetId}`,
    );
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
  planetsGetPlanetList,
  planetsGetStarList,
};
