import BaseChevronDownIcon from '~/components/atoms/icons/BaseChevronDownIcon.vue'
export default {
  computed: {
    filters() {
      const vm = this
      return [
        {
          label: 'Categories',
          path: 'category',
          icon: BaseChevronDownIcon,
          get isOpen() {
            return vm.expanded.includes(this.path)
          },
          get active() {
            return vm.$route.query[this.path] !== undefined || this.isOpen
          },
          subItems: [
            {
              label: 'Remove category filter',
              icon: () => import('~/components/atoms/icons/BaseRemoveIcon'),
              to: {
                path: '/events',
                query: {
                  category: undefined,
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'remove',
              pointerValue: 'remove',
            },
            {
              label: 'Birthdays',
              icon: () => import('~/components/atoms/icons/BaseGiftIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'birthday',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'birthday',
            },
            {
              label: 'Conferences',
              icon: () => import('~/components/atoms/icons/BaseConferenceIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'conference',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'conference',
            },
            {
              label: 'Convocations',
              icon: () => import('~/components/atoms/icons/BaseCertIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'convocation',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'convocation',
            },
            {
              label: 'Dinners',
              icon: () => import('~/components/atoms/icons/BaseFoodIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'dinner',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'dinner',
            },
            {
              label: 'Hangouts',
              icon: () => import('~/components/atoms/icons/BaseUsersIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'hangout',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'hangout',
            },
            {
              label: 'Launch Parties',
              icon: () => import('~/components/atoms/icons/BaseLaunchIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'launch-party',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'launch-party',
            },
            {
              label: 'Matriculations',
              icon: () => import('~/components/atoms/icons/BaseAcademyIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'matriculation',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'matriculation',
            },
            {
              label: 'Meetups',
              icon: () => import('~/components/atoms/icons/BaseBookmarkIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'meetup',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'meetup',
            },
            {
              label: 'Seminars',
              icon: () => import('~/components/atoms/icons/BaseSeminarIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'seminar',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'seminar',
            },
            {
              label: 'Weddings',
              icon: () => import('~/components/atoms/icons/BaseRingIcon'),
              to: {
                path: '/events',
                query: {
                  category: 'wedding',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'wedding',
            },
          ],
        },

        {
          label: 'Timeline',
          path: 'timeline',
          icon: BaseChevronDownIcon,
          get isOpen() {
            return vm.expanded.includes(this.path)
          },
          get active() {
            return vm.$route.query[this.path] !== undefined || this.isOpen
          },
          subItems: [
            {
              label: 'Remove timeline filter',
              icon: () => import('~/components/atoms/icons/BaseRemoveIcon'),
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: undefined,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'remove',
            },
            {
              label: 'Today',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: 'today',
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'today',
            },
            {
              label: 'Tomorrow',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: 'tomorrow',
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'tomorrow',
            },
            {
              label: 'This week',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: 'this-week',
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'this-week',
            },
            {
              label: 'Next week',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: 'next-week',
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'next-week',
            },
            {
              label: 'This month',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: 'this-month',
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'this-month',
            },
            {
              label: 'Next month',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: 'next-month',
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'timeline',
              pointerValue: 'next-month',
            },
          ],
        },

        {
          label: 'Price',
          path: 'price',
          icon: BaseChevronDownIcon,
          get isOpen() {
            return vm.expanded.includes(this.path)
          },
          get active() {
            return vm.$route.query[this.path] !== undefined || this.isOpen
          },
          subItems: [
            {
              label: 'Remove price filter',
              icon: () => import('~/components/atoms/icons/BaseRemoveIcon'),
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: undefined,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: 'remove',
            },
            {
              label: 'N0 - N500',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '0-500',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '0-500',
            },
            {
              label: 'N500 - N1, 000 ',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '500-1000',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '500-1000',
            },
            {
              label: 'N1, 000 - N3, 000',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '1000-3000',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '1000-3000',
            },
            {
              label: 'N3, 000 - N5, 000',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '3000-5000',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '3000-5000',
            },
            {
              label: 'N5, 000 - N10, 000',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '5000-10000',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '5000-10000',
            },
            {
              label: 'N10, 000 - Above',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '10000-above',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '10000-above',
            },
          ],
        },
        // {
        //   label: 'Location',
        //   path: 'location',
        //   icon: BaseChevronDownIcon,
        //   get isOpen() {
        //     return vm.expanded.includes(this.path)
        //   },
        //   get active() {
        //     return vm.$route.query[this.path] !== undefined || this.isOpen
        //   },
        //   subItems: [
        //     {
        //       label: 'Your Area',
        //       to: {
        //         path: '/events',
        //         query: {
        //           category: this.$route.query.category,
        //           timeline: this.$route.query.timeline,
        //           price: this.$route.query.price,
        //           location: 'your-area',
        //         },
        //       },
        //       pointerKey: 'location',
        //       pointerValue: 'your-area',
        //     },
        //     {
        //       label: 'Your State',
        //       to: {
        //         path: '/events',
        //         query: {
        //           category: this.$route.query.category,
        //           timeline: this.$route.query.timeline,
        //           price: this.$route.query.price,
        //           location: 'your-state',
        //         },
        //       },
        //       pointerKey: 'location',
        //       pointerValue: 'your-state',
        //     },
        //     {
        //       label: 'Your Country',
        //       to: {
        //         path: '/events',
        //         query: {
        //           category: this.$route.query.category,
        //           timeline: this.$route.query.timeline,
        //           price: this.$route.query.price,
        //           location: 'your-country',
        //         },
        //       },
        //       pointerKey: 'location',
        //       pointerValue: 'your-country',
        //     },
        //     {
        //       label: 'Your Continent',
        //       to: {
        //         path: '/events',
        //         query: {
        //           category: this.$route.query.category,
        //           timeline: this.$route.query.timeline,
        //           price: this.$route.query.price,
        //           location: 'your-continent',
        //         },
        //       },
        //       pointerKey: 'location',
        //       pointerValue: 'your-continent',
        //     },
        //     {
        //       label: 'Your World',
        //       to: {
        //         path: '/events',
        //         query: {
        //           category: this.$route.query.category,
        //           timeline: this.$route.query.timeline,
        //           price: this.$route.query.price,
        //           location: 'your-world',
        //         },
        //       },
        //       pointerKey: 'location',
        //       pointerValue: 'your-world',
        //     },
        //   ],
        // },
      ]
    },
  },
}
