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
export const getArticleByGather = (id) => {
  return http.request({
    method: 'get',
    url: '/site/articleByGather',
    params: {
      id
    }
  })
}
export const getCategory = () => {
  return http.request({
    method: 'get',
    url: '/site/category'
  })
}
export const getTags = () => {
  return http.request({
    method: 'get',
    url: '/site/tags'
  })
}
