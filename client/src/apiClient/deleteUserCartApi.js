import axiosClient from "./axiosClient";

const deleteUserCartApi = {
  delete(id, payload) {
    const url = `/api/cart/${id}/delete`;
    return axiosClient.delete(url, {
      data: payload,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "https://wordy.vercel.app",
        "Access-Control-Allow-Credentials": true,
        mode: "cors",
        credentials: "include",
      },
    });
  },
};

export default deleteUserCartApi;
