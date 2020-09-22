import http from "./http";
import { getUuid } from "@/modules/utils/auth";
export const getArticle = (params) => {
  return http.request({
    method: "get",
    url: "/site/list",
    params,
    config: {
      closeLoading: true,
    },
  });
};

export const findOneArticle = (params) => {
  return http.request({
    method: "get",
    url: "/site/find",
    params: {
      ...params,
      uuid: getUuid(),
    },
  });
};

export const getGather = (params) => {
  return http.request({
    method: "get",
    url: "/site/gather",
    params,
  });
};
export const getArticleByGather = (id) => {
  return http.request({
    method: "get",
    url: "/site/articleByGather",
    params: {
      id,
    },
  });
};
export const getCategory = () => {
  return http.request({
    method: "get",
    url: "/site/category",
  });
};
export const getTags = () => {
  return http.request({
    method: "get",
    url: "/site/tags",
  });
};
export const postComment = (data) => {
  return http.request({
    data,
    method: "post",
    url: "site/comments",
  });
};
export const getComment = (params) => {
  return http.request({
    params,
    method: "get",
    url: "site/comments",
    config: {
      loading: true,
    },
  });
};
