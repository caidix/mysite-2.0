import http from '../utils/http'

export const getArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/site/list',
    params
  })
}

export const findOneArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/site/find',
    params
  })
}

export const getGather = (params) => {
  return http.request({
    method: 'get',
    url: '/site/gather',
    params
  })
}
