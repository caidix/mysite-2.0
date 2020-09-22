<template>
  <div class="loading-box" v-show="visible">
    <lottie
      :options="defaultOptions"
      :height="400"
      :width="400"
      v-on:animCreated="handleAnimation"
      class="animation-lottle"
    ></lottie>
    <div class="shining">Loading...</div>
  </div>
</template>

<script>
import animationData from "~/assets/json/cute-cat-works.json";
export default {
  name: "VLoading",
  props: {
    visible: Boolean,
  },
  data() {
    return {
      defaultOptions: { animationData: animationData },
      animationSpeed: 1,
      anim: {},
    };
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim;
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-box {
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 100000;
  background: #1f1f1f;
  overflow-y: hidden;
  top: 0;
  left: 0;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .shining {
    font-size: 2em;
    font-family: Lato, sans-serif;
    letter-spacing: 4px;
    text-transform: uppercase;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(255, 255, 255, 1) 70%,
      rgba(0, 0, 0, 1) 100%
    );
    background-size: 80%;
    background-repeat: no-repeat;
    color: transparent;
    background-clip: text;
    animation: shining 3s linear infinite;
  }
  @keyframes shining {
    from {
      background-position: -300%;
    }
    to {
      background-position: 300%;
    }
  }
}
</style>