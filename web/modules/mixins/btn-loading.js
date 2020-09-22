export default {
  data() {
    return {
      isBtnLoading: false,
    };
  },
  methods: {
    btnLoading() {
      this.isBtnLoading = "loading";
    },
    btnLoaded() {
      this.isBtnLoading = false;
    },
  },
};
