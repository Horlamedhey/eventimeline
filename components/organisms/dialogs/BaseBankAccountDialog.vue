<template>
  <div
    ref="sideBarOverlay"
    class="absolute top-0 bottom-0 left-0 right-0 flex justify-end bg-transparent opacity-0 -z-1"
  >
    <div
      ref="centerMenu"
      class="relative px-16 py-6 m-auto transform scale-0 bg-white rounded-lg shadow-lg opacity-0"
      @click.stop=""
    >
      <BaseButton
        class="absolute top-0 right-0 mt-2 mr-2 sm:rounded-full focus:outline-none"
        @click="$emit('close')"
      >
        <BaseCloseIcon class="text-primary-lighter"></BaseCloseIcon>
      </BaseButton>
      <p
        style="max-width: 80%; margin: auto; text-align: center"
        class="dialog-texts"
      >
        {{ textContent }}
      </p>
      <div
        class="flex flex-wrap justify-center mt-6 text-lg text-black-variant-600"
      >
        <div v-if="loading" class="text-center">
          Please wait while we fetch payment credentials...
        </div>
        <template v-else>
          <div
            v-for="(account, i) in accounts"
            :key="`account${i}`"
            class="w-1/2 px-2 py-4"
          >
            <BaseButton
              class="selection-button"
              :class="
                account.selected
                  ? 'selected-selection-button'
                  : ' unselected-selection-button '
              "
              @click="selectOption(i)"
            >
              <div class="flex flex-col space-y-2">
                <div class="flex space-x-2">
                  <BaseBankIcon></BaseBankIcon>
                  <h4 class="account-text">{{ account.bankName }}</h4>
                </div>
                <div class="flex space-x-2">
                  <BaseUserIcon></BaseUserIcon>
                  <h4 class="account-text">{{ account.accountName }}</h4>
                </div>
                <div class="flex space-x-2">
                  <BaseInfoOutlineIcon></BaseInfoOutlineIcon>
                  <h4 class="account-text">{{ account.accountNumber }}</h4>
                </div>
              </div>
              <div
                :class="[account.selected ? 'opacity-100' : 'opacity-0']"
                class="select-indicator"
              ></div>
            </BaseButton>
          </div>
        </template>
      </div>
      <BaseButton
        v-if="!loading"
        :disabled="accounts.find((v) => v.selected) === undefined"
        type="button"
        class="flex items-center justify-center w-56 py-3 m-auto mt-8 font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
        @click="continueWithChoice"
      >
        Continue
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseBankAccountDialog',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    bankAccountDialog: {
      type: Boolean,
      default: false,
    },
    bankAccounts: {
      type: Array,
      default: () => [],
    },
    textContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      accounts: [],
    }
  },
  watch: {
    bankAccounts(curr) {
      if (curr.length > 0) {
        this.accounts = [...this.bankAccounts]
      }
    },
    bankAccountDialog(curr) {
      if (curr) {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: 1,
          duration: 0.2,
        })
        timeline.to(this.$refs.sideBarOverlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
        })
        timeline.to(
          this.$refs.centerMenu,

          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power1.out',
          }
        )
      } else {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.centerMenu, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: 'power1.out',
        })
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: -1,
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        })
      }
    },
  },
  methods: {
    selectOption(index) {
      for (let i = 0; i < this.accounts.length; i++) {
        const account = this.accounts[i]
        if (i === index) {
          account.selected = true
        } else {
          account.selected = false
        }
      }
    },
    continueWithChoice() {
      this.$emit(
        'selectedData',
        this.accounts.find((v) => v.selected)
      )
    },
  },
}
</script>

<style lang="scss">
.selection-button {
  @apply relative w-full p-4 rounded;
}
.selected-selection-button {
  @apply bg-accent text-white font-bold;
}
.unselected-selection-button {
  @apply border border-dashed border-gray-700 font-medium;
}
.dialog-texts {
  @apply flex items-center font-medium;
}
.account-text {
  @apply text-left font-medium text-base;
}
.select-indicator {
  @apply absolute top-0 right-0 w-3 h-3 mt-2 mr-2 transition duration-300 bg-white border border-black rounded-full;
}
</style>
