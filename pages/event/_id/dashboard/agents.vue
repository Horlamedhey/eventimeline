<template>
  <div class="relative min-h-full">
    <BaseCreateAgent
      :create-agent="createAgent"
      :close-create-agent="() => (createAgent = false)"
    ></BaseCreateAgent>
    <BaseActOnAgent
      :act-on-agent="actOnAgent"
      :close-act-on-agent="() => (actOnAgent = false)"
      :copy-link="copyLink"
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
      class="mt-10"
      :take-action="takeAction"
    ></BaseTable>
  </div>
</template>

<script>
export default {
  name: 'Agents',
  layout: 'dashboard',
  data() {
    return {
      createAgent: false,
      actOnAgent: false,
      noAgents: false,
      activeTableItem: null,
      tableHeads: ['Agent name', 'Unique ID', 'Sold', 'Qty.', ''],
      tableBody: [
        {
          name: 'Item 7',
          uniqueId: 'eventID-s7hnhe7h4',
          sold: '$6000',
          quantity: '14',
        },
        {
          name: 'Kokobar',
          uniqueId: 'eventID-74dj7nhr7',
          sold: '$4500',
          quantity: '12',
        },
      ],
    }
  },
  methods: {
    takeAction(index) {
      this.activeTableItem = index
      this.actOnAgent = true
    },
    copyLink() {
      const copyText = document.createElement('input')
      new Promise((resolve) => {
        copyText.value = this.tableBody[this.activeTableItem].uniqueId
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
  },
}
</script>
