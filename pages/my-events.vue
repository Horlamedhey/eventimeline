<template>
  <BaseEventsPagesSlot
    :events="events"
    :my-events-loading="$fetchState.pending"
    :is-my-events="true"
  ></BaseEventsPagesSlot>
</template>

<script>
import fetchMyEvents from '@/graphs/read/fetchMyEvents'
// import basicMixins from '~/mixins/pagesBasicMixins.js'
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
        variables: { authId: this.$realmApp.currentUser.customData.authId },
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
}
</script>
