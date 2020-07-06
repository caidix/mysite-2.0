<template>
  <section v-if="data" class="article-detail">
    <section class="article-detail--header" :style="backgroundImage">
      <div class="article-detail--title">
        <h1 v-setTitle="data.title">{{ data.title }}</h1>
        <span>{{ data.updatedAt | momentTime }}</span>
      </div>
    </section>
    <section class="article-detail--body">
      <section class="article-detail--content">
        <section v-if="data.introduction" class="detail-introduction">{{ data.introduction }}</section>
        <section v-html="data.articleContent"></section>
      </section>
      <div v-if="data.toc" ref="toc" class="main-list">
        <div class="detailed-nav comm-box">
          <div :class="{ fixed: osTop }" class="toc-list" v-html="data.toc"></div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import moment from 'moment'
import { findOneArticle } from '~/assets/api/index.js'
import markdown from '~/assets/utils/markdown.js'
import { setTitle } from '~/mixins/set-title'
export default {
  filters: {
    momentTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
    // filterArray(val) {}
  },
  directives: {
    setTitle
  },
  async asyncData({ query }) {
    if (!query.id) return
    const { data } = await findOneArticle(query)
    const articleContent = markdown.marked(data.data.articleContent.content)

    await articleContent.then((response) => {
      data.data.articleContent = response.content
      data.data.toc = response.toc
    })
    return {
      data: data.data
    }
  },
  computed: {
    backgroundImage() {
      // 根据背景图数组的长度随机选择索引
      const randIndex = Math.floor(Math.random() * 4 + 1)
      const backgroundImage = this.data.img_url
        ? this.data.img_url
        : `https://cd-blog.oss-cn-shenzhen.aliyuncs.com/background/background${randIndex}.jpg`
      return {
        backgroundImage: `url(${backgroundImage})`
      }
    }
  },
  mounted() {
    document.addEventListener('scroll', this.watchScroll)
  },
  destroyed() {
    document.removeEventListener('scroll', this.watchScroll)
  },
  data() {
    return {
      osTop: false
    }
  },
  methods: {
    watchScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 750) {
        this.osTop = true
      }
      if (scrollTop < 750) {
        this.osTop = false
      }
    }
  }
}
</script>
<style lang="scss">
@media (max-width: 875px) {
  .article-detail--title {
    font-size: 2rem !important;
    h1 {
      font-size: 2rem !important;
    }
  }
  table th,
  table td {
    padding: 0 !important;
  }
  pre > code {
    word-wrap: break-word;
    white-space: pre-wrap;
  }
}
@media (max-width: 768px) {
  .article-detail--title {
    font-size: 1rem !important;
    h1 {
      font-size: 1.3rem !important;
    }
  }
  .article-detail--body {
    width: 100% !important;
  }
  .main-list {
    display: none !important;
  }
}
.article-detail--header {
  background-size: cover;
  width: 100%;
  height: 70vh;
  background-position: top left;
  background-origin: border-box;
  background-repeat: no-repeat;
  position: relative;
  .article-detail--title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-weight: 400;
    word-break: break-word;
    font-size: 2.7rem;
    line-height: 1.67;
    color: #fff;
    text-shadow: 0px -3px 4px #f59651, 0px -2px 3px #f59651,
      0px -1.5px 2px #fb6229, 0px -1px 1.5px #fb6229, 0px -0.5px 1px #fb6229;
    h1 {
      font-size: 2.7rem;
      line-height: 1.67;
    }
  }
}
.article-detail--body {
  margin: -120px auto 0;
  width: 60%;
  position: relative;
}
.article-detail--content {
  border-radius: 1rem;
  box-shadow: 0 2px 10px #0178b8;
  background: #fff;
  padding: 1.3rem;
  font-size: 1.05rem;
  color: #000;
  margin-bottom: 1rem;
  line-height: 1.9rem;
  img {
    margin: 0 auto !important;
    max-width: 100%;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: monospace;
    font-size: 14px;
  }
  ol > ul {
    margin-left: 50px;
  }
  ul {
    margin-left: 40px;
  }
  h1 {
    padding-bottom: 1rem;
    border-bottom: 1px solid #d9dada;
    margin-bottom: 2rem;
    margin-top: 2rem;
    -webkit-margin-bottom-collapse: 2rem;
    color: #333;
    font-size: 1.8rem;
    font-weight: bold;
  }
  h2 {
    border-bottom: 1px solid #d9dada;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    -webkit-margin-bottom-collapse: 2rem;
    color: #333;
    font-size: 1.5rem;
    font-weight: bold;
  }
  h3 {
    border-left: 4px solid rgb(156, 203, 250);
    padding-left: 1rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
    -webkit-margin-bottom-collapse: 2rem;
    color: #666;
    font-size: 1.3rem;
    font-weight: bold;
  }
  h4 {
    font-size: 1.2rem;
  }
  pre {
    display: block;
    background-color: #283646 !important;
    padding: 0.5rem !important;
    overflow-y: auto;
    font-weight: 300;
    font-family: Menlo, monospace;
    border-radius: 0.3rem;
  }

  pre > code {
    border: 0px !important;
    background-color: #283646 !important;
    color: #ccc !important;
  }
  code {
    display: inline-block;
    background-color: #fff5f5;
    border-radius: 3px;
    padding-left: 5px;
    padding-right: 5px;
    color: #ff502c;
    margin: 0px 3px;
    line-height: 1.1rem;
  }
  table {
    margin: 0 auto;
  }
  table th {
    font-weight: bold;
  }

  table th,
  table td {
    border: 1px solid #ccc;
    padding: 0.5rem 0.7rem;
  }

  table tr {
    border-top: 1px solid #ccc;
    background-color: #fff;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
  }
  blockquote {
    border-left: 4px solid #ddd;
    padding: 0 15px;
    color: #777;
    margin-left: 20px;
  }

  blockquote > :first-child {
    margin-top: 0px;
  }

  blockquote > :last-child {
    margin-bottom: 0px;
  }
  .hljs-comment {
    color: #ff6a6a;
  }
  strong {
    font-weight: bold;
  }
}
.hambuger {
  height: 40px;
  background: #e1f0ff;
}
.detailed-title {
  font-size: 1.8rem;
  text-align: center;
  padding: 1rem;
}
.center {
  text-align: center;
}

.detail-introduction {
  border: 3px solid #f6f6f6;
  text-align: center;
  padding: 5px;
  margin: 5px 10px;
  box-shadow: 3px 3px 0 0 #f6f6f6;
}
.main-list {
  position: absolute;
  top: 130px;
  right: -20rem;
  width: 20rem;
}
.toc-list {
  &.fixed {
    position: fixed;
  }
  padding: 0 10px;
  width: 300px;
  overflow-y: auto;
  top: 120px;
  max-height: 600px;
  .anchor-ul {
    margin-left: 10px;
    position: relative;
    box-shadow: 0 0px 0px #fff;
    list-style: disc;
    padding-bottom: 5px;
    ul {
      list-style: decimal;
      ul {
        list-style: circle;
        ul {
          list-style: square;
        }
      }
    }
  }
  li {
    margin: 5px 0;
    &:hover {
      color: rgb(41, 17, 253);
    }
    // list-style: none;
    a {
      color: rgba(17, 6, 6, 0.952);
      &:hover {
        color: rgb(41, 17, 253);
      }
    }
  }
}
</style>
