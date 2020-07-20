import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["hydrated"]),
    sideMenuHeight() {
      if (this.hydrated && this.$refs.sideMenu) {
        return this.$refs.sideMenu.clientHeight + 50 + "px";
      } else {
        return "unset";
      }
    },
  },
};
