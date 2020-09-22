<template>
  <transition name="cd-message-fade" @after-leave="destoryElement">
    <div
      class="cd-message"
      :class="[
    type && `cd-message--${type}`,
    {
      'is-center': center,
      'is-close': showClose,
      'is-background':background
    }
    ]"
      v-show="visible"
      :style="contentStyle"
      @mouseenter="clearTimeout"
      @mouseleave="startTimeout"
    >
      <i :class="typeClass"></i>
      <p class="cd-message__content">{{message}}</p>
      <i class="icon-cd-delete" v-if="showClose" @click="close"></i>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: "",
      duration: 3000, // 过渡时间
      verticalOffset: 20, // 距离顶部视口高度
      type: "error",
      iconClass: "",
      center: false,
      onClose: null,
      showClose: false,
      closed: true,
      timer: null,
      background: true,
    };
  },
  computed: {
    contentStyle() {
      let style = {};
      if (typeof this.verticalOffset === "number") {
        style.top = this.verticalOffset + "px";
      }
      return style;
    },
    typeClass() {
      if (this.type && !this.iconClass) {
        return this.type !== "loading"
          ? `icon-cd-${this.type}-circle`
          : "icon-cd-spinner";
      } else {
        return this.iconClass ? `icon-cd-${this.iconClass}` : "";
      }
    },
  },
  watch: {
    closed(val) {
      if (val) {
        this.visible = false;
      }
    },
  },
  methods: {
    close() {
      if (!this.closed) {
        this.closed = true;
        if (typeof this.onClose === "function") {
          this.onClose();
        }
      }
    },
    startTimeout() {
      if (this.duration > 0) {
        this.timer = window.setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    clearTimeout() {
      if (this.timer !== null) {
        window.clearTimeout(this.timer);
        this.timer = null;
      }
    },
    destoryElement() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
  },
  mounted() {
    this.startTimeout();
    // document.addEventListener('mouseenter')
  },
};
</script>

<style lang="scss" scoped>
.cd-message {
  box-sizing: border-box;
  border-radius: 4px;
  border-width: 1px;
  border-color: "white";
  border-style: solid;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  padding: 14px;
  background-color: #fff;
  font-size: 16px;
  min-width: 300px;
  position: fixed;
  left: 50%;
  top: 20px;
  vertical-align: bottom;
  align-items: center;
  display: flex;
  overflow: hidden;
  transform: translateX(-50%);
  z-index: 999;
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  &.is-center {
    justify-content: center;
  }
  &.is-close {
    padding-right: 30px;
    .icon-cd-delete {
      position: absolute;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);
      right: 5px;
    }
  }
  .cd-message__content {
    padding: 0;
    font-size: 14px;
    line-height: 1;
    &:focus {
      outline-width: 0;
    }
  }
  $types: (
    "warning": #ff9800,
    "success": #4caf50,
    "error": #ed4014,
    "info": #9e9e9e,
  );
  $typesBackground: (
    "warning": #ffcc80,
    "success": #a5d6a7,
    "error": mix(#fff, #ed4014, 90%),
    "info": #eeeeee,
  );
  @each $type, $color in $types {
    &.cd-message--#{$type} {
      .icon-cd-#{$type}-circle {
        color: $color;
      }
    }
  }
  &.is-background {
    @each $type, $color in $types {
      &.cd-message--#{$type} {
        box-shadow: none;
        color: $color;
        border-color: $color;
        background-color: map-get($map: $typesBackground, $key: $type);
      }
    }
  }
}
.cd-message-fade-enter,
.cd-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>