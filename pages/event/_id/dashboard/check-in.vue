<template>
  <div>
    <div class="flex flex-wrap-reverse justify-end lg:flex-nowrap">
      <client-only>
        <BaseInput
          v-model="searchInput"
          field-id="checkin-search-input"
          name="checkin-search"
          type="search"
          placeholder="Search ticket ID or attendee’s name"
          class-list="bg-white w-full rounded-full shadow-outline max-w-2xl"
          input-class-list="text-sm font-inter placeholder-gray-500 py-3"
          class="mt-4 lg:mt-0"
        ></BaseInput>
      </client-only>
      <BaseButton
        class="relative block px-6 py-2 ml-auto text-xl font-medium text-center rounded-lg ripple-bg-dashboard-accent"
        @click="scanning = true"
      >
        <span class="text-dashboard-accent-variant"> Scan ticket</span>

        <BaseComingSoon />
      </BaseButton>
      <client-only>
        <qrcode-stream v-if="scanning" @decode="onDecode"></qrcode-stream>
      </client-only>
    </div>
    <!-- Big screen -->
    <BaseTable
      title="Ticket details"
      :table-heads="tableHeads.concat([''])"
      :table-body="tickets"
      no-data-text="No check-ins yet"
      row-has-action
      :action-fields="['checkedIn']"
      :icon="icon"
      action-active-class="text-dashboard-accent-variant"
      action-class="text-gray-400"
      class="hidden mt-10 lg:block"
      @takeAction="(ticketId) => $emit('takeAction', ticketId)"
    ></BaseTable>
    <!-- Small screen -->
    <BaseBasicCards
      title="Ticket details"
      :card-titles="tableHeads"
      :card-contents="tickets"
      action-active-class="bg-white text-dashboard-accent-variant"
      action-class="text-gray-400 bg-primary-variant-light"
      :action-fields="['checkedIn']"
      :action-texts="['Check in']"
      :icon="icon"
      no-data-text="No tickets sold yet"
      class="lg:hidden"
      @takeAction="(ticketId) => $emit('takeAction', ticketId)"
    ></BaseBasicCards>
  </div>
</template>

<script>
import ticketTableMixin from '~/mixins/ticketTableMixin'
export default {
  name: 'CheckIn',
  mixins: [ticketTableMixin],
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      icon: () => import('~/components/atoms/icons/BaseCheckIcon'),
      searchInput: '',
      scanning: false,
    }
  },
  computed: {
    tickets() {
      return this.event.soldTickets
        .map((v) => {
          const {
            units,
            ticketType: type,
            buyerName: name,
            ticketId,
            seller: agent,
            checkedIn,
          } = v
          return {
            name,
            ticketId,
            agent,
            type,
            amount: `${
              this.event.tickets.find(
                (u) => u.ticketType.toLowerCase() === type.toLowerCase()
              ).ticketPrice
            } x ${units}`,
            checkedIn,
          }
        })
        .filter(
          (v) =>
            v.name.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            v.ticketId.includes(this.searchInput)
        )
    },
  },
}
</script>
