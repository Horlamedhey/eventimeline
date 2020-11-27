<template>
  <div>
    <h1 class="dashboard-main-title">Event Details</h1>
    <div class="p-8 mt-5 shadow-outline dashboard-card">
      <div class="flex justify-between">
        <div class="w-1/2">
          <h2 class="dashboard-main-subtitle">EVENT TITLE</h2>
          <h3 class="font-medium text-1xl">Bar, Cocktail et Disco Party</h3>

          <h2 class="mt-10 dashboard-main-subtitle">DESCRIPTION</h2>
          <p class="text-lg">
            We're back at Q-Bar lounge Bar every Thursday from 7pm - 1am
            virtually during until we can get back into the bars and clubs! Take
            a drink, take a wine.
          </p>
        </div>
        <div>
          <BaseFormFileUpload
            no-description
            external-preview="http://res.cloudinary.com/befittinglife/image/upload/c_scale,h_164,q_auto,w_196/v1/events/party.jpg"
          ></BaseFormFileUpload>
        </div>
      </div>

      <div class="flex mt-10 space-x-20">
        <div>
          <h2 class="dashboard-main-subtitle">REGULAR PRICE</h2>
          <h3 class="font-medium text-1xl">$3000</h3>
        </div>
        <div>
          <h2 class="dashboard-main-subtitle">VIP PRICE</h2>
          <h3 class="font-medium text-1xl">$4000</h3>
        </div>
        <div>
          <h2 class="dashboard-main-subtitle">VVIP PRICE</h2>
          <h3 class="font-medium text-1xl">$5000</h3>
        </div>
      </div>

      <BaseButton
        class="px-6 py-2 mt-16 text-xl font-medium text-center rounded-lg ripple-bg-dashboard-accent text-dashboard-accent-variant"
        @click="createAgent = true"
      >
        Save Changes
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModifyEvent',
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }],
    }
  },
}
</script>
