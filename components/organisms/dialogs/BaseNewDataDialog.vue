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
        @click="closeNewDataDialog"
      >
        <BaseCloseIcon class="text-primary-lighter"></BaseCloseIcon>
      </BaseButton>
      <p
        style="max-width: 80%; margin: auto; text-align: center"
        class="dialog-texts"
      >
        Account already exists, but some information are different, please
        choose preferred details to continue.
      </p>
      <p class="text-xs font-bold text-center text-error">
        Note: If you do not make a choice, the existing details will be chosen
        automatically.
      </p>
      <div
        class="grid gap-4 mt-6 text-lg sm:grid-cols-2 text-black-variant-600"
      >
        <div class="flex items-center justify-between col-span-2 font-medium">
          <div class="dialog-texts">Existing details</div>
          or
          <div class="dialog-texts">New details</div>
        </div>

        <template v-if="newDataModel.oldName && newDataModel.newName">
          <div>
            <BaseButton
              class="selection-button"
              :class="
                newDataModel.oldName.selected
                  ? 'selected-selection-button'
                  : ' unselected-selection-button '
              "
              @click="selectOption('oldName', 'newName')"
            >
              {{ newDataModel.oldName.value }}
              <div
                :class="[
                  newDataModel.oldName.selected ? 'opacity-100' : 'opacity-0',
                ]"
                class="select-indicator"
              ></div>
            </BaseButton>
          </div>
          <div>
            <BaseButton
              class="selection-button"
              :class="
                newDataModel.newName.selected
                  ? 'selected-selection-button'
                  : ' unselected-selection-button '
              "
              @click="selectOption('newName', 'oldName')"
            >
              {{ newDataModel.newName.value }}
              <div
                :class="[
                  newDataModel.newName.selected ? 'opacity-100' : 'opacity-0',
                ]"
                class="select-indicator"
              ></div>
            </BaseButton>
          </div>
        </template>

        <template v-if="newDataModel.oldNumber && newDataModel.newNumber">
          <div>
            <BaseButton
              class="selection-button"
              :class="
                newDataModel.oldNumber.selected
                  ? 'selected-selection-button'
                  : ' unselected-selection-button '
              "
              @click="selectOption('oldNumber', 'newNumber')"
            >
              {{ newDataModel.oldNumber.value }}
              <div
                :class="[
                  newDataModel.oldNumber.selected ? 'opacity-100' : 'opacity-0',
                ]"
                class="select-indicator"
              ></div>
            </BaseButton>
          </div>
          <div>
            <BaseButton
              class="selection-button"
              :class="
                newDataModel.newNumber.selected
                  ? 'selected-selection-button'
                  : ' unselected-selection-button '
              "
              @click="selectOption('newNumber', 'oldNumber')"
            >
              {{ newDataModel.newNumber.value }}
              <div
                :class="[
                  newDataModel.newNumber.selected ? 'opacity-100' : 'opacity-0',
                ]"
                class="select-indicator"
              ></div>
            </BaseButton>
          </div>
        </template>
      </div>
      <BaseButton
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
  name: 'BaseNewDataDialog',
  props: {
    newDataDialog: {
      type: Boolean,
      default: false,
    },
    closeNewDataDialog: {
      type: Function,
      default: () => {},
    },
    dataModel: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      newDataModel: {},
    }
  },
  watch: {
    newDataDialog(curr) {
      if (curr) {
        this.newDataModel = { ...this.dataModel }
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
        setTimeout(() => {
          this.newDataModel = {}
        }, 0.8)
      }
    },
  },
  methods: {
    selectOption(selectedValue, deselectedValue) {
      this.newDataModel[selectedValue].selected = true
      this.newDataModel[deselectedValue].selected = false
    },
    continueWithChoice() {
      const finalChoice = {}
      if (this.newDataModel.newName !== undefined) {
        finalChoice.organiserName = this.newDataModel.newName.selected
          ? this.newDataModel.newName.value
          : this.newDataModel.oldName.value
      }
      if (this.newDataModel.newNumber !== undefined) {
        finalChoice.phone = this.newDataModel.newNumber.selected
          ? this.newDataModel.newNumber.value
          : this.newDataModel.oldNumber.value
      }
      this.$emit('selectedData', finalChoice)
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
.select-indicator {
  @apply absolute top-0 right-0 w-3 h-3 mt-2 mr-2 transition duration-300 bg-white border border-black rounded-full;
}
</style>
