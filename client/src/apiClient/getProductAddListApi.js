import axiosClient from "./axiosClient";

const getProductAddListApi = {
  get() {
    const url = "/api/upload";
    return axiosClient.get(url, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};

export default getProductAddListApi;
