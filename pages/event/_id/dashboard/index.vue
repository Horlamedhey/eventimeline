<template>
  <div class="flex flex-col space-y-6">
    <div
      class="flex flex-wrap space-y-6 lg:space-x-6 lg:space-y-0 lg:flex-nowrap"
    >
      <div class="w-full p-5 shadow-outline lg:w-8/12 dashboard-card">
        <div class="p-2 rounded-lg bg-dashboard-accent">
          <h1 class="text-3xl chart-text">
            {{ event.createdAt | eventLiveDuration }} Days
          </h1>
          <h3 class="chart-text">Avg. Tickets Sold Per 7 days.</h3>
        </div>
        <div class="p-2 mt-5">
          <BaseLineChart
            :tickets-count="ticketsCount"
            :chart-data="lastSevenDaysSales"
          ></BaseLineChart>
        </div>
      </div>
      <div class="w-full p-5 shadow-outline lg:w-4/12 dashboard-card">
        <h4>Total amount sold</h4>
        <div
          class="py-1 mt-3 text-3xl font-medium text-center rounded-lg bg-primary-variant-light text-primary-variant"
        >
          {{ amountSold | currencyFormatter }}
        </div>
        <h4 class="mt-6">Available for withdrawal</h4>
        <div
          class="py-1 mt-3 text-3xl font-medium text-center rounded-lg bg-accent-variant-light text-accent-variant"
        >
          {{ amountSold | currencyFormatter }}
        </div>
        <div class="relative flex items-center justify-center p-2 mt-10">
          <BaseRadialChart
            :chart-data="[
              Math.round(
                ((ticketsCount - tickets.length) * 100) / ticketsCount
              ).toFixed(0),
              Math.round((tickets.length * 100) / ticketsCount).toFixed(0),
            ]"
            style="z-index: 1"
          ></BaseRadialChart>
          <h3 class="absolute z-0 text-center text-primary-variant">
            <span class="font-medium text-8xl"
              >{{
                Math.round((tickets.length * 100) / ticketsCount).toFixed(0)
              }}%</span
            >
            <br />
            <span class="text-4xl font-semibold">sold</span>
          </h3>
        </div>
      </div>
    </div>
    <!-- Big screen -->
    <BaseTable
      title="Ticket details"
      :table-heads="tableHeads"
      :table-body="tickets"
      no-data-text="No tickets sold yet"
      class="hidden mt-16 lg:block"
    ></BaseTable>
    <!-- Small screen -->
    <BaseBasicCards
      title="Ticket details"
      :card-titles="tableHeads"
      :card-contents="tickets"
      no-data-text="No tickets sold yet"
      class="lg:hidden"
    ></BaseBasicCards>
  </div>
</template>

<script>
import moment from 'moment'
import ticketTableMixin from '~/mixins/ticketTableMixin'
export default {
  name: 'Statistics',
  mixins: [ticketTableMixin],
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    tickets() {
      return (this.event.soldTickets || []).map((v) => {
        const { units, ticketType: type, buyerName: name, ticketId, seller } = v
        return {
          name,
          ticketId,
          agent: this.getSellerName(seller),
          type,
          amount: `${
            this.event.tickets.find(
              (u) => u.ticketType.toLowerCase() === type.toLowerCase()
            ).ticketPrice
          } x ${units}`,
        }
      })
    },
    ticketsCount() {
      return this.event.tickets.reduce((prevVal, currVal) => {
        return prevVal + currVal.maxAvailable
      }, 0)
    },
    amountSold() {
      if (this.event.soldTickets) {
        return this.event.soldTickets.reduce((prevVal, currVal) => {
          return (
            prevVal +
            currVal.units *
              this.event.tickets.find(
                (u) =>
                  u.ticketType.toLowerCase() ===
                  currVal.ticketType.toLowerCase()
              ).ticketPrice
          )
        }, 0)
      }
      return 0
    },
    lastSevenDaysSales() {
      const daysAgo = [0, 0, 0, 0, 0, 0, 0]
      if (this.event.soldTickets) {
        for (let i = 0; i <= 6; i++) {
          daysAgo.splice(
            i,
            1,
            this.event.soldTickets.filter((v) =>
              moment(moment().subtract(i, 'days')).isSame(v.bookedOn, 'day')
            ).length
          )
        }
      }
      return daysAgo.reverse()
    },
  },
}
</script>

<style lang="scss">
.chart-text {
  @apply font-medium text-center text-dashboard-accent-variant;
}
</style>
