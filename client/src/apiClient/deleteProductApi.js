import axiosClient from "./axiosClient";

const deleteProductApi = {
  delete(payload) {
    const url = "/api/upload/delete";
    return axiosClient.delete(url, {
      data: payload,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // "Access-Control-Allow-Origin": "https://wordy.vercel.app",
        "Access-Control-Allow-Credentials": true,
        mode: "cors",
        credentials: "include",
      },
    });
  },
};

export default deleteProductApi;
