export default {
  data() {
    return {
      noTickets: false,
      tableHeads: ['Name', 'Ticket ID', 'Agent', 'Type', 'Amount'],
    }
  },

  methods: {
    getSellerName(sellerId) {
      if (sellerId === this.event.organiser.email) return 'Organiser'

      return this.event.agents.find((v) => v.agentId === sellerId).agentInfo
        .name
    },
  },
}
