<template>
  <client-only>
    <BaseEventsPagesSlot
      v-if="showLogout"
      :events="formattedEvents"
      :count="count"
      :my-events-loading="$fetchState.pending"
      :is-my-events="true"
    ></BaseEventsPagesSlot>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'
import fetchMyEvents from '@/graphs/read/fetchMyEvents'
import computeRole from '~/helpers/computeRole.js'
export default {
  metaInfo: {
    title: 'My Events',
  },
  async fetch() {
    const fetchTheEvents = async () => {
      try {
        const {
          data: {
            MyPaginatedEvents: { events, count, moddedListedEvents },
          },
        } = await this.$apolloClient.query({
          query: fetchMyEvents,
          variables: { email: this.$realmApp.currentUser.customData.email },
        })

        this.events = events
        this.count = count
        if (moddedListedEvents) {
          this.$realmApp.currentUser.refreshCustomData()
        }
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
      events: [],
      count: 0,
    }
  },
  computed: {
    ...mapState(['showLogout']),
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
