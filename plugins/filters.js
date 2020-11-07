import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatShortEventDate', (val) => moment(val).format('ll'))
Vue.filter('formatEventDate', (val) => moment(val).format('LL'))
