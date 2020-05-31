<template>
  <div>articleasdasdas</div>
</template>

<script>
import api from '~/assets/api/index.js'
export default {
  async asyncData({ query }) {
    if (!query.id) return
    const { data } = await api.findOneArticle(query)
    return {
      data: data.data
    }
  }
}
</script>
