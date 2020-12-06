import fetchEvents from '@/graphs/read/fetchEvents'
const formatDate = (date) => {
  return date.split('T')[0]
}
const timelines = () => {
  let todayDate = new Date()
  todayDate = formatDate(todayDate.toISOString())

  let tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  tomorrowDate = formatDate(tomorrowDate.toISOString())

  let nextTomorrowDate = new Date()
  nextTomorrowDate.setDate(nextTomorrowDate.getDate() + 2)
  nextTomorrowDate = formatDate(nextTomorrowDate.toISOString())

  const todayDayNumber = new Date().getDay()
  const additionCoefficient = 6 - todayDayNumber + 1
  let firstDateOfNextWeek = new Date()
  firstDateOfNextWeek.setDate(
    firstDateOfNextWeek.getDate() + additionCoefficient
  )
  firstDateOfNextWeek = formatDate(firstDateOfNextWeek.toISOString())

  let firstDateOfUpperWeek = new Date()
  firstDateOfUpperWeek.setDate(
    firstDateOfUpperWeek.getDate() + additionCoefficient + 7
  )
  firstDateOfUpperWeek = formatDate(firstDateOfUpperWeek.toISOString())

  let firstDateOfNextMonth = new Date()
  firstDateOfNextMonth.setMonth(firstDateOfNextMonth.getMonth() + 1)
  firstDateOfNextMonth.setDate(1)
  firstDateOfNextMonth = formatDate(firstDateOfNextMonth.toISOString())

  let firstDateOfUpperMonth = new Date()
  firstDateOfUpperMonth.setMonth(firstDateOfUpperMonth.getMonth() + 2)
  firstDateOfUpperMonth.setDate(1)
  firstDateOfUpperMonth = formatDate(firstDateOfUpperMonth.toISOString())
  return {
    today: {
      lowerLimit: todayDate,
      upperLimit: tomorrowDate,
    },
    tomorrow: {
      lowerLimit: tomorrowDate,
      upperLimit: nextTomorrowDate,
    },
    'this-week': {
      lowerLimit: todayDate,
      upperLimit: firstDateOfNextWeek,
    },
    'next-week': {
      lowerLimit: firstDateOfNextWeek,
      upperLimit: firstDateOfUpperWeek,
    },
    'this-month': {
      lowerLimit: todayDate,
      upperLimit: firstDateOfNextMonth,
    },
    'next-month': {
      lowerLimit: firstDateOfNextMonth,
      upperLimit: firstDateOfUpperMonth,
    },
  }
}

const fetchTheEvents = async (app, route, lastId) => {
  try {
    const {
      data: { PaginatedEvents },
    } = await app.$apolloClient.query({
      query: fetchEvents,
      variables: {
        eventsRoute: route.name === 'events',
        authId: '5f908a893e9c107033bb2932',
        lastId,
        category:
          route.query.category === 'latest' ? undefined : route.query.category,
        timeline: route.query.timeline
          ? timelines()[route.query.timeline]
          : undefined,
        price: route.query.price
          ? {
              lowerLimit: parseInt(route.query.price.split('-')[0]),
              upperLimit: parseInt(route.query.price.split('-')[1]),
            }
          : undefined,
      },
    })

    return PaginatedEvents
  } catch (err) {
    console.log('meeeee', err.message)
    if (err.message.includes('401') || err.message.includes('$apolloClient')) {
      app.$realmApp.currentUser.refreshCustomData()
      fetchTheEvents()
    }
    // else {
    //   return 'err'
    // }
  }
}
export default {
  async asyncData({ app, route }) {
    const { events, count } = await fetchTheEvents(app, route)
    return { events, count }
  },
  data() {
    return {}
  },
  async fetch() {
    const result = await fetchTheEvents(
      this.$nuxt.context.app,
      this.$route,
      this.paginating && this.events.length > 0
        ? this.events[this.events.length - 1]._id
        : undefined
    )
    this.events = result.events

    this.count = result.count
  },
  fetchDelay: 1000,
  watch: {
    '$route.query': '$fetch',
  },

  methods: {
    async fetchMoreEvents($state) {
      if (this.events.length === this.count) {
        $state.loaded()
        $state.complete()
      } else {
        this.err = false
        this.paginating = true
        await new Promise((resolve) => {
          this.$fetch()
          resolve()
        })
        if (this.err) {
          $state.error()
        } else {
          $state.loaded()
        }
      }
    },
  },
}
