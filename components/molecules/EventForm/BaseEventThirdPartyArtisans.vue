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
              v-for="(thirdPartyRole, i) in thirdPartyRoles"
              :key="thirdPartyRole.role"
            >
              <BaseButton
                class="relative w-full py-2 font-medium text-white rounded"
                :class="[thirdPartyRole.color, thirdPartyRole.rippleColor]"
                @click="selectOption(i)"
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
          @click="setCurrentForm(position + 1, currValues, formName)"
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
        @click="removeAllAndProceed"
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
      formName: 'thirdPartyArtisans',
      currValues: [],
      prevValues: [],
      thirdPartyRoles: [
        {
          role: 'Photographers',
          color: 'bg-photographers',
          rippleColor: ' ripple-bg-photographers',
          selected: false,
        },
        {
          role: 'Catering Service',
          color: 'bg-catering-service',
          rippleColor: ' ripple-bg-catering-service',
          selected: false,
        },
        {
          role: 'DJs',
          color: 'bg-djs',
          rippleColor: ' ripple-bg-djs',
          selected: false,
        },
        {
          role: 'Bouncers',
          color: 'bg-bouncers',
          rippleColor: ' ripple-bg-bouncers',
          selected: false,
        },
        {
          role: 'MCs',
          color: 'bg-mcs',
          rippleColor: ' ripple-bg-mcs',
          selected: false,
        },
        {
          role: 'Rentals',
          color: 'bg-rentals',
          rippleColor: ' ripple-bg-rentals',
          selected: false,
        },
      ],
    }
  },
  methods: {
    selectOption(index) {
      this.thirdPartyRoles[index].selected = !this.thirdPartyRoles[index]
        .selected
      this.prevValues = [...this.currValues]
      this.currValues = this.thirdPartyRoles
        .filter((v) => v.selected)
        .map((v) => v.role)
    },
    removeAllAndProceed() {
      this.thirdPartyRoles.forEach((v) => (v.selected = false))
      this.setCurrentForm(this.position + 1, [], this.formName)
    },
  },
}
</script>
