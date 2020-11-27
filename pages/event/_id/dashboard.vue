<template>
  <div v-if="$fetchState.pending || event === null" class="text-center">
    Please wait while we fetch your event details...
  </div>
  <nuxt-child
    v-else
    :event="event"
    @agents="(agents) => (event.agents = agents)"
  ></nuxt-child>
</template>

<script>
import fetchAdminEvent from '@/graphs/read/fetchAdminEvent'
import computeRole from '../../../helpers/computeRole'
export default {
  name: 'Dashboard',
  layout: 'dashboard',
  async fetch() {
    try {
      const email = this.$realmApp.currentUser.customData.email
      const {
        data: { event },
      } = await this.$apolloClient.query({
        query: fetchAdminEvent,
        variables: { eventId: this.$route.params.id },
      })
      this.event = computeRole(event, email)
      this.$store.commit('setDashboardRole', this.event.role)
    } catch (error) {
      console.log('meeeee', error)
    }
  },
  data() {
    return {
      event: null,
    }
  },
  fetchOnServer: false,
  // mounted() {
  //   console.log(this.$realmApp.users)
  // },
}
</script>
