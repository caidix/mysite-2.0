<template>
  <div>
    <div></div>
    <div class="cd-blog_body lan">
      <section class="article-lan">
        <h1>Categories</h1>
        <Divider />
        <span
          v-for="item in categoryList"
          :key="item._id"
          :class="{ checked: ischecked === item._id }"
          class="category"
          @click="checkedCategory(item._id)"
          >{{ item.name }}</span
        >
      </section>
      <article v-if="list">
        <Spin v-if="spinShow" fix>
          <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
          <div>Loading</div>
        </Spin>
        <List ref="list" :data="list" @fetch-data="fetchData" />
      </article>
      <section v-else>暂无资源</section>
    </div>
  </div>
</template>

<script>
import List from '~/components/List'
import { getCategory, getArticle } from '~/assets/api/index.js'
import articleMixins from '~/mixins/get-articles.js'
export default {
  components: { List },
  mixins: [articleMixins],
  async asyncData() {
    const { data: categoryList } = await getCategory()
    const { data: list } = await getArticle()
    return {
      categoryList: categoryList.data,
      list: list.data
    }
  },
  data() {
    return {
      categoryList: [],
      ischecked: ''
    }
  },
  methods: {
    checkedCategory(id) {
      this.ischecked = id
      this.$refs.list.fetchData()
    }
  }
}
</script>
<style lang="scss" scoped>
.lan {
  margin: 8rem 0rem 1rem 0rem;
}
.article-lan {
  padding: 1rem;
  width: 70%;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e7eaf1;
  box-shadow: 0 1px 3px rgba(0, 37, 55, 0.06);
  transition-duration: 1s;
  &:hover {
    box-shadow: 0 1px 10px #777;
  }
  section {
    width: 50%;
    flex: 1;
  }
}
@keyframes tada {
  from {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%,
  20% {
    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }

  30%,
  50%,
  70%,
  90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%,
  60%,
  80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  to {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
.category {
  display: inline-block;
  height: 35px;
  width: auto;
  padding: 0 10px;
  color: #555;
  border: 1px solid #e7eaf1;
  border-radius: 3px;
  line-height: 35px;
  margin: 4px;
  cursor: pointer;
  // animation-name: ;
  &:hover {
    animation-name: tada;
    animation-fill-mode: both;
    animation-duration: 0.5s;
    background-color: rgb(154, 133, 255);
    border: 1px solid rgb(154, 133, 255);
    color: white;
  }
  &.checked {
    background-color: #3de1ad;
    border: 1px solid #3de1ad;
    color: white;
  }
}
</style>
