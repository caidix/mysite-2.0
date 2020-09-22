<template>
  <div>
    <div v-for="(comment, i) in data" :key="comment._id">
      <v-list-item :class="{'ml-13': isChildren}">
        <v-list-item-avatar>
          <v-img src="/face.webp"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="comment-list__name" v-html="comment.username"></v-list-item-title>
          <span class="comment-list__right my-1">
            <a
              class="comment-list__reply"
              src="javascript:void(0)"
              @click.prevent="reply(comment)"
            >回复</a>
            <span>{{comment.createdAt|momentTime}}</span>
          </span>
          <p class="comment-list__content">{{comment.content}}</p>
        </v-list-item-content>
      </v-list-item>
      <v-divider v-if="isChildren && i === data.length - 1" />
      <v-divider v-if="i !== data.length - 1" inset />
      <CommentList
        v-if="comment.children"
        :data="comment.children"
        :isChildren="true"
        v-on="$listeners"
      />
    </div>
  </div>
</template>
<script>
import FormatTimeMixin from "@/modules/mixins/format-time";
export default {
  name: "CommentList",
  mixins: [FormatTimeMixin],
  props: {
    data: {
      type: Array,
      required: true,
    },
    isChildren: Boolean,
  },
  computed: {
    isInset() {
      return this.isChildren;
    },
  },
  methods: {
    reply(comments) {
      this.$emit("reply", comments);
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-list {
  background: #d5d7e4;
  border-color: rgb(213, 215, 228);
  padding: 8px 0;
  margin-bottom: 10px;
  color: rgb(40, 54, 70);
  .comment-list__right {
    font-size: 12px;
    color: rgb(40, 54, 70);
  }
  .comment-list__reply {
    color: #e832f2;
  }
  .comment-list__content {
    margin-left: 5px;
    margin-bottom: 0;
    font-size: 14px;
    color: #212121;
    line-height: 18px;
  }
  .comment-list__chip {
    color: #f9fafc;
    font-size: 14px;
    padding: 2px 10px 1px 10px;
    margin-top: 2px;
    white-space: nowrap;
    background: #4dba0e;
    border-radius: 20px 0 20px;
    transform: translateY(-50%) scale(0.9);
  }
  .comment-list__name {
    color: #63120a;
    font-weight: bold;
  }
}
</style>