<template>
  <BaseEventsPagesSlot
    :events="formattedEvents"
    :my-events-loading="$fetchState.pending"
    :is-my-events="true"
  ></BaseEventsPagesSlot>
</template>

<script>
import fetchMyEvents from '@/graphs/read/fetchMyEvents'
import computeRole from '~/helpers/computeRole.js'
export default {
  metaInfo: {
    title: 'My Events',
  },
  async fetch() {
    try {
      const {
        data: {
          MyPaginatedEvents: { events, moddedListedEvents },
        },
      } = await this.$apolloClient.query({
        query: fetchMyEvents,
        variables: { email: this.$realmApp.currentUser.customData.email },
      })

      this.events = events
      if (moddedListedEvents) {
        this.$realmApp.currentUser.refreshCustomData()
      }
    } catch (error) {
      console.log('meeeee', error)
    }
  },
  data() {
    return {
      events: [],
    }
  },
  computed: {
    formattedEvents() {
      if (!this.$fetchState.pending) {
        const email = this.$realmApp.currentUser.customData.email
        return this.events.map((u) => {
          return computeRole(u, email)
        })
      } else return []
    },
  },
  // mounted() {
  //   console.log(this.$realmApp.currentUser.customData)
  // },
  fetchOnServer: false,
}
</script>
