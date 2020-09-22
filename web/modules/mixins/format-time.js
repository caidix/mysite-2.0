import moment from "moment";
const DEFAULT_FORMAT_TIME = "YYYY-MM-DD HH:mm:ss";
export default {
  filters: {
    momentTime(val) {
      return moment(val).format(DEFAULT_FORMAT_TIME);
    },
  },
};
