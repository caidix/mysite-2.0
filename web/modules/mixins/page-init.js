export default {
  methods: {
    closePageInit() {
      if (this.$store.getters.getPageInit) return;
      this.$store.commit("changePageStatus", false);
    },
    openPageInit() {
      if (!this.$store.getters.getPageInit) return;
      this.$store.commit("changePageStatus", true);
    },
  },
};
