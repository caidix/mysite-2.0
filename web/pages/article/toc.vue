<template>
  <div class="toc-icon rounded-circle">
    <v-icon size="40" color="orange darken-2" @click="handleSheet">mdi-format-list-numbered-rtl</v-icon>
    <v-bottom-sheet v-model="sheet" inset hide-overlay>
      <v-sheet class="toc-sheet">
        <div class="toc-content" color="red" v-html="toc"></div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>
<script>
export default {
  props: {
    toc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      sheet: false,
    };
  },
  methods: {
    handleSheet() {
      this.sheet = !this.sheet;
    },
  },
};
</script>
<style lang="scss" scoped>
.toc-icon {
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  background: moccasin;
  padding: 0.5rem;
  cursor: pointer;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.toc-close-btn {
  position: absolute;
  right: 0;
}
.toc-sheet {
  max-height: 400px;
  overflow: auto;
}
.toc-content {
  padding-top: 1rem;
}
</style>