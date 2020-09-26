<template>
  <div>
    <client-only>
      <BaseInput
        field-id="checkin-search-input"
        name="checkin-search"
        type="search"
        placeholder="Search ticket ID, attendee’s name, e.t.c..."
        class-list="bg-white w-full rounded-full shadow-outline max-w-2xl"
        input-class-list="text-sm font-inter placeholder-gray-500 py-3"
      ></BaseInput>
    </client-only>

    <BaseTable
      title="Ticket details"
      :table-heads="tableHeads.concat([''])"
      :table-body="tableBody"
      :no-data="noTickets"
      no-data-text="No check-ins yet"
      row-has-action
      :icon="icon"
      action-class="text-dashboard-accent-variant"
      class="mt-10"
    ></BaseTable>
  </div>
</template>

<script>
import ticketTableMixin from '~/mixins/ticketTableMixin'
export default {
  name: 'CheckIn',
  layout: 'dashboard',
  mixins: [ticketTableMixin],
  data() {
    return {
      icon: () => import('~/components/atoms/icons/BaseCheckIcon'),
    }
  },
}
</script>
