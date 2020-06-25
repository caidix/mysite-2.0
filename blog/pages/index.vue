<template>
  <section class="container">
    <section class="main-header">
      <section class="site-meta">
        <h1 class="site-name">~Welcome to CD House~</h1>
        <h2 class="site-name">人生有梦,各自精彩</h2>
      </section>
      <img class="main-banner" :src="backgroundImage" />
      <i class="iconfont icon-xiangxia downdrop" @click="downDrop"></i>
    </section>
    <section class="cd-blog_body">
      <Spin v-if="spinShow" fix>
        <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
      <List
        :data="list"
        :tags-data="tagsList"
        :category-data="categoryList"
        @fetch-data="fetchData"
      />
    </section>
  </section>
</template>

<script>
import { getArticle, getCategory, getTags } from '~/assets/api/index.js'
import List from '~/components/List'
export default {
  components: { List },
  async asyncData() {
    const { data } = await getArticle()
    const { data: categoryList } = await getCategory()
    const { data: tagsList } = await getTags()
    return {
      list: data.data,
      categoryList: categoryList.data,
      tagsList: tagsList.data
    }
  },
  data() {
    return {
      list: [],
      categoryList: [],
      tagsList: [],
      spinShow: false
    }
  },
  computed: {
    backgroundImage() {
      // 根据背景图数组的长度随机选择索引
      const randIndex = Math.floor(Math.random() * 6 + 1)
      return `https://cd-blog.oss-cn-shenzhen.aliyuncs.com/background/background${randIndex}.jpg`
    }
  },
  methods: {
    downDrop() {
      const currentY =
        document.documentElement.clientHeight || document.body.clientHeight
      window.scrollTo({
        top: currentY,
        behavior: 'smooth'
      })
    },
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
</script>
<style lang="scss">
.container {
  @keyframes downdrop {
    0% {
      bottom: 10px;
    }
    50% {
      bottom: 18px;
    }
    100% {
      bottom: 10px;
    }
  }
  .main-header {
    width: 100%;
    height: 100vh;
    position: relative;
    animation-duration: 1s;
    animation-fill-mode: both;
    .downdrop {
      position: absolute;
      bottom: 10px;
      font-size: 30px;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;
      color: rgba(82, 77, 221, 0.8);
      animation: downdrop 1s infinite;
      &:hover {
        animation-play-state: paused;
      }
    }
    .main-banner {
      width: 100%;
      height: 100%;
    }
    .site-meta {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      text-align: center;
      border-radius: 0.5rem;
      width: 100%;
      padding: 30px 10px;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      .site-name {
        font-family: 'cdmaobi';
        color: rgba(255, 255, 255, 0.8);
        text-shadow: 0 0 10px #c3c3c3;
        font-size: 40px;
      }
    }
  }
  .cd-blog_body {
    display: flex;
    position: relative;
    flex-direction: column;
    margin-bottom: 1rem;
    .spin-icon-load {
      animation: ani-demo-spin 1s linear infinite;
    }
  }
}
</style>
