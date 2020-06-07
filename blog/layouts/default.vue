<template>
  <div class="cd-blog_layout">
    <Header />
    <div class="cd-blog_content">
      <nuxt />
    </div>
    <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    <div class="cd-blog_bottom flex"></div>
  </div>
</template>

<script>
import Header from '~/components/Header'
export default {
  transition: 'opacity',
  components: {
    Header
  }
}
</script>
