<template>
  <div id="app">
    <div class="w-11/12 mx-auto">
      <template v-if="downloading">
        <h2 class="text-2xl font-medium text-center">Download preview</h2>
        <div class="flex items-center justify-center text-center">
          Please wait while we process your download...
        </div>
      </template>
      <div
        ref="tickets"
        :class="
          downloading
            ? 'opacity-100 relative z-auto'
            : 'opacity-0 absolute -z-1'
        "
        class="flex flex-col w-9/12 mx-auto space-y-4 transition duration-1000 sm:w-1/2 md:w-4/12 lg:w-3-5/12"
        :style="{ height: `${cardHeight * tickets.length + 50}px` }"
      >
        <div
          v-for="(ticket, i) in tickets"
          :key="`ticketToPrint-${i}`"
          class="block w-full"
          :class="cardHeight === 0 ? 'opacity-0' : 'opacity-100'"
          :style="{ height: `${cardHeight}px` }"
        >
          <div class="h-full">
            <img
              ref="card"
              src="https://res.cloudinary.com/befittinglife/image/upload/v1608885403/assets/card.svg"
              alt=""
              class="absolute w-full mx-auto"
              style="z-index: -1"
            />
            <div
              class="flex flex-col justify-between w-11/12 h-full pt-2 mx-auto transition duration-1000 delay-500"
              :class="cardHeight > 0 ? 'opacity-100' : 'opacity-0'"
            >
              <div>
                <h1 class="text-xs font-bold text-left text-red-600">
                  {{ ticket.ticketType }}
                  <sup v-if="ticket.units > 1">{{ ticket.units }}</sup>
                </h1>
              </div>
              <div class="flex items-center space-x-4">
                <vue-qr
                  :text="ticket.ticketId"
                  :qid="ticket.ticketId"
                  :size="30"
                  :margin="0"
                  class="absolute"
                ></vue-qr>
                <p
                  class="w-full text-center whitespace-no-wrap text-xxs sm:text-base lg:text-lg ticket"
                >
                  {{ ticket.ticketId | ticketIdSplit }}
                </p>
              </div>
              <div class="flex flex-row justify-between w-full pb-2 space-x-2">
                <div
                  class="flex flex-row items-center justify-between w-9/12 space-x-4"
                >
                  <div class="truncate">
                    <p
                      class="font-light truncate text-xxs sm:text-sm whitespace-nowrap ticket"
                    >
                      {{ ticket.buyerName }}
                    </p>
                  </div>
                  <div>
                    <p class="ticket text-xxs md:pt-1">
                      {{ eventDate | ticketDate }}
                    </p>
                  </div>
                </div>
                <div class="w-8 -mt-1">
                  <img
                    :src="eventImage"
                    alt=""
                    class="float-right w-8 h-8 border border-gray-400 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        :class="
          !downloading
            ? 'opacity-100 relative z-auto'
            : 'opacity-0 absolute -z-1'
        "
        class="w-9/12 mx-auto transition duration-1000 sm:w-1/2 md:w-4/12 lg:w-3-5/12"
        :style="{ height: `${cardHeight}px` }"
      >
        <div
          v-for="(ticket, i) in tickets"
          :key="`ticket-${i}`"
          class="absolute block w-full transition duration-1000 ease-in-out transform"
          :class="
            activeTicket === i
              ? ' translate-x-0 opacity-100'
              : activeTicket > i
              ? '-translate-x-full opacity-0'
              : 'translate-x-full opacity-0'
          "
          :style="{ height: `${cardHeight}px` }"
        >
          <div
            class="h-full beat"
            :class="cardHeight === 0 ? 'opacity-0' : 'opacity-100'"
          >
            <img
              ref="card"
              src="/images/card.svg"
              alt=""
              class="absolute w-full mx-auto"
              style="z-index: -1"
            />
            <div
              class="flex flex-col w-11/12 h-full pt-2 mx-auto transition duration-1000 delay-500"
              :class="cardHeight > 0 ? 'opacity-100' : 'opacity-0'"
            >
              <div>
                <h1 class="text-xs font-bold text-left text-red-600">
                  {{ ticket.ticketType }}
                  <sup v-if="ticket.units > 1">{{ ticket.units }}</sup>
                </h1>
              </div>
              <div class="flex items-center h-full -mt-4 space-x-4">
                <vue-qr
                  :text="ticket.ticketId"
                  :qid="ticket.ticketId"
                  :size="30"
                  :margin="0"
                  class="absolute"
                ></vue-qr>
                <p
                  class="w-full text-center whitespace-no-wrap text-xxs sm:text-base lg:text-lg ticket"
                >
                  {{ ticket.ticketId | ticketIdSplit }}
                </p>
              </div>
              <div
                class="absolute bottom-0 flex flex-row justify-between m-auto mb-2 space-x-2"
                style="width: 91%"
              >
                <div
                  class="flex flex-row items-center justify-between w-9/12 space-x-4"
                >
                  <div class="truncate">
                    <p
                      class="font-light truncate text-xxs sm:text-sm whitespace-nowrap ticket"
                    >
                      {{ ticket.buyerName }}
                    </p>
                  </div>
                  <div>
                    <p class="ticket text-xxs md:pt-1">
                      {{ eventDate | ticketDate }}
                    </p>
                  </div>
                </div>
                <div class="w-8 -mt-1">
                  <img
                    :src="eventImage"
                    alt=""
                    class="float-right w-8 h-8 border border-gray-400 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="!downloading"
        class="flex flex-col w-full p-4 pt-16 mx-auto -mt-8 bg-white rounded-md shadow-lg sm:w-9/12 md:w-6/12 lg:w-5/12 xl:w-4/12 font-quicksand"
      >
        <div class="w-full">
          <BaseCheckIcon class="m-auto text-success"></BaseCheckIcon>
        </div>
        <h2 class="pt-3 text-lg font-medium text-center">Payment Successful</h2>
        <p class="pt-2 text-sm font-medium text-center text-error">
          Screenshot/download this card or write down the ticket number as it is
          your pass to the event
        </p>
        <div class="flex flex-col items-center mt-10 w-12/12">
          <div class="flex flex-row justify-between w-5/12">
            <BaseButton
              :disabled="0 === activeTicket"
              class="pt-1 opacity-50 focus:outline-none"
              @click="activeTicket--"
            >
              <BaseChevronDownIcon
                class="transform rotate-90"
              ></BaseChevronDownIcon>
            </BaseButton>
            <div
              class="flex flex-row justify-between w-5/12 pt-1 pl-2 text-sm font-bold text-gray-700"
            >
              <p class="text-primary">{{ activeTicket + 1 }}</p>
              <p>of</p>
              <p>{{ tickets.length }}</p>
            </div>
            <BaseButton
              class="pt-1 pl-2 focus:outline-none"
              :disabled="tickets.length - 1 === activeTicket"
              @click="activeTicket++"
            >
              <BaseChevronDownIcon
                class="transform -rotate-90"
              ></BaseChevronDownIcon>
            </BaseButton>
          </div>
          <div class="flex justify-around w-full mt-4">
            <BaseButton
              class="text-sm font-medium text-accent-variant focus:outline-none"
              @click="downloadTickets"
            >
              Download tickets
            </BaseButton>
            <BaseButton
              class="text-sm font-medium text-error-variant focus:outline-none"
              @click="$emit('close')"
            >
              Close
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueQr from 'vue-qr'
export default {
  name: 'BaseEventTicket',
  components: { VueQr },
  props: {
    tickets: {
      type: Array,
      default: () => [],
    },
    eventImage: {
      type: String,
      default: '',
    },
    eventDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cardHeight: 0,
      activeTicket: 0,
      downloading: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.setCardHeight()
    }, 1000)

    // document.addEventListener('readystatechange', this.setCardHeight)
    window.addEventListener('resize', this.setCardHeight)
  },
  methods: {
    setCardHeight() {
      // console.log('me')
      if (document.readyState === 'complete') {
        this.cardHeight = this.$refs.card[
          this.tickets.length * 2 - 1
        ].clientHeight
      }
    },
    downloadTickets() {
      this.downloading = true
      setTimeout(() => {
        this.$html2pdf(this.$refs.tickets, {
          margin: 1,
          filename: 'document.pdf',
          image: { type: 'png' },
          html2canvas: {
            dpi: 400,
            letterRendering: true,
            scale: 3,
            useCORS: true,
          },
          jsPDF: {
            unit: 'px',
            format: 'letter',
            orientation: 'landscape',
            hotfixes: ['px_scaling'],
          },
        }).then(() => (this.downloading = false))
      }, 2000)
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ticket {
  font-family: monospace;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3),
    -1px -1px 2px rgba(98, 98, 98, 0.5);
  @apply text-gray-300 font-extralight;
}
.beat {
  animation: heartbeat 1s infinite alternate;
  -webkit-animation: heartbeat 1s infinite alternate;
  -moz-animation: heartbeat 1s infinite alternate;
  -ms-animation: heartbeat 1s infinite alternate;
  -o-animation: heartbeat 1s infinite alternate;
}
@keyframes heartbeat {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.4);
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}
.slide-in-enter {
  opacity: 0;
  transform: translateY(-50px);
}
.slide-in-enter-active,
.slide-in-leave-active {
  transition: all 0.8s ease;
}

.slide-in-leave-to {
  opacity: 1;
  transform: translateY(-290px);
}
</style>
