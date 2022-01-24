import axiosClient from "./axiosClient";

const getCategoriesApi = {
  get(categories) {
    const url = `/api/categories/${categories}`;
    return axiosClient.get(url, {
      header: {
        "content-type": "application/json",
      },
    });
  },
};
export default getCategoriesApi;
