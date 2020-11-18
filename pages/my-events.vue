<template>
  <BaseEventsPagesSlot
    :events="formattedEvents"
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
  computed: {
    formattedEvents() {
      if (!this.$fetchState.pending) {
        const authId = this.$realmApp.currentUser.customData.authId
        return this.events.map((u) => {
          if (u.organiser && u.organiser.authId === authId) u.role = 'Organiser'
          else if (
            u.agents.length > 0 &&
            u.agents.find((v) => v.authId === authId) !== undefined
          )
            u.role = 'Agent'
          else if (
            u.thirdParties.length > 0 &&
            u.thirdParties.find((v) => v.authId === authId) !== undefined
          )
            u.role = 'ThirdParty'
          return u
        })
      } else return []
    },
  },
}
</script>
