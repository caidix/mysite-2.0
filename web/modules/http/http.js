import axios from "axios";
import store from "@/store/index.js";
const http = axios.create({
  baseURL: process.env.BASE_URL || "/api",
  // baseURL: "http://localhost:3003/api",
  timeout: 5000,
  withCredentials: true,
  header: {
    "Access-Control-Allow-Credentials": true,
  },
});
const Store = store();
const openPageLoading = () => {
  const gageLoading = Store.getters.getPageLoading;
  if (gageLoading) return;
  Store.commit("changePageStatus", true);
};
const closePageLoading = () => {
  setTimeout(() => {
    Store.commit("changePageStatus", false);
  }, 600);
};

// 请求拦截器
http.interceptors.request.use(
  (request) => {
    const { config } = request;
    if (config && config.loading) {
      openPageLoading();
    }
    if (config && config.closeLoading) {
      closePageLoading();
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (res) => {
    // 根据业务修改
    const { config } = res.config;
    if (config && config.loading) {
      closePageLoading();
    }
    return res;
  },
  (error) => {
    let { message } = error;
    const { data } = error.response;
    console.log("err" + error); // for debug
    if (message === "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "后端接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      if (data && data.message) {
        message = data.message;
      } else {
        message = "后端接口" + message.substr(message.length - 3) + "异常";
      }
    }
    // Message.error(message || "未知错误");
    return Promise.reject(error);
  }
);
export default http;
