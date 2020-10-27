import fetchEvents from '@/graphs/fetchEvents'
export default {
  async asyncData({ app, route }) {
    try {
      const {
        data: { events },
      } = await app.$apolloClient.query({
        query: fetchEvents,
        variables: { route: route.name === 'events' },
      })

      return {
        events,
      }
    } catch (error) {
      console.log('meeeee', error)
    }
  },
}
