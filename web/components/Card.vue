<template>
  <div class="card animate__fadeIn">
    <v-card class="ma-3 on-hover" max-width="500" min-height="500" width="100%">
      <v-img
        class="orange--text align-end text-lg-h6 cursor"
        lazy-src="/img-loading.gif"
        height="300"
        :src="cardImg"
        @click="handleToArticle"
      ></v-img>
      <!-- 标题 -->
      <v-card-title @click="handleToArticle">
        <span class="cursor">
          <v-icon color="blue">mdi-book</v-icon>
          {{data.title || ''}}
        </span>
      </v-card-title>
      <v-divider class="mx-4"></v-divider>
      <!-- 标签及时间 -->
      <v-card-text class="mb-0 pb-0">
        <v-row justify="space-between" class="mx-0 ml-1">
          <span>
            <v-icon color="blue">mdi-tag-multiple-outline</v-icon>
            {{mapTags(data.tags)}}
          </span>
          <div>
            <v-icon color="blue">mdi-timetable</v-icon>
            {{data.updatedAt | momentTime}}
          </div>
        </v-row>
      </v-card-text>
      <!-- 简介 -->
      <v-card-text class="mx-0 ml-1 pt-0">
        <div class="text-clamp-3">
          <span class="pr-7" />
          {{data.introduction}}
        </div>
      </v-card-text>
      <!-- 分享查看 -->
      <v-card-actions class="d-flex justify-space-between mr-2">
        <span>
          <v-btn text color="green accent-3" @click="share">Share</v-btn>
          <v-btn text color="purple" @click="handleToArticle">READ</v-btn>
        </span>
        <span>
          <v-tooltip top color="red">
            <template v-slot:activator="{ on, attrs }">
              <span class="mr-1">
                <v-icon color="red" v-bind="attrs" v-on="on">mdi-heart</v-icon>
                {{data.likes}}
              </span>
            </template>
            <span>收藏人数</span>
          </v-tooltip>
          <v-tooltip top color="deep-purple darken-1">
            <template v-slot:activator="{ on, attrs }">
              <span>
                <v-icon
                  class="mr-1"
                  color="deep-purple darken-1"
                  v-bind="attrs"
                  v-on="on"
                >mdi-eye-check-outline</v-icon>
                {{data.viewCount}}
              </span>
            </template>
            <span>阅读人数</span>
          </v-tooltip>
        </span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NoFindImg from "~/static/no_find_img.jpg";
import FormatTimeMixin from "~/modules/mixins/format-time";
export default {
  mixins: [FormatTimeMixin],
  data: () => ({
    selection: 1,
    isActive: false,
  }),
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    cardImg() {
      return this.data.img_url ? this.data.img_url : NoFindImg;
    },
  },
  methods: {
    mapTags(data) {
      return data.map(({ name }) => name).join("/");
    },
    handleToArticle() {
      window.open(`/article?id=${this.data._id}`);
    },
    share() {
      const result = this.$clipboard(
        `${this.data.title}\n我觉得这篇文章写的不错，一起来看吧！`
      );
      if (result) {
        this.$emit("handle-copy");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  animation-duration: 1s;
}
.text-clamp-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 66px;
}
.on-hover {
  transition: all 0.3s;
  &:hover {
    transform: translateY(-0.5rem) translateZ(0);
    box-shadow: 0 5px 10px 5px hsla(0, 0%, 43.1%, 0.4);
  }
}
.cursor {
  cursor: pointer;
}
</style>