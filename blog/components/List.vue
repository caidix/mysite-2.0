<template>
  <section>
    <nuxt-link
      v-for="(item, index) in data.data"
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
          <Tag v-for="(cat, i) in item.category" :key="i" color="magenta">{{ cat.name }}</Tag>
          <Tag v-for="tag in item.tags" :key="tag._id" color="cyan">{{ tag.name }}</Tag>
        </section>
        <section class="article-item--info">{{ item.introduction }}</section>
      </section>
    </nuxt-link>
    <Page
      v-if="data.data.length < 10"
      :total="data.total"
      class-name="article-pagination"
      :current="page"
      :page-size="limit"
      show-elevator
      show-sizer
      @on-change="handlePageChange"
      @on-page-size-change="handleLimitChange"
    />
  </section>
</template>

<script>
import moment from 'moment'
import table from '~/mixins/table'
export default {
  filters: {
    momentTime(val) {
      return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
    // filterArray(val) {}
  },
  mixins: [table],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    fetchData() {
      this.$emit('fetch-data', {
        limit: this.limit,
        page: this.page
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  background: #fff;
  width: 70%;
  cursor: pointer;
  margin: 3rem auto 0;
  border-radius: 0.25rem;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
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
      line-height: 1.6rem;
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
      line-height: 1.6rem;
    }
  }
}

.article-pagination {
  margin: 3rem auto 0;
  text-align: center;
}
</style>
