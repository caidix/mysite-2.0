import http from '../utils/http'

const getArticle = (params) => {
  return http.request({
    method: 'get',
    url: '/site/list',
    params
  })
}

export default {
  getArticle
}
