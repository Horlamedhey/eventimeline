<template>
  <div class="relative min-h-260 sm:min-h-220">
    <BaseEventDetails
      :position="1"
      :current-form="currentForm"
      :set-current-form="setCurrentForm"
      class="absolute top-0 z-0 opacity-0"
    ></BaseEventDetails>
    <BaseEventOrganiserDetails
      :position="2"
      :current-form="currentForm"
      :set-current-form="setCurrentForm"
      class="absolute top-0 z-0 opacity-0"
    ></BaseEventOrganiserDetails>
    <BaseEventPaymentDetails
      :position="3"
      :current-form="currentForm"
      :set-current-form="setCurrentForm"
      :banks="banks"
      class="absolute top-0 z-0 opacity-0"
    ></BaseEventPaymentDetails>
    <BaseEventThirdPartyArtisans
      :position="4"
      :current-form="currentForm"
      :set-current-form="setCurrentForm"
      class="absolute top-0 z-0 opacity-0"
    ></BaseEventThirdPartyArtisans>
    <BaseEventCreateFinish
      :position="5"
      :current-form="currentForm"
      :set-current-form="setCurrentForm"
      :loading="loading"
      :new-event-id="newEventId"
      class="absolute top-0 z-0 opacity-0"
    ></BaseEventCreateFinish>
  </div>
</template>

<script>
// import * as Realm from 'realm-web'
import createEventMixin from '@/mixins/createEventMixin'
export default {
  name: 'BaseCreateEventForm',
  mixins: [createEventMixin],
  props: {
    banks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      newEventId: null,
      currentForm: 0,
      authUser: {},
      finalData: {},
    }
  },
  watch: {
    currentForm(curr, prev) {
      if (curr === 5) {
        this.loading = true
        this.recordEvent()
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.currentForm = 1
    }, 1500)
  },
  methods: {
    setCurrentForm(val, data, formName, addition) {
      if (
        val > this.currentForm &&
        data !== undefined &&
        formName !== undefined
      ) {
        this.finalData[formName] = data
      }
      if (val === 3) {
        this.authUser = addition
      }
      this.currentForm = val
    },
  },
}
</script>

<style lang="scss">
.next-button-content {
  @apply duration-500;
}
.form-container {
  max-height: 85vh;
  overflow-y: auto;
}
</style>
