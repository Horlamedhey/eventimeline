<template>
  <div class="relative min-h-full">
    <BaseCreateAgent
      :create-agent="createAgent"
      :close-create-agent="() => (createAgent = false)"
      :agents="event.agents"
      @updatedAgents="updatedAgents"
    ></BaseCreateAgent>
    <BaseActOnAgent
      :act-on-agent="actOnAgent"
      :loading="loading"
      @close="() => (actOnAgent = false)"
      @copyLink="copyLink"
      @deleteAgent="deleteAgent"
    ></BaseActOnAgent>
    <BaseButton
      class="block px-6 py-2 ml-auto text-xl font-medium text-center rounded-lg ripple-bg-dashboard-accent text-dashboard-accent-variant"
      @click="createAgent = true"
    >
      Create Agent
    </BaseButton>

    <BaseTable
      title="Agents details"
      :table-heads="tableHeads"
      :table-body="tableBody"
      :no-data="noAgents"
      no-data-text="No agents available"
      row-has-action
      action-text="Take Action"
      action-class="text-primary-variant ripple-bg-primary-variant-light"
      class="mt-10"
      @takeAction="takeAction"
    ></BaseTable>
  </div>
</template>

<script>
import updateAgentMutation from '@/graphs/update/updateAgentMutation'
export default {
  name: 'Agents',
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      createAgent: false,
      actOnAgent: false,
      noAgents: false,
      activeTableItem: null,
      tableHeads: ['Agent name', 'Unique ID', 'Sold', 'Qty.', ''],
      tableBody: [],
    }
  },
  mounted() {
    this.tableBody = this.formatAgents(this.event.agents)
  },
  methods: {
    dome() {
      console.log(this.$realmApp.currentUser)
    },
    takeAction(index) {
      this.activeTableItem = index
      this.actOnAgent = true
    },
    copyLink() {
      const copyText = document.createElement('input')
      new Promise((resolve) => {
        copyText.value = `${window.location.origin}/event/${
          this.event._id
        }?agent=${this.tableBody[this.activeTableItem].agentId}`
        copyText.style.top = '0'
        copyText.style.left = '0'
        copyText.style.position = 'fixed'
        copyText.style.opacity = '0'

        document.body.appendChild(copyText)
        copyText.focus()
        copyText.select()
        copyText.setSelectionRange(0, 99999) /* For mobile devices */

        /* Copy the text inside the text field */
        document.execCommand('copy')
        resolve()
      }).then(() => {
        this.actOnAgent = false
        this.activeTableItem = null
        document.body.removeChild(copyText)
      })
    },
    updatedAgents(agents) {
      this.createAgent = false
      this.$emit('agents', agents)
      this.tableBody = this.formatAgents(agents)
    },
    formatAgents(agents) {
      return (agents || []).map((v) => {
        const {
          agentId,
          agentInfo: { name },
        } = v
        return { name, agentId, sold: '$0', quantity: '0' }
      })
    },
    async deleteAgent() {
      this.loading = true
      // this.tableBody
      try {
        const myAgents = [...this.event.agents]
        myAgents.splice(this.activeTableItem, 1)
        const {
          data: {
            updateOneEvent: { agents },
          },
        } = await this.$apolloClient.mutate({
          mutation: updateAgentMutation,
          variables: {
            agents: myAgents.map((v) => ({
              email: v.email,
              agentId: v.agentId,
            })),

            eventId: this.$route.params.id,
            updatedAt: new Date(),
          },
        })
        this.tableBody.splice(this.activeTableItem, 1)
        this.$emit('agents', agents)
        this.loading = false
        this.actOnAgent = false
        this.activeTableItem = null
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
