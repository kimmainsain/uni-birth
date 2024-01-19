import useAxiosInstance from "./useAxiosInstance";

const searchGetMemberCuration = async (nickname) => {
  const jwt = sessionStorage.getItem("accessToken");
  try {
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/members/curation`, nickname);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
  return searchGetMemberCuration;
};

const searchGetSearch = async (category, word) => {
  const jwt = sessionStorage.getItem("accessToken");
  try {
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/search?category=${category}&word=${word}`);
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
  searchGetMemberCuration,
  searchGetSearch,
};
