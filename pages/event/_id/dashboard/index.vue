<template>
  <div>
    <div class="flex space-x-6">
      <div class="w-8/12 p-5 shadow-outline dashboard-card">
        <div class="p-2 rounded-lg bg-dashboard-accent">
          <h1 class="text-3xl chart-text">23 Days</h1>
          <h3 class="chart-text">Avg. Tickets Sold Per 3 days.</h3>
        </div>
        <div class="p-2 mt-5">chart</div>
      </div>
      <div class="w-4/12 p-5 shadow-outline dashboard-card">
        <h4>Total amount sold</h4>
        <div
          class="py-1 mt-3 text-3xl font-medium text-center rounded-lg bg-primary-variant-light text-primary-variant"
        >
          $4000
        </div>
        <h4 class="mt-6">Available for withdrawal</h4>
        <div
          class="py-1 mt-3 text-3xl font-medium text-center rounded-lg bg-accent-variant-light text-accent-variant"
        >
          $3500
        </div>
        <div class="p-2 mt-10">chart</div>
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
  layout: 'dashboard',
  mixins: [ticketTableMixin],
}
</script>

<style lang="scss">
.chart-text {
  @apply font-medium text-center text-dashboard-accent-variant;
}
</style>
