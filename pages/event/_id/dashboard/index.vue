<template>
  <div>
    <div class="flex space-x-6">
      <div class="w-8/12 p-5 shadow-outline dashboard-card">
        <div class="p-2 rounded-lg bg-dashboard-accent">
          <h1 class="text-3xl chart-text">
            {{ event.eventDate | eventLiveDuration }} Days
          </h1>
          <h3 class="chart-text">Avg. Tickets Sold Per 7 days.</h3>
        </div>
        <div class="p-2 mt-5">
          <BaseLineChart :tickets-count="ticketsCount"></BaseLineChart>
        </div>
      </div>
      <div class="w-4/12 p-5 shadow-outline dashboard-card">
        <h4>Total amount sold</h4>
        <div
          class="py-1 mt-3 text-3xl font-medium text-center rounded-lg bg-primary-variant-light text-primary-variant"
        >
          ${{ amountSold }}
        </div>
        <h4 class="mt-6">Available for withdrawal</h4>
        <div
          class="py-1 mt-3 text-3xl font-medium text-center rounded-lg bg-accent-variant-light text-accent-variant"
        >
          ${{ amountSold }}
        </div>
        <div class="p-2 mt-10">
          chart

          <!-- <BaseRadialChart></BaseRadialChart> -->
        </div>
      </div>
    </div>
    <BaseTable
      title="Ticket details"
      :table-heads="tableHeads"
      :table-body="tableBody"
      :no-data="noTickets"
      no-data-text="No tickets sold yet"
      class="mt-16"
    ></BaseTable>
  </div>
</template>

<script>
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
    ticketsCount() {
      return this.event.tickets.reduce((prevVal, currVal) => {
        return prevVal + currVal.maxAvailable
      }, 0)
    },
    amountSold() {
      return this.event.tickets.reduce((prevVal, currVal) => {
        return prevVal + currVal.quantitySold * currVal.ticketPrice
      }, 0)
    },
  },
}
</script>

<style lang="scss">
.chart-text {
  @apply font-medium text-center text-dashboard-accent-variant;
}
</style>
