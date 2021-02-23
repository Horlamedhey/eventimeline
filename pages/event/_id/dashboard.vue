<template>
  <div v-if="$fetchState.pending || event === null" class="text-center">
    Please wait while we fetch your event details...
  </div>
  <nuxt-child
    v-else
    :event="event"
    @agents="(agents) => (event.agents = agents)"
    @takeAction="takeAction"
    @updateEvent="updateEvent"
  ></nuxt-child>
</template>

<script>
import fetchAdminEvent from '@/graphs/read/fetchAdminEvent'
import checkInTicketMutation from '@/graphs/update/checkInTicketMutation'
import computeRole from '@/helpers/computeRole'
export default {
  name: 'Dashboard',
  layout: 'dashboard',
  async fetch() {
    const fetchTheEvents = async () => {
      try {
        const email = this.$realmApp.currentUser.customData.email
        const {
          data: { event },
        } = await this.$apolloClient.query({
          query: fetchAdminEvent,
          variables: { eventId: this.$route.params.id },
        })
        await new Promise((resolve) => {
          this.event = computeRole(event, email)
          resolve()
        })
        this.$store.commit('setDashboardRole', this.event.role)
      } catch (error) {
        console.log('meeeee', error)
        this.$realmApp.currentUser.refreshCustomData()
        await fetchTheEvents()
      }
    }
    await fetchTheEvents()
  },
  data() {
    return {
      event: null,
    }
  },
  methods: {
    async takeAction(ticketId) {
      this.event.soldTickets.find(
        (v) => v.ticketId === ticketId
      ).checkedIn = true
      try {
        await this.$apolloClient.mutate({
          mutation: checkInTicketMutation,
          variables: { eventId: this.$route.params.id, ticketId },
        })
      } catch (error) {
        console.log('meeeee', error)
        // TODO: Keep the faild checking in browser till later
        // this.$realmApp.currentUser.refreshCustomData()
        // await fetchTheEvents()
      }
    },
    updateEvent(values) {
      console.log(values)
    },
  },
  fetchOnServer: false,
  // mounted() {
  //   console.log(this.$realmApp.users)
  // },
}
</script>
