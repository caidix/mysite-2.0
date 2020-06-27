import { getArticle } from '~/assets/api/index.js'
export default {
  data() {
    return {
      list: [],
      spinShow: false
    }
  },
  methods: {
    async fetchData(item) {
      this.spinShow = true
      const { data } = await getArticle(item)
      if (data.code === 0) {
        this.list = data.data
      } else {
        this.$Message.error(data.message || '获取失败')
      }
      this.spinShow = false
    }
  }
}
