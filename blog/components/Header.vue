<template>
  <header class="cd-blog_header isfixed" :class="{ 'header-show': isShow }">
    <div class="header-menu">
      <Tooltip class="author-card" content="爱你哟么么哒~">
        <img
          class="header-avator"
          src="https://cd-blog.oss-cn-shenzhen.aliyuncs.com/blog/avatar.jpg"
          alt
        />
        <span class="header-text">CD</span>
      </Tooltip>
      <ul>
        <nuxt-link to="/" tag="li">
          <i class="iconfont icon-shouye"></i>
          首页
        </nuxt-link>
        <nuxt-link to="/article" tag="li">
          <i class="iconfont icon-tag"></i>
          分类
        </nuxt-link>
        <nuxt-link to="/gather" tag="li">
          <i class="iconfont icon-nav_wodeguidang"></i>归档
        </nuxt-link>
        <nuxt-link to="/" tag="li">
          <i class="iconfont icon-wode"></i>关于我
        </nuxt-link>
      </ul>
    </div>
    <Drawer
      title="Basic Drawer"
      placement="left"
      :closable="false"
      v-model="value2"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </header>
</template>

<script>
let windowTop = 200
export default {
  data() {
    return {
      isShow: true,
      value2: true
    }
  },
  mounted() {
    document.addEventListener('scroll', this.watchScroll)
  },
  destroyed() {
    document.removeEventListener('scroll', this.watchScroll)
  },
  methods: {
    watchScroll() {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > windowTop) {
        this.isShow = false
        windowTop = scrollTop
      } else {
        this.isShow = true
        windowTop = scrollTop
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header-menu {
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    float: left;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 26px;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.4s;
    i {
      margin-bottom: 4px;
      font-size: 1.5rem;
    }
    &::after {
      position: absolute;
      content: '';
      top: 110%;
      left: 0;
      width: 100%;
      height: 3px;
      background: #3498db;
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s;
    }
    &:hover {
      color: #3498db;
    }
    &:hover::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  .author-card {
    position: relative;
    cursor: pointer;
    padding-right: 30px;
    &:hover {
      .header-avator {
        transform: rotateZ(1080deg);
      }
    }
  }
  .header-avator {
    transition: all 0.5s;
    border-radius: 50%;
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    overflow: hidden;
    color: #fff;
    height: 35px;
    width: 35px;
    vertical-align: middle;
  }
  .header-text {
    color: #1e90ff;
    text-align: left;
    position: absolute;
    font-size: 16px;
    font-weight: bold;
    right: -10px;
    bottom: -1px;
  }
}
</style>
