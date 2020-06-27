<template>
  <section class="gather-panel animate__backInLeft">
    <section class="gather-background">
      <img src="https://cd-blog.oss-cn-shenzhen.aliyuncs.com/blog/articlelist.png" alt />
    </section>
    <section class="gather-panel__body">
      <section v-for="(item, index) in gatherList" :key="index" class="gather-item">
        <div class="gather-inner" @click="getArticleByGather(item)">
          <div
            class="gather-banner"
            :style="
              `background-image:url(${item.img ||
                'https://cd-blog.oss-cn-shenzhen.aliyuncs.com/blog/guidang.jpg'})`
            "
          ></div>
          <div class="gather-message">
            <p class="gather-title">
              <i class="iconfont icon-biaoqian"></i>
              {{ item.name }}
            </p>
            <span class="gather-desc">
              <i style="margin:13px"></i>
              {{ item.desc }}
            </span>
          </div>
        </div>
      </section>
      <section>
        <Modal
          v-model="showModal"
          :title="checkedItem.name"
          :footer-hide="true"
          scrollable="true"
        >
          <div class="gather-article-list">
            <nuxt-link
              v-for="(item, index) in articleList[checkedItem._id]"
              :key="index"
              :to="{ path: '/article/detail', query: { id: item.id } }"
              tag="a"
            >
              <p>[{{ index + 1 }}] {{ item.title }}</p>
            </nuxt-link>
          </div>
        </Modal>
      </section>
    </section>
  </section>
</template>

<script>
import { getGather, getArticleByGather } from '~/assets/api/index.js'
export default {
  async asyncData() {
    const { data } = await getGather()
    return {
      gatherList: data.data
    }
  },
  data() {
    return {
      gatherList: [],
      showModal: false,
      articleList: {},
      checkedItem: ''
    }
  },
  methods: {
    async getArticleByGather(item) {
      if (this.articleList[item._id]) {
        this.showModal = true
        return
      }
      this.checkedItem = item
      const { data } = await getArticleByGather(item._id)
      if (data.code === 0) {
        this.articleList[item._id] = data.data
        this.showModal = true
      } else {
        this.$Message.error(data.message || '获取失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gather-panel {
  min-height: 100vh;
  width: 100%;
  animation-duration: 1s;
}
.gather-background {
  img {
    width: 100%;
    height: 60vh;
  }
}
.gather-panel__body {
  width: 80%;
  margin: -120px auto 0;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  border-radius: 1rem;

  .gather-item::before {
    content: '';
    position: absolute;
    left: 7px;
    right: 7px;
    top: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 5px;
    background-color: #fff;
    transition: all 0.2s linear;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
  }
  .gather-item {
    cursor: pointer;
    width: 33%;
    box-sizing: border-box;
    transition: all 0.2s linear;
    position: relative;
    margin-bottom: 30px;
    z-index: 0;
    background-color: transparent;
    &:hover {
      transform: translateY(-3px);
      &::before {
        box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
      }
    }
    .gather-inner {
      border-radius: 5px;
      overflow: hidden;
      color: #333;

      margin: 0 7px;
    }
    .gather-banner {
      padding-top: 58.82%;
      background-color: #ccc;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .gather-message {
      padding: 10px 12px 15px;
    }
    .gather-title {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
      font-weight: 700;
      margin: 5px 0;
    }
    .gather-desc {
      color: rgb(99, 95, 95);
      padding-right: 0;
    }
  }
}

.gather-article-list {
  padding: 10px;
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #303133;
    margin-bottom: 10px;
    &:hover {
      text-shadow: 1px 1px 1px rgb(179, 168, 168);
    }
    p {
      width: 70%;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
@media (max-width: 1350px) {
  .gather-item {
    width: 50% !important;
  }
}
@media (max-width: 875px) {
  .gather-item {
    width: 100% !important;
  }
  .gather-background {
    img {
      height: 40vh;
    }
  }
}
</style>
