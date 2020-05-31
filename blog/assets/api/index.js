import http from '../utils/http'

const getArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/site/list',
    params
  })
}

const findOneArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/site/find',
    params
  })
}

export default {
  getArticle,
  findOneArticle
}
