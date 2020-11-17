import fetchEvents from '@/graphs/read/fetchEvents'
export default {
  async asyncData({ app, route }) {
    try {
      const {
        data: { events },
      } = await app.$apolloClient.query({
        query: fetchEvents,
        variables: {
          eventsRoute: route.name === 'events',
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
