<template>
  <v-fab-transition>
    <v-btn v-show="visible" color="pink" fab dark fixed bottom right @click.stop="scrollToTop">
      <v-icon>mdi-arrow-up-bold</v-icon>
    </v-btn>
  </v-fab-transition>
</template>
<script>
import { throttle } from "@/modules/utils/assist";
export default {
  name: "cd-Backtop",
  props: {
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      visible: false,
      container: null,
      el: null,
    };
  },
  mounted() {
    this.init();
    this.throttleScrollHandler = throttle(this.onScroll, 100);
    this.container.addEventListener("scroll", this.throttleScrollHandler);
  },
  beforeDestroy() {
    this.container.removeEventListener("scroll", this.throttleScrollHandler);
  },
  methods: {
    init() {
      this.container = window.document;
      this.el = document.documentElement;
    },
    onScroll() {
      let scrollTop = this.el.scrollTop;
      this.visible = scrollTop >= this.height;
    },
    scrollToTop() {
      let scrollTop = this.el.scrollTop;
      if ((scrollTop === 0 || scrollTop) && scrollTop < this.height) {
        this.visible = false;
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
      this.$emit("on-click");
    },
  },
};
</script>