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
        data: { events },
      } = await this.$apolloClient.query({
        query: fetchMyEvents,
        variables: { email: this.$realmApp.currentUser.customData.email },
      })

      this.events = events
    } catch (error) {
      console.log('meeeee', error)
    }
  },
  fetchOnServer: false,
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
}
</script>
