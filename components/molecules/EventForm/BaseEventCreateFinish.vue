<template>
  <div ref="formContainer" class="w-full">
    <h3
      ref="header"
      class="font-medium text-1xl sm:text-2-5xl text-black-variant-400"
    >
      Finished
    </h3>
    <div ref="form" class="mt-10 shadow-md">
      <div
        class="px-6 py-32 text-center rounded shadow-outline sm:px-16"
        :style="
          loading
            ? {}
            : {
                backgroundImage: `url(/confetti.gif)`,
              }
        "
      >
        <div v-if="loading">Event loading...</div>
        <template v-else>
          <div class="text-xl font-semibold">
            <h2>Congrats!</h2>
            <h2 class="mt-8">You just finished creating your event!</h2>
          </div>
          <div class="mt-24 text-lg font-medium">
            <p>
              We have sent a unique url link to your mail.That is your super
              power key to manage this event and everything in-between,
              including payments and withdrawals.
            </p>
            <p class="mt-5">
              Do make sure to keep it safe and not share with anyone.
            </p>
          </div>
          <!--  -->
        </template>
      </div>
    </div>
    <div v-if="!loading" ref="actionBtn">
      <div class="flex items-center justify-center mt-20">
        <BaseButton
          :to="`/event/${newEventId}`"
          type="button"
          class="flex items-center justify-center w-56 py-3 ml-8 font-medium bg-transparent border border-black rounded-full ripple-bg-black-100 group"
        >
          <span
            class="next-button-content group-hover:transition group-hover:text-white"
          >
            Go To Event
          </span>
          <BaseArrowRightIcon
            class="ml-2 next-button-content group-hover:transition group-hover:text-white"
          ></BaseArrowRightIcon>
        </BaseButton>
      </div>
      <BaseButton
        to="/"
        type="button"
        class="flex items-center justify-center py-3 m-auto mt-4 font-medium bg-transparent border rounded-full w-76 border-primary-lighter ripple-bg-primary-lighter group"
      >
        <span
          class="next-button-content group-hover:transition group-hover:text-white"
        >
          Explore
        </span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import formsAnimationMixin from '~/mixins/formsAnimationMixin'
export default {
  name: 'BaseEventCreateFinish',
  mixins: [formsAnimationMixin],
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    newEventId: {
      type: String,
      default: '',
    },
  },
}
</script>
