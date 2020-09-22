<template>
  <div v-if="comments.length">
    <v-flex class="text-center">
      <div class="text-panel">
        <h1 class="comment" data-text="COMMENT">COMMENT</h1>

        <div ref="alert" class="alert" v-show="alertMessage">
          <v-icon size="14" color="#F44336">mdi-emoticon-sad</v-icon>
          {{ alertMessage }}
        </div>
        <v-row>
          <v-col cols="6">
            <input
              ref="username"
              v-model="comment.username"
              class="text-input input-focus"
              type="text"
              placeholder="请输入您的昵称"
            />
          </v-col>
          <v-col cols="6">
            <input
              ref="email"
              v-model="comment.email"
              class="text-input input-focus"
              type="text"
              placeholder="请输入您的邮箱"
            />
          </v-col>
        </v-row>
        <v-chip
          class="mb-2 float-left"
          color="indigo"
          text-color="white"
          close
          v-if="isReply"
          @click:close="closeReply"
        >
          <v-avatar left>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <span>回复： {{replyData.username || ''}}</span>
        </v-chip>
        <textarea
          ref="content"
          v-model="comment.content"
          class="text-area input-focus"
          rows="5"
          placeholder="请做出你的选择"
        ></textarea>
        <v-btn class="comment-btn" text block @click="handleComment">发表评论</v-btn>
      </div>
    </v-flex>
    <div class="text-panel">
      <h3>评论</h3>
      <v-list color="#d5d7e4" class="rounded-lg comment-list">
        <comment-list :data="comments" @reply="reply" />
      </v-list>
    </div>
    <v-snackbar v-model="visible">{{ snack }}</v-snackbar>
  </div>
</template>

<script>
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
import CommentList from "./commentList";
import { getComment, postComment } from "~/modules/http/index";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    CommentList,
  },
  data() {
    return {
      comment: {
        username: "",
        email: "",
        content: "",
      },
      alertMessage: "",
      replyData: {},
      isReply: false,
      comments: [],
      visible: false,
      snack: "",
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    async getComment() {
      const { data } = await getComment({
        id: this.id,
      });
      this.comments = data.reduce((total, item) => {
        if (item.status === 1) {
          item.children = [];
          total.push(item);
        } else {
          total.map((i) => {
            if (i._id == item.replyId) {
              i.children.push(item);
            }
          });
        }
        return total;
      }, []);
    },
    handleComment() {
      const { username, email, content } = this.comment;
      if (!username.length) {
        this.alertMessage = "难道连你帅帅的昵称都不愿意告诉我吗？";
        this.$refs.username.focus();
        return;
      }
      if (!email.length) {
        this.alertMessage = "留下联系方式，我们才有未来！";
        this.$refs.email.focus();
        return;
      }
      if (!emailReg.test(email)) {
        this.alertMessage = "搞措没，人家要真的邮箱啦！";
        this.$refs.email.focus();
        return;
      }
      if (!content.length) {
        this.alertMessage = "真的不打算说点什么吗？";
        this.$refs.content.focus();
        return;
      }
      this.alertMessage = "";
      this.postComment();
    },
    async postComment() {
      const params = {
        ...this.comment,
        status: 1,
        articleId: this.id,
      };
      if (this.isReply) {
        params.replyName = this.replyData.username || "";
        params.replyEmail = this.replyData.email || "";
        params.status = this.replyData.status > 1 ? 3 : 2;
        params.replyId =
          this.replyData.status > 1
            ? this.replyData.replyId
            : this.replyData._id;
      }
      const { data } = await postComment(params);
      if (data && data.code === 0) {
        this.comment = {};
        this.visible = true;
        this.snack = data.message;
        this.closeReply();
        this.getComment();
      }
    },
    closeReply() {
      this.replyData = {};
      this.isReply = false;
    },
    reply(comment) {
      this.replyData = comment;
      this.isReply = true;
      this.$refs.username.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  font-style: oblique;
}
.comment-btn {
  color: #e8c08f;
  // font-weight: bold;
  font-size: 1rem;
}
.alert {
  font-size: 14px;
  color: #f44336;
}
.text-panel {
  padding: 1rem 1rem 10px;
  width: 95%;
  margin: 1rem auto 0;
  color: #e8c08f;
  border-radius: 10px;
  background: rgb(40, 54, 70);
  transition: 0.5s all;
  // border: 1px solid #e8c08f;
}
.input-focus {
  position: relative;
  outline: none;
  padding: 10px;
  width: 100%;
  &:focus {
    border-color: #e8c08f;
    background: #d5d7e4;
  }
}
.text-area {
  border-radius: 10px;
  padding: 10px;
  border: 1px dashed #eee;
}
.text-input {
  padding: 10px;
  border-radius: 2px;
  border-bottom: 1px dashed #eee;
}
.comment-list {
  background: #d5d7e4;
  border-color: rgb(213, 215, 228);
  padding: 8px 0;
  margin-bottom: 10px;
  color: rgb(40, 54, 70);
  .comment-list__right {
    font-size: 12px;
  }
  .comment-list__reply {
    color: #e832f2;
  }
  .comment-list__content {
    margin-left: 5px;
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