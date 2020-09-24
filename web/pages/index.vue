<template>
  <div class="mx-4">
    <v-row align="center" justify="center">
      <v-select
        solo
        dense
        class="text-field__width mb-n3"
        v-model="searchTags"
        :items="tagList"
        label="分类筛选"
        multiple
      ></v-select>
    </v-row>
    <v-row align="center" justify="center" class="mb-5">
      <v-text-field
        class="text-field__width search"
        hide-details
        single-line
        filled
        rounded
        solo
        dense
        clearable
        label="文章搜索"
        v-model="searchInput"
      ></v-text-field>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            fab
            color="primary"
            small
            v-bind="attrs"
            v-on="on"
            @click="handleSearch"
          >
            <v-icon dark>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span>搜索</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mx-2"
            fab
            color="success"
            small
            v-bind="attrs"
            v-on="on"
            @click="reloadSearch"
          >
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </template>
        <span>重置</span>
      </v-tooltip>
    </v-row>
    <v-row align="center" justify="space-around" class="mt-2">
      <Card
        v-for="item in data"
        :key="item._id"
        :data="item"
        @handle-copy="handleCopyTips"
        class="animate__fadeInUp"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-btn
        v-if="showMore"
        class="mx-2"
        fab
        :loading="isBtnLoading"
        @click="loadMoreArticle"
        color="primary"
        >MORE</v-btn
      >
      <v-alert text color="pink accent-3" v-else>
        <div>我真的一滴也没有了</div>
      </v-alert>
    </v-row>
    <v-snackbar v-model="copyTips"
      >已成功复制文章地址！快去分享给小伙伴们吧!</v-snackbar
    >
  </div>
</template>

<script>
import Card from "~/components/Card";
import BtnLoadingMixin from "~/modules/mixins/btn-loading";
import { getArticle, getTags } from "~/modules/http";
const SEARCH_ARTICLE = 0;
const MORE_ARTICLE = 1;
export default {
  mixins: [BtnLoadingMixin],
  computed: {
    showMore() {
      return this.data.length < this.total;
    },
  },
  mounted() {
    this.getArticle();
    this.getTags();
  },
  data() {
    return {
      copyTips: false,
      total: 0,
      page: 1,
      data: [],
      searchTags: [],
      searchInput: "",
      tagList: [],
    };
  },
  components: {
    Card,
  },
  methods: {
    handleCopyTips() {
      this.copyTips = true;
    },
    reloadSearch() {
      this.searchTags = [];
      this.searchInput = "";
    },
    loadMoreArticle() {
      this.page = this.page + 1;
      this.getArticle();
    },
    handleSearch() {
      this.page = 1;
      this.getArticle(SEARCH_ARTICLE);
    },
    async getArticle(type) {
      this.btnLoading();
      const { data } = await getArticle({
        limit: 6,
        page: this.page,
        tags: this.searchTags,
        keyword: this.searchInput,
      });
      if (data.code === 0 && data.data) {
        const res = data.data;
        if (type === SEARCH_ARTICLE) {
          this.data = res.data;
        } else {
          this.data = this.data.concat(res.data);
        }
        this.total = res.total;
      }
      this.btnLoaded();
    },
    async getTags() {
      const { data } = await getTags();
      if (data.code === 0 && data.data) {
        this.tagList = data.data.map((item) => ({
          text: item.name,
          value: item._id,
        }));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-field__width {
  max-width: 500px;
}
.search {
  flex: 1 0;
}
</style>