import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      loading: true,
      sidebarOpen: false,
    }
  },
  computed: {
    ...mapState(['hydrated']),
    sideMenuHeight() {
      if (this.hydrated && this.$refs.sideMenu) {
        return this.$refs.sideMenu.clientHeight + 50 + 'px'
      } else {
        return 'unset'
      }
    },
  },
  mounted() {
    this.setHydrated(true)
    setTimeout(() => {
      this.loading = false
    }, 3000)
  },
  methods: {
    ...mapMutations(['setHydrated']),
    toggleSideBar() {
      this.sidebarOpen = !this.sidebarOpen
    },
  },
}
