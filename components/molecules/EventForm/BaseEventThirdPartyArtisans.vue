<template>
  <div ref="formContainer">
    <h3
      ref="header"
      class="font-medium text-1xl sm:text-2-5xl text-black-variant-400"
    >
      Last Step
    </h3>
    <div ref="form" class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline form-container">
        <div class="text-center">
          <h2 class="m-auto font-medium text-1xl sm:w-1/2">
            Do you need any of these for your event?
          </h2>
          <div class="grid gap-4 mt-12 text-lg sm:grid-cols-2 sm:grid-rows-3">
            <div
              v-for="thirdPartyRole in thirdPartyRoles"
              :key="thirdPartyRole.role"
            >
              <BaseButton
                class="relative w-full py-2 font-medium text-white rounded"
                :class="[
                  `bg-${thirdPartyRole.role.replace(' ', '-')}`,
                  ` ripple-bg-${thirdPartyRole.role.replace(' ', '-')}`,
                ]"
                @click="thirdPartyRole.selected = !thirdPartyRole.selected"
              >
                {{ thirdPartyRole.role }}
                <div
                  :class="[
                    thirdPartyRole.selected ? 'opacity-100' : 'opacity-0',
                  ]"
                  class="absolute top-0 right-0 w-3 h-3 mt-4 mr-4 transition duration-300 bg-white border border-black rounded-full"
                ></div>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="actionBtn">
      <div class="flex items-center justify-center mt-20">
        <BaseButton
          type="button"
          class="p-3 rounded-full shadow-xl ripple-bg-gray-100"
          @click="setCurrentForm(position - 1)"
        >
          <BaseChevronDownIcon
            class="transform rotate-90"
          ></BaseChevronDownIcon>
        </BaseButton>

        <BaseButton
          type="button"
          class="flex items-center justify-center w-56 py-3 ml-8 font-medium bg-transparent border border-black rounded-full ripple-bg-black-100 group"
          @click="setCurrentForm(position + 1)"
        >
          <span
            class="next-button-content group-hover:transition group-hover:text-white"
          >
            Yes, done picking
          </span>
          <BaseArrowRightIcon
            class="ml-2 next-button-content group-hover:transition group-hover:text-white"
          ></BaseArrowRightIcon>
        </BaseButton>
      </div>
      <BaseButton
        type="button"
        class="flex items-center justify-center py-3 m-auto mt-4 font-medium bg-transparent border rounded-full w-76 border-primary-lighter ripple-bg-primary-lighter group"
        @click="setCurrentForm(position + 1)"
      >
        <span
          class="next-button-content group-hover:transition group-hover:text-white"
        >
          No, I'm fine
        </span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import formsAnimationMixin from '~/mixins/formsAnimationMixin'
export default {
  name: 'BaseEventThirdPartyArtisans',
  mixins: [formsAnimationMixin],
  data() {
    return {
      thirdPartyRoles: [
        { role: 'Photographers', selected: false },
        { role: 'Catering Service', selected: false },
        { role: 'DJs', selected: false },
        { role: 'Bouncers', selected: false },
        { role: 'MCs', selected: false },
        { role: 'Rentals', selected: false },
      ],
    }
  },
}
</script>
