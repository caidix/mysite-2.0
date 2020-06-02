<template>
  <section class="gather-panel">
    <section class="gather-background"></section>
    <section class="gather-panel__body">
      <section v-for="(item,index) in gatherList" :key="index" class="gather-item">
        <div class="gather-inner" @click="getArticleByGather(item)">
          <div
            class="gather-banner"
            :style="`background-image:url(${item.img || 'https://cd-blog.oss-cn-shenzhen.aliyuncs.com/blog/guidang.jpg'})`"
          ></div>
          <div class="gather-message">
            <p class="gather-title">
              <i class="iconfont icon-biaoqian"></i>
              {{ item.name }}
            </p>
            <span class="gather-desc">
              <i style="margin:13px"></i>
              {{ item.desc }}
            </span>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { getGather } from '~/assets/api/index.js'
export default {
  async asyncData() {
    const { data } = await getGather()
    return {
      gatherList: data.data
    }
  },
  data() {
    return {
      gatherList: []
    }
  }
}
</script>

<style lang="scss" scoped>
.gather-panel {
  height: 100vh;
  width: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background: url('https://cd-blog.oss-cn-shenzhen.aliyuncs.com/blog/articlelist.png')
    100% 100%;
}
.gather-panel__body {
  width: 80%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  padding-top: 12vh;
  border-radius: 1rem;
  .gather-item::before {
    content: '';
    position: absolute;
    left: 7px;
    right: 7px;
    top: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 5px;
    background-color: #fff;
    transition: all 0.2s linear;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.15);
  }
  .gather-item {
    cursor: pointer;
    width: 33%;
    box-sizing: border-box;
    transition: all 0.2s linear;
    position: relative;
    margin-bottom: 30px;
    z-index: 0;
    background-color: transparent;
    &:hover {
      transform: translateY(-3px);
      &::before {
        box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
      }
    }
    .gather-inner {
      border-radius: 5px;
      overflow: hidden;
      color: #333;

      margin: 0 7px;
    }
    .gather-banner {
      padding-top: 58.82%;
      background-color: #ccc;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .gather-message {
      padding: 10px 12px 15px;
    }
    .gather-title {
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 1rem;
      font-weight: 700;
      margin: 5px 0;
    }
    .gather-desc {
      color: rgb(99, 95, 95);
      padding-right: 0;
    }
  }
}
</style>
