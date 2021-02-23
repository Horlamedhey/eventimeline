import { mapState } from 'vuex'
export default {
  data() {
    return {
      logoutConfirmation: false,
    }
  },
  beforeMount() {
    this.$store.commit(
      'setShowLogout',
      this.$realmApp.currentUser.customData.email !== 'admin@eventimeline.com'
    )
  },
  computed: {
    ...mapState(['showLogout']),
  },
  methods: {
    logout() {
      this.$store.commit('setShowLogout', false)
      this.logoutConfirmation = false
      for (let i = 0; i < this.$realmApp.allUsers.length; i++) {
        const user = this.$realmApp.allUsers[i]
        if (
          user.state === 'active' &&
          user.customData.email !== 'admin@eventimeline.com'
        ) {
          user.logOut()
        }
      }
      if (this.$route.path !== '/') {
        this.$router.replace('/')
      }
    },
  },
}
