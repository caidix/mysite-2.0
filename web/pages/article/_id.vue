<template>
  <section class="article">
    <section v-if="isLoading">
      <section class="article-detail__header" :style="backgroundImage">
        <section class="article-detail__title">
          <h1 v-setTitle="content.title">{{ content.title }}</h1>
          <span>{{ content.updatedAt | momentTime }}</span>
        </section>
      </section>
      <section class="article-detail__content animate__fadeInUp">
        <section v-html="content.articleContent"></section>
      </section>
      <comment-component :id="content._id || ''" />
    </section>
    <section v-else>加载中</section>
    <toc-component :toc="content.toc"></toc-component>
  </section>
</template>

<script>
import TocComponent from "./toc";
import CommentComponent from "./components/comments";
import { findOneArticle } from "@/modules/http";
import "highlight.js/styles/monokai-sublime.css";
import "@/assets/css/markdown.scss";
import markdown from "@/modules/markdown";
import { setTitle } from "@/modules/directive/set-title";
import FormatTimeMixin from "@/modules/mixins/format-time";

export default {
  // async asyncData({ query }) {
  //   if (!query.id) return;
  //   const { data } = await findOneArticle({ ...query });
  //   if (data && data.code === 0) {
  //     const articleContent = markdown.marked(data.data.articleContent.content);
  //     await articleContent.then((response) => {
  //       data.data.articleContent = response.content;
  //       data.data.toc = response.toc;
  //     });
  //     return {
  //       content: data.data,
  //     };
  //   }
  // },
  components: { TocComponent, CommentComponent },
  directives: {
    setTitle,
  },
  mixins: [FormatTimeMixin],
  data() {
    return {
      content: {},
      isLoading: true,
    };
  },
  computed: {
    backgroundImage() {
      // 根据背景图数组的长度随机选择索引
      const randIndex = Math.floor(Math.random() * 4 + 1);
      const backgroundImage = this.content.img_url
        ? this.content.img_url
        : `https://cd-blog.oss-cn-shenzhen.aliyuncs.com/background/background${randIndex}.jpg`;
      return {
        backgroundImage: `url(${backgroundImage})`,
      };
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const { query } = this.$route;
      if (!query || !query.id) {
        return;
      }
      const { data } = await findOneArticle(query);
      if (data && data.code === 0) {
        const articleContent = markdown.marked(
          data.data.articleContent.content
        );
        await articleContent.then((response) => {
          data.data.articleContent = response.content;
          data.data.toc = response.toc;
        });
        this.content = data.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  margin: -12px;
  position: relative;
}

.article-detail__header {
  background-size: cover;
  width: 100%;
  height: 50vh;
  border-radius: 0 0 1rem 1rem;
  background-position: top left;
  background-origin: border-box;
  background-repeat: no-repeat;
  position: relative;
  .article-detail__title {
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

.article-detail__content {
  animation-duration: 1s;
  margin: -120px auto 0;
  width: 95%;
  border-radius: 1rem;
  position: relative;
  background: #ffffff;
  padding: 1.3rem;
  box-shadow: 0 2px 10px #0178b8;
  font-size: 1.05rem;
  color: #000;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, 微软雅黑, Arial, sans-serif;
}
@media (max-width: 768px) {
  .article-detail__header .article-detail__title {
    font-size: 1rem;
    top: 30%;
    h1 {
      font-size: 1.3rem;
    }
  }
  .article-detail__content {
    width: 100%;
  }
  .main-list {
    display: none !important;
  }
}
</style>