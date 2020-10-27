import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatEventDate', (val) => moment(val).format('LL'))
