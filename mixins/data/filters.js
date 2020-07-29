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
              label: 'Matriculations',
              to: {
                path: '/events',
                query: {
                  category: 'matriculations',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'matriculations',
            },
            {
              label: 'Birthdays',
              to: {
                path: '/events',
                query: {
                  category: 'birthdays',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'birthdays',
            },
            {
              label: 'Launch Parties',
              to: {
                path: '/events',
                query: {
                  category: 'launch-parties',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'launch-parties',
            },
            {
              label: 'Hangouts',
              to: {
                path: '/events',
                query: {
                  category: 'hangouts',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'hangouts',
            },
            {
              label: 'Meetups',
              to: {
                path: '/events',
                query: {
                  category: 'meetups',
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'category',
              pointerValue: 'meetups',
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
              label: 'N50 - N500',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: '50-500',
                  location: this.$route.query.location,
                },
              },
              pointerKey: 'price',
              pointerValue: '50-500',
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
        {
          label: 'Location',
          path: 'location',
          icon: BaseChevronDownIcon,
          get isOpen() {
            return vm.expanded.includes(this.path)
          },
          get active() {
            return vm.$route.query[this.path] !== undefined || this.isOpen
          },
          subItems: [
            {
              label: 'Your Area',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: 'your-area',
                },
              },
              pointerKey: 'location',
              pointerValue: 'your-area',
            },
            {
              label: 'Your State',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: 'your-state',
                },
              },
              pointerKey: 'location',
              pointerValue: 'your-state',
            },
            {
              label: 'Your Country',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: 'your-country',
                },
              },
              pointerKey: 'location',
              pointerValue: 'your-country',
            },
            {
              label: 'Your Continent',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: 'your-continent',
                },
              },
              pointerKey: 'location',
              pointerValue: 'your-continent',
            },
            {
              label: 'Your World',
              to: {
                path: '/events',
                query: {
                  category: this.$route.query.category,
                  timeline: this.$route.query.timeline,
                  price: this.$route.query.price,
                  location: 'your-world',
                },
              },
              pointerKey: 'location',
              pointerValue: 'your-world',
            },
          ],
        },
      ]
    },
  },
}
