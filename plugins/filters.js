import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatShortEventDate', (val) => moment(val).format('ll'))
Vue.filter('formatEventDate', (val) => moment(val).format('LLLL'))
Vue.filter('ticketDate', (val) => moment(val).format('MM/YY'))
Vue.filter('eventLiveDuration', (value) => {
  // const interval = 1000
  const incomingLocalTime = moment.utc(value).local()
  const currentLocalTime = moment.utc().local()
  const diffTime = currentLocalTime.diff(incomingLocalTime)
  //   return diffTime
  //   if (diffTime < 0) {
  //     return '00:00:00'
  //   } else {
  const duration = moment.duration(diffTime, 'milliseconds')
  return Math.round(duration.asDays())
  //     const hours =
  //       duration.years() * 365 * 24 +
  //       Math.round(duration.months() * 30.4167 * 24) +
  //       duration.days() * 24 +
  //       duration.hours()
  //     return `${hours}:${duration.minutes()}:${duration.seconds()}`
})
Vue.filter('ticketIdSplit', (val) => val.match(/.{1,4}/g).join('  '))

Vue.filter('currencyFormatter', (value) => {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  })

  return formatter.format(value)
})
