// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)

export const state = () => ({
  hydrated: false,
  footerHeight: null,

  events: [
    {
      title: 'DJ Kentucky Nightlife Party',
      color: 'rgb(215, 12, 73)',
      image: 'party.jpg',
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
      color: 'rgb(53, 40, 27)',
      image: 'party1.jpg',
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
      color: 'rgb(10, 68, 226)',
      image: 'party2.jpg',
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
      color: 'rgb(60, 61, 63)',
      image: 'party3.jpg',
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
      color: 'rgb(20, 173, 198)',
      image: 'party4.jpg',
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
      color: 'rgb(160, 120, 140)',
      image: 'party5.jpg',
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
      color: 'rgb(10, 68, 226)',
      image: 'party2.jpg',
      price: 'N1,500',
      date: "June, 27th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      id: 'evt-7',
    },
    {
      title: 'Ilorin Twitter Hangout',
      color: 'rgb(60, 61, 63)',
      image: 'party3.jpg',
      price: 'N2,000',
      date: "July 8th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      id: 'evt-8',
    },
    {
      title: 'Smiley Face Mask Party, Vol. 6',
      color: 'rgb(20, 173, 198)',
      image: 'party4.jpg',
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
      color: 'rgb(160, 120, 140)',
      image: 'party5.jpg',
      price: 'Mixed',
      date: "Sept  7th, '20",
      date1: 'Fri, June 19, 2020 9:30 PM',
      id: 'evt-10',
    },
    {
      title: 'DJ Kentucky Nightlife Party',
      color: 'rgb(215, 12, 73)',
      image: 'party.jpg',
      price: 'Free',
      date: 'Tomorrow',
      date1: 'Tomorrow',
      id: 'evt-11',
    },
    {
      title: 'Pineapple Mask & Costume Party',
      color: 'rgb(53, 40, 27)',
      image: 'party1.jpg',
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
