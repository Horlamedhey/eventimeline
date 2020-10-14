// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
import assert from 'assert'
import * as Realm from 'realm-web'

export const state = () => ({
  hydrated: false,
  footerHeight: null,

  events: [
    {
      title: 'DJ Kentucky Nightlife Party',
      color: '#7B523E',
      textColor: '#ffffff',
      image: 'events/party.jpg',
      price: 'Free',
      date: 'Tomorrow',
      date1: 'Tomorrow',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-1',
    },
    {
      title: 'Pineapple Mask & Costume Party',
      color: '#AD660D',
      textColor: '#ffffff',
      image: 'events/party1.jpg',
      price: 'N3,000',
      date: 'Wednesday',
      date1: 'Wednesday',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-2',
    },
    {
      title: 'Bra, Cocktail, Disco Bash. Couple’s',
      color: '#2F201F',
      textColor: '#ffffff',
      image: 'events/party2.jpg',
      price: 'N1,500',
      date: "June, 27th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-3',
    },
    {
      title: 'Ilorin Twitter Hangout',
      color: '#E5DDD6',
      textColor: '#000000',
      image: 'events/party3.jpg',
      price: 'N2,000',
      date: "July 8th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-4',
    },
    {
      title: 'Smiley Face Mask Party, Vol. 6',
      color: '#ECF7F9',
      textColor: '#000000',
      image: 'events/party4.jpg',
      price: 'Mixed',
      date: "July 13th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-5',
    },
    {
      title: 'Sounbar Relauncg Street Jamz',
      color: '#1C2A26',
      textColor: '#ffffff',
      image: 'events/party5.jpg',
      price: 'Mixed',
      date: "Sept  7th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-6',
    },
    {
      title: 'Bra, Cocktail, Disco Bash. Couple’s',
      color: '#2F201F',
      textColor: '#ffffff',
      image: 'events/party2.jpg',
      price: 'N1,500',
      date: "June, 27th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      id: 'evt-7',
    },
    {
      title: 'Ilorin Twitter Hangout',
      color: '#E5DDD6',
      textColor: '#000000',
      image: 'events/party3.jpg',
      price: 'N2,000',
      date: "July 8th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      id: 'evt-8',
    },
    {
      title: 'Smiley Face Mask Party, Vol. 6',
      color: '#ECF7F9',
      textColor: '#000000',
      image: 'events/party4.jpg',
      price: 'Mixed',
      date: "July 13th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      provisions: [
        'Full security guaranteed.',
        'Food, drinks, and Snacks to be provided.',
        'Performance by Wizkid, SugarBoy, Kizz Daniel and Johny Drille.',
        'Babes available.',
      ],
      id: 'evt-9',
    },
    {
      title: 'Sounbar Relauncg Street Jamz',
      color: '#1C2A26',
      textColor: '#ffffff',
      image: 'events/party5.jpg',
      price: 'Mixed',
      date: "Sept  7th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      id: 'evt-10',
    },
    {
      title: 'DJ Kentucky Nightlife Party',
      color: '#7B523E',
      textColor: '#ffffff',
      image: 'events/party.jpg',
      price: 'Free',
      date: 'Tomorrow',
      date1: 'Tomorrow',
      id: 'evt-11',
    },
    {
      title: 'Pineapple Mask & Costume Party',
      color: '#AD660D',
      textColor: '#ffffff',
      image: 'events/party1.jpg',
      price: 'N3,000',
      date: 'Wednesday',
      date1: 'Wednesday',
      id: 'evt-12',
    },
  ],
})

export const mutations = {
  setHydrated(state, val) {
    state.hydrated = val
  },
  setFooterHeight(state, val) {
    state.footerHeight = val
  },
}

export const actions = {
  async nuxtClientInit(_) {
    try {
      // console.log(this.$realmApp)
      if (this.$realmApp.currentUser) {
        this.$apolloHelpers.onLogin(this.$realmApp.currentUser.accessToken)
      } else {
        const credentials = Realm.Credentials.anonymous()
        const user = await this.$realmApp.logIn(credentials)
        assert(user.id === this.$realmApp.currentUser.id)
        this.$apolloHelpers.onLogin(user.accessToken)
      }
    } catch (err) {
      console.error('Failed to log in', err)
    }
  },
}
// async nuxtServerInit() {
//   // console.log(this.$realmAppUser)
// },
