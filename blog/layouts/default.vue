<template>
  <div class="cd-blog_layout">
    <Header />
    <div class="cd-blog_content">
      <nuxt />
    </div>
    <Footer class="layout-footer-center"
      >2020-2020 &copy; CDHouse-我要变得更好</Footer
    >
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from '~/components/Header'
export default {
  components: {
    Header
  }
}
</script>
