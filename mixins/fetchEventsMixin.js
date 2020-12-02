import fetchEvents from '@/graphs/read/fetchEvents'
export default {
  async asyncData({ app, route }) {
    try {
      const {
        data: {
          PaginatedEvents: { events },
        },
      } = await app.$apolloClient.query({
        query: fetchEvents,
        variables: {
          eventsRoute: route.name === 'events',
          authId: '5f908a893e9c107033bb2932',
        },
      })

      return {
        events,
      }
    } catch (error) {
      console.log('meeeee', error)
    }
  },
}
