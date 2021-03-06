import axiosClient from "./axiosClient";

const getHotProductsApi = {
  get() {
    const url = "/api/products/hot/";
    return axiosClient.get(url, {
      headers: {
        "content-type": "application/json",
      },
    });
  },
};

export default getHotProductsApi;
