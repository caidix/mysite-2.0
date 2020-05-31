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
      <nuxt-link
        v-for="(item, index) in list"
        :key="index"
        :to="{ path: 'article/detail', query: { id: item._id } }"
        tag="article"
        class="article-item"
      >
        <section class="article-item--background">
          <img :src="item.img_url" alt />
        </section>
        <section class="acticle-item-main">
          <header class="article-item--title">{{ item.title }}</header>
          <section class="article-item--tag">
            <span>
              <i class="iconfont icon-date"></i>
              {{ item.updatedAt | momentTime }}
              <i class="iconfont icon-fire"></i>
              {{ item.likes }} 人
            </span>
          </section>
          <section class="article-item--tag">
            <Tag v-for="(cat, i) in item.category" :key="i" color="magenta">{{cat.name}}</Tag>
            <Tag v-for="(tag, i) in item.tags" :key="i" color="cyan">{{tag.name}}</Tag>
          </section>
          <section class="article-item--info">{{ item.introduction }}</section>
        </section>
      </nuxt-link>
    </section>
  </section>
</template>

<script>
import moment from 'moment'
import api from '~/assets/api/index.js'
export default {
  transition: 'opacity',
  filters: {
    momentTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
    // filterArray(val) {}
  },
  async asyncData() {
    const { data } = await api.getArticle()
    return {
      list: data.data.data
    }
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    backgroundImage() {
      // 根据背景图数组的长度随机选择索引
      const randIndex = Math.floor(Math.random() * 4 + 1)
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
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  @media (max-width: 875px) {
    .main-header {
      height: 50vh !important;
    }
    .downdrop {
      display: none;
    }
    .cd-blog_body {
      padding: 0 1rem;
    }
    .article-item {
      flex-direction: column;
      width: 100% !important;
      .article-item--background {
        width: 100% !important;
      }
    }
  }
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
      z-index: 10;
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
    flex-direction: column;
    margin-bottom: 1rem;
    .article-item {
      background: #fff;
      width: 70%;
      cursor: pointer;
      margin: 3rem auto 0;
      border-radius: 0.25rem;
      box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
        0 5px 15px rgba(0, 0, 0, 0.07);
      // clip-path: polygon(9% 0%, 100% 0%, 100% 100%, 0% 100%);
      overflow: hidden;
      transition: all 0.5s;
      display: flex;
      &:hover {
        transform: translateY(-0.5rem) translateZ(0);
        box-shadow: 0 5px 10px 5px rgba(110, 110, 110, 0.4);
      }
      .article-item--background {
        flex-shrink: 0;
        width: 50%;
        position: relative;

        img {
          border-radius: 0.25rem;
          width: 100%;
          height: 100%;
        }
      }
      .acticle-item-main {
        padding: 1rem;
        color: #32325d;
        .article-item--title {
          font-weight: 400;
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        .icon-date {
          color: #1e90ff;
        }
        .icon-fire {
          color: #f20909;
        }
        .article-item--tag {
          vertical-align: top;
          margin-bottom: 1rem;
        }
        .article-item--info {
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
