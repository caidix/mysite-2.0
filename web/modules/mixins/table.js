const LIMIT = 10
export default {
  data() {
    return {
      page: 1,
      limit: LIMIT
    }
  },
  methods: {
    resetData() {
      this.datas = []
      this.resetPage()
    },
    handlePageChange(val) {
      this.page = val
      this.fetchData()
    },
    handleLimitChange(val) {
      this.limit = val
      this.fetchData()
    }
  }
}
