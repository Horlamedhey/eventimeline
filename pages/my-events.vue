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
    const { pageNumber, lastId } = this.$store.state.myLastFetch
    const fetchTheEvents = async () => {
      try {
        const {
          data: {
            MyPaginatedEvents: { events, count, moddedListedEvents },
          },
        } = await this.$apolloClient.query({
          query: fetchMyEvents,
          variables: {
            email: this.$realmApp.currentUser.customData.email,
            lastId:
              typeof pageNumber === 'number' &&
              parseInt(this.$route.query.page) === pageNumber + 1
                ? lastId
                : undefined,
            pageNumber: parseInt(this.$route.query.page),
          },
        })

        if (events && events.length > 0) {
          this.$store.commit('setMyLastFetch', {
            lastId: events[events.length - 1]._id,
            pageNumber: parseInt(this.$route.query.page || 1),
          })
        }
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
  fetchOnServer: false,
  watch: {
    '$route.query': '$fetch',
  },
  // onQueryChange() {
  //   this.$forceUpdate()
  // },
}
</script>
