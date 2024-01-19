import useAxiosInstance from "./useAxiosInstance";

const membersGetBoard = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/members/board`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

// memberId 빼면 get요청에서 숫자 빼줘야함
const membersGetProfiles = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/members/profiles/read`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersPostRegister = async (member) => {
  try {
    const response = await useAxiosInstance.apiClient.post(
      "/members/register",
      member,
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

const membersPostLogin = async (member) => {
  try {
    const response = await useAxiosInstance.apiClient.post(
      "/members/login",
      member,
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

const membersGetDetail = async (nickname) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/members/detail/${nickname}`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersPutUpdate = async (member) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .put(`/members/update`, member);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersPutBoard = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .put(`/members/board`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersPutProfiles = async (data) => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .put(`/members/profiles/update`, data);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersDeleteMember = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .delete(`/members/delete`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersPostCheckNickname = async (nickname) => {
  try {
    const response = await useAxiosInstance.apiClient.post(
      `/members/check/nickname`,
      nickname,
    );
    return response.data;
  } catch (e) {
    if (e.response.data.status === 409) {
      return e.response.data;
    }
  }
};

const membersPostCheckEmail = async (email) => {
  try {
    const response = await useAxiosInstance.apiClient.post(
      `/members/check/email`,
      email,
    );
    return response.data;
  } catch (e) {
    if (e.response.data.status === 409) {
      return e.response.data;
    }
  }
};

const membersPostEmail = async (email) => {
  try {
    const response = await useAxiosInstance.authApiClient.post(
      `/members/email`,
      email,
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

const membersGetPin = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .get(`/members/pin`);
    return response.data;
  } catch (e) {
    if (e.response.data.status === 404) {
      return e.response.data;
    } else if (e.response.data.status === 403) {
      return e.response.data;
    }
  }
};

const membersPutPin = async () => {
  try {
    const jwt = sessionStorage.getItem("accessToken");
    const response = await useAxiosInstance
      .authApiClient(jwt)
      .put(`/members/pin`);
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
  membersPostRegister,
  membersGetDetail,
  membersPostLogin,
  membersDeleteMember,
  membersPutUpdate,
  membersPostCheckNickname,
  membersPostCheckEmail,
  membersPostEmail,
  membersGetBoard,
  membersGetProfiles,
  membersPutBoard,
  membersPutProfiles,
  membersGetPin,
  membersPutPin,
};
