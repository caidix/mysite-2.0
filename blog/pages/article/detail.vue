<template>
  <section class="article-detail">
    <section class="article-detail--header" :style="backgroundImage">
      <div class="article-detail--title">
        <h1>{{ data.title }}</h1>
        <span>{{ data.updatedAt | momentTime }}</span>
      </div>
    </section>
    <div v-html="data.articleContent" class="article-detail--content"></div>
  </section>
</template>

<script>
import moment from 'moment'
import api from '~/assets/api/index.js'
import markdown from '~/assets/utils/markdown.js'
export default {
  filters: {
    momentTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
    // filterArray(val) {}
  },
  async asyncData({ query }) {
    if (!query.id) return
    const { data } = await api.findOneArticle(query)
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
  }
}
</script>
<style lang="scss">
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
    h1 {
      font-size: 2.7rem;
      line-height: 1.67;
    }
  }
}
.article-detail--content {
  position: relative;
  box-shadow: 0 2px 10px var(--shadow-color);
  background: #fff;
  width: 70%;
}
.hambuger {
  height: 40px;
  background: #e1f0ff;
}
.nav-title {
  text-align: center;
  color: #888;
  border-bottom: 1px solid rgb(30, 144, 255);
  font-size: 1rem;
}
.detailed-title {
  font-size: 1.8rem;
  text-align: center;
  padding: 1rem;
}
.center {
  text-align: center;
}

.detailed-content {
  padding: 1.3rem;
  font-size: 1.05rem;
  color: #000;
  line-height: 1.9rem;
  img {
    margin: 0 auto !important;
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
    font-size: 1.8 rem;
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
}
.detail-introduction {
  border: 3px solid #f6f6f6;
  text-align: center;
  padding: 5px;
  margin: 5px 10px;
  box-shadow: 3px 3px 0 0 #f6f6f6;
}
.toc-list {
  padding: 0 10px;
  max-height: 400px;
  overflow-y: auto;
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
  padding: 6px 13px;
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
</style>
