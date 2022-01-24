import axiosClient from "./axiosClient";

const getUserProfileApi = {
  get() {
    const url = "/api/account/profile";
    return axiosClient.get(url, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};

export default getUserProfileApi;
