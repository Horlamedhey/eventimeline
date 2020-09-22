<template>
  <div>
    <div class="flex space-x-6">
      <div class="w-8/12 p-5 bg-white rounded-lg shadow-outline">
        <div class="p-2 rounded-lg bg-dashboard-accent">
          <h1 class="text-3xl chart-text">23 Days</h1>
          <h3 class="chart-text">Avg. Tickets Sold Per 3 days.</h3>
        </div>
        <div class="p-2 mt-5">chart</div>
      </div>
      <div class="w-4/12 p-5 bg-white rounded-lg shadow-outline">
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
export default {
  name: 'Statistics',
  layout: 'dashboard',
  data() {
    return {
      noTickets: false,
      tableHeads: ['Name', 'Ticket ID', 'Agent', 'Type', 'Amount'],
      tableBody: [
        {
          name: 'AbdulGafar Olamide Ajao',
          ticketId: '7t5y8e5uhi47',
          agent: 'Item 7',
          type: 'VVIP',
          amount: '10000 x 2',
        },
        {
          name: 'Ozenua Tobi',
          ticketId: '7t5y857h8h47',
          agent: 'Item 7',
          type: 'Regular',
          amount: '2500 x 4',
        },
        {
          name: 'Geeky Adams',
          ticketId: '74y5gd7hn9ud',
          agent: 'Kokobar',
          type: 'VIP',
          amount: '5000 x 2',
        },
        {
          name: 'Mudia Imasuen',
          ticketId: 'nnd47b3983h4',
          agent: 'Item 7',
          type: 'Regular',
          amount: '2500 x 3',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.chart-text {
  @apply font-medium text-center text-dashboard-accent-variant;
}
</style>
