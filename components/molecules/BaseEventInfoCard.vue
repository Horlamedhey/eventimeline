<template>
  <div
    style="top: 58.3%; height: 83.33%"
    class="absolute flex flex-wrap w-11/12 overflow-hidden overflow-visible rounded-lg shadow lg:w-9/12 lg:left-1-5/12 left-0-5/12"
  >
    <div
      class="hidden h-full overflow-hidden sm:w-4/12 md:w-3/12 xl:w-2-5/12 sm:block"
    >
      <client-only>
        <cld-image
          :public-id="event.eventImage"
          :alt="event.eventTitle"
          fetch-format="auto"
          quality="auto"
          client-hints="true"
          crop="scale"
          loading="lazy"
          width="300"
          height="400"
          class="flex-shrink min-w-full min-h-full"
        >
          <cld-placeholder type="blur"> </cld-placeholder>
        </cld-image>
      </client-only>
    </div>
    <div
      class="flex flex-col justify-between w-full h-full p-4 bg-white sm:w-8/12 md:w-9/12 xl:w-9-5/12"
    >
      <div>
        <p
          class="flex justify-between text-base font-medium font-quicksand text-accent-light"
        >
          <span>{{ event.eventDate | formatEventDate }}</span>
          <BaseButton class="bg-transparent focus:outline-none">
            <BaseHeartIcon class="text-white" fill="#ea218d"></BaseHeartIcon>
          </BaseButton>
        </p>
        <p class="mt-2 text-xl font-semibold font-josefinsans text-black-700">
          {{ event.eventTitle }}
        </p>
      </div>

      <div class="items-end justify-between sm:flex">
        <div>
          <div class="flex items-center justify-between space-x-2">
            <div class="text-lg venue-price font-quicksand">Venue:</div>
            <div
              class="text-base venue-price-values text-black-800 font-quicksand"
            >
              {{ event.eventLocation }}
            </div>
          </div>
          <div
            class="flex items-center justify-between space-x-2 font-quicksand sm:mt-2"
          >
            <div class="venue-price">Price:</div>
            <div
              class="text-xl venue-price-values text-black-400 font-quicksand"
            >
              {{
                event.cheapestTicket.ticketPrice
                  ? ` ${event.cheapestTicket.ticketPrice | currencyFormatter}`
                  : 'FREE'
              }}
            </div>
          </div>
        </div>

        <div
          class="flex justify-end w-full mt-4 text-sm text-white sm:text-base md:text-lg sm:mt-0 sm:w-5/12 xl:w-4/12 sm:flex-wrap"
        >
          <BaseButton
            to="/donate"
            class="relative flex items-center justify-around w-6/12 px-1 py-2 font-bold rounded sm:py-3 md:py-4 sm:w-full bg-primary font-quicksand focus:outline-none"
          >
            <span class="text-gray-400 sm:w-3/4 sm:text-left sm:pl-2">
              DONATE
            </span>

            <BaseDownloadIcon class="w-4 h-4 sm:w-5 sm:h-5"></BaseDownloadIcon>
            <BaseComingSoon />
          </BaseButton>
          <BaseButton
            class="relative flex items-center justify-around w-6/12 px-1 py-2 ml-3 font-bold duration-500 rounded transion sm:py-3 md:py-4 sm:ml-0 sm:w-full sm:mt-3 font-quicksand focus:outline-none"
            :class="
              showTickets
                ? 'bg-white text-accent border-accent border'
                : 'bg-accent'
            "
            @click="showTickets = true"
          >
            <span class="sm:w-3/4 sm:text-left sm:pl-2"> BUY TICKET </span>

            <BaseDollarIcon class="w-4 h-4 sm:w-5 sm:h-5"></BaseDollarIcon>
            <BaseTriangleIcon
              id="ticketListDirectionIcon"
              class="absolute bottom-0 ml-auto -mb-4 text-gray-variant8"
              style="opacity: 0"
            ></BaseTriangleIcon>
          </BaseButton>
        </div>
      </div>
    </div>

    <div
      ref="ticketsContainer"
      class="absolute top-0 right-0 px-2 pt-2 pb-4 mr-4 rounded opacity-0 w-72 bg-gray-variant8"
      style="margin-top: 15rem; z-index: -1"
    >
      <BaseButton
        class="absolute top-0 right-0 mt-2 mr-2 sm:rounded-full focus:outline-none"
        @click="closeTickets"
      >
        <BaseCloseIcon class="w-4 h-4 text-white"></BaseCloseIcon>
      </BaseButton>
      <h4 class="text-sm font-medium text-center text-white">
        Select ticket type
      </h4>
      <div class="w-full mt-4 text-xs">
        <div
          v-for="(ticket, i) in event.tickets"
          :key="ticket.ticketType"
          class="flex items-end w-full mt-4 space-x-4"
        >
          <BaseButton
            class="relative w-1/3 py-2 font-normal transition duration-500"
            :class="
              checkIfSelected(ticket.ticketType)
                ? 'ripple-bg-accent  bg-accent text-white'
                : 'ripple-bg-white rounded bg-white text-black-700'
            "
            @click="selectOption(i)"
          >
            <span class="font-semibold">{{ ticket.ticketType }}</span>

            <br />
            {{ ticket.ticketPrice }}
            <div
              :class="[
                checkIfSelected(ticket.ticketType)
                  ? 'opacity-100'
                  : 'opacity-0',
              ]"
              class="absolute top-0 right-0 w-3 h-3 mt-1 mr-1 transition duration-300 bg-white border border-black rounded-full"
            ></div>
          </BaseButton>

          <div>
            <BaseFormText
              v-if="checkIfSelected(ticket.ticketType)"
              v-model="
                selectedTickets.find((v) => v.ticketType === ticket.ticketType)
                  .units
              "
              name="units"
              type="number"
              placeholder="UNITS"
              input-class-list="focus:border-2 border focus:border-accent text-white border-white h-8 px-2 rounded w-full py-4 text-sm"
            ></BaseFormText>
            <BaseFormText
              v-else
              :field-id="`${ticket.ticketType}-unit`"
              value="1"
              name="units"
              type="number"
              placeholder="UNITS"
              input-class-list="focus:border-2 border focus:border-accent
              text-white border-white h-8 px-2 rounded w-full py-4 text-sm"
            ></BaseFormText>
          </div>
        </div>
      </div>
      <div class="w-full mt-6">
        <p class="mb-1 text-xs text-red-400">
          *Please input a valid email for reference purposes.
        </p>
        <BaseFormText
          v-model="email"
          name="email"
          type="email"
          placeholder="EMAIL"
          autocomlabelplete
          label-class-list="text-white text-base"
          input-class-list="focus:border-2 border focus:border-accent text-white border-white h-8 px-2 rounded w-full py-4 text-sm"
        ></BaseFormText>
      </div>
      <div class="w-full mt-6">
        <p class="mb-1 text-xs text-red-400">*Optional.</p>
        <BaseFormText
          v-model="name"
          name="name"
          type="text"
          placeholder="NAME"
          autocomlabelplete
          label-class-list="text-white text-base"
          input-class-list="focus:border-2 border focus:border-accent text-white border-white h-8 px-2 rounded w-full py-4 text-sm"
        ></BaseFormText>
      </div>
      <client-only>
        <paystack
          v-if="selectedTickets.length > 0 && email.length > 0"
          :amount="computedAmount"
          :email="email.toLowerCase()"
          :paystackkey="paystackkey"
          :callback="callback"
          :close="closeTickets"
          :embed="false"
          :metadata="metadata"
          class="block m-auto mt-6 text-sm font-normal text-center text-white focus:outline-none hover:text-gray-400"
        >
          Proceed to pay
        </paystack>
      </client-only>
      <!-- <BaseButton
        to="/buy-ticket"
        class="block m-auto mt-6 text-sm font-normal text-center text-white"
      >
        Proceed to pay
      </BaseButton> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseEventInfoCard',
  props: {
    event: {
      type: Object,
      default: () => {},
    },
    image: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      paystackkey: 'pk_test_463329a8ae449eab684973547924b9cd5c56ebec', // paystack public key
      email: '',
      name: '',
      timeline: null,
      showTickets: false,
      selectedTickets: [],
    }
  },
  computed: {
    computedAmount() {
      return this.selectedTickets.reduce(
        (prevVal, currVal) =>
          prevVal + currVal.ticketPrice * 100 * currVal.units,
        0
      )
    },
    metadata() {
      return {
        custom_fields: this.selectedTickets.map((v) => ({
          units: parseInt(v.units),
          ticketType: v.ticketType,
          buyerName: this.name,
        })),
      }
    },
  },
  watch: {
    showTickets(curr) {
      const ticketListDirectionIcon = document.getElementById(
        'ticketListDirectionIcon'
      )
      if (curr) {
        this.timeline.fromTo(
          this.$refs.ticketsContainer,
          {
            zIndex: -1,
          },
          { zIndex: 4 }
        )
        this.timeline.fromTo(
          this.$refs.ticketsContainer,
          {
            opacity: 0,
            y: -40,
          },
          { opacity: 1, y: 0, duration: 0.4, ease: 'Power1.out' }
        )
        this.timeline.fromTo(
          ticketListDirectionIcon,
          {
            opacity: 0,
          },
          { opacity: 1, duration: 0.5, ease: 'Power1.out' }
        )
      } else {
        this.timeline.fromTo(
          ticketListDirectionIcon,
          { opacity: 1 },
          {
            opacity: 0,
            duration: 0.5,
            ease: 'Power1.out',
          }
        )
        this.timeline.fromTo(
          this.$refs.ticketsContainer,
          { opacity: 1, zIndex: 4, y: 0 },
          {
            opacity: 0,
            zIndex: -1,
            y: -40,
            duration: 1,
            // delay: 0.5,
            ease: 'Power1.out',
          }
        )
      }
    },
  },
  beforeMount() {
    this.timeline = this.$gsap.timeline()
  },
  methods: {
    reference() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
    },
    selectOption(index) {
      const { ticketType, ticketPrice } = this.event.tickets[index]
      const existingTicket = this.selectedTickets.find(
        (v) => v.ticketType === ticketType
      )
      if (existingTicket !== undefined) {
        this.selectedTickets.splice(
          this.selectedTickets.indexOf(existingTicket),
          1
        )
      } else {
        this.selectedTickets.push({
          ticketType,
          ticketPrice,
          units: parseInt(document.getElementById(`${ticketType}-unit`).value),
        })
      }
    },
    callback(response) {
      this.closeTickets()
      this.$emit('boughtTicket', response)
    },
    closeTickets() {
      this.showTickets = false
      this.selectedTickets = []
      this.email = ''
    },
    checkIfSelected(ticketType) {
      return (
        this.selectedTickets.find((v) => v.ticketType === ticketType) !==
        undefined
      )
    },
  },
}
</script>
