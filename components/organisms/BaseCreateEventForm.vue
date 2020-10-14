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
      class="absolute top-0 z-0 opacity-0"
    ></BaseEventCreateFinish>
  </div>
</template>

<script>
export default {
  name: 'BaseCreateEventForm',
  data() {
    return {
      currentForm: 0,
      finalData: {},
    }
  },
  mounted() {
    setTimeout(() => {
      this.currentForm = 1
    }, 1500)
  },
  methods: {
    setCurrentForm(val, data, formName) {
      if (
        val > this.currentForm &&
        data !== undefined &&
        formName !== undefined
      ) {
        this.finalData[formName] = data
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
