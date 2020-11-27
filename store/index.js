// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import assert from 'assert'
import * as Realm from 'realm-web'

export const state = () => ({
  hydrated: false,
  footerHeight: null,
  dashboardRole: null,
})

export const mutations = {
  setHydrated(state, val) {
    state.hydrated = val
  },
  setFooterHeight(state, val) {
    state.footerHeight = val
  },
  setDashboardRole(state, val) {
    state.dashboardRole = val
  },
}

export const actions = {
  async nuxtClientInit(_) {
    try {
      // console.log(this.$realmApp)
      if (this.$realmApp.currentUser) {
        this.$apolloHelpers.onLogin(this.$realmApp.currentUser.accessToken)
      } else {
        const credentials = Realm.Credentials.emailPassword(
          'admin@eventimeline.com',
          'admin@eventimeline.com'
        )
        const user = await this.$realmApp.logIn(credentials)
        assert(user.id === this.$realmApp.currentUser.id)
        this.$apolloHelpers.onLogin(user.accessToken)
      }
    } catch (err) {
      console.error('Failed to log in', err)
    }
  },
}
// async nuxtServerInit() {
//   // console.log(this.$realmAppUser)
// },
