<template>
  <div
    :class="[classList, { 'flex space-x-1': incremental || added }]"
    class="relative items-center rounded"
  >
    <BaseLoading
      v-if="loading"
      class="absolute top-0 bottom-0 left-0 mt-1 ml-2"
    ></BaseLoading>
    <div :class="{ 'w-10/12 sm:w-11/12': incremental || added }">
      <div
        v-if="type === 'search'"
        class="absolute top-0 bottom-0 flex items-center w-8 h-8 m-auto ml-3 group"
      >
        <BaseSearchIcon class="w-5 h-5"></BaseSearchIcon>
      </div>
      <div
        v-if="prefix && !/[A-Za-z]/.test(value) && value.length > 0"
        class="absolute top-0 bottom-0 flex items-center w-8 h-8 m-auto ml-3 group"
      >
        {{ prefix }}
      </div>
      <client-only v-if="name === 'eventdate'">
        <VueTailWindPicker
          :init="false"
          format-date="YYYY/MM/DD"
          :theme="{
            background: '#1A202C',
            text: 'text-white',
            border: 'border-gray-700',
            currentColor: 'text-gray-200',
            navigation: {
              background: 'bg-gray-800',
              hover: 'hover:bg-gray-700',
              focus: 'bg-gray-700',
            },
            picker: {
              rounded: 'rounded-md',
              selected: {
                background: 'bg-accent3',
                border: 'border-accent4',
                hover: 'hover:border-accent4',
              },
              holiday: 'text-red-400',
              weekend: 'text-green-400',
              event: 'bg-blue-500',
            },
            event: {
              border: 'border-gray-700',
            },
          }"
          @change="(value) => $emit('input', value)"
        >
          <input
            :id="fieldId || name"
            :value="value"
            :name="name"
            readonly
            class="w-full leading-none bg-transparent outline-none"
            :class="[inputClassList]"
            @focus="$emit('focus', $event)"
            @blur="$emit('blur', $event)"
            @keypress="$emit('keypress', $event)"
            @paste="$emit('paste', $event)"
          />
        </VueTailWindPicker>
      </client-only>
      <input
        v-else
        :id="fieldId || name"
        :type="inputType"
        :value="value"
        :disabled="disabled"
        :name="name"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :pattern="pattern"
        :inputmode="inputmode"
        class="w-full leading-none bg-transparent outline-none"
        :class="[
          inputClassList,
          {
            'pl-12': inputType === 'search',
            'pl-10': loading,
            'pl-6':
              prefix !== null && !/[A-Za-z]/.test(value) && value.length > 0,
          },
        ]"
        @input="$emit('input', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keypress="$emit('keypress', $event)"
        @paste="$emit('paste', $event)"
      />
      <div
        v-if="appendInner !== null || type === 'password'"
        class="absolute top-0 bottom-0 right-0 flex items-center w-8 h-8 m-auto"
        :class="[addOnClassList]"
        @click="handleIconClick"
      >
        <template v-if="type === 'password'">
          <BaseInvisibleIcon v-if="!isVisible"></BaseInvisibleIcon>
          <BaseVisibleIcon v-else></BaseVisibleIcon>
        </template>

        <BaseButton
          v-if="appendInner !== null"
          type="button"
          @click="$emit('appendInnerAction')"
        >
          <component
            :is="appendInner"
            class="cursor-pointer text-black-400"
          ></component>
        </BaseButton>
      </div>
    </div>

    <div v-if="incremental" class="w-auto text-center">
      <BaseButton
        type="button"
        style="padding-top: 2px"
        class="px-4 bg-transparent ripple-bg-success-variant1 group"
        @click="$emit('increment')"
      >
        <BaseAddCircleIcon
          class="w-4 h-4 m-auto text-success-variant1"
        ></BaseAddCircleIcon>
        <span
          class="text-sm font-medium transition-colors duration-500 text-black-800 group-hover:text-white"
        >
          ADD
        </span>
      </BaseButton>
    </div>
    <div v-if="added" class="w-auto text-center">
      <BaseButton
        type="button"
        class="px-4 py-3 bg-transparent ripple-bg-error-light group"
        @click="$emit('decrement')"
      >
        <BaseRemoveIcon
          class="w-4 h-4 m-auto transition-colors duration-500 text-error group-hover:text-white"
        ></BaseRemoveIcon>
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  components: {
    VueTailWindPicker: () => import('vue-tailwind-picker'),
  },
  props: {
    /** Type of the text input. Options ['text', 'email', 'url', 'tel', 'search', 'password'] */
    type: {
      type: String,
      required: true,
      default: 'text',
    },
    /** Disables the input by adding "disabled" attribute */
    disabled: {
      type: Boolean,
      default: false,
    },
    incremental: {
      type: Boolean,
      default: false,
    },
    added: {
      type: Boolean,
      default: false,
    },
    /** Autocomplete attribute used for browser autocomplete */
    autocomplete: {
      type: String,
      default: 'on',
    },
    /** Value of the input */
    value: {
      type: String,
      default: '',
    },
    /** Placeholder text for the input */
    placeholder: {
      type: String,
      default: '',
    },
    classList: [Array, String],
    inputClassList: [Array, String],
    addOnClassList: [Array, String],
    /** Id attribute for the input */
    fieldId: String,
    /** name attribute for the input */
    name: String,
    /** pattern attribute for input (used for mobile keypad) */
    pattern: String,
    prefix: { type: String, default: null },
    loading: Boolean,
    /** inputmode attribute for input (used for mobile keypad) */
    inputmode: String,
    appendInner: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      inputType: this.type,
      isVisible: false,
    }
  },
  watch: {
    value(newVal) {
      if (this.name === 'accountname') {
        this.$emit('input', newVal)
      }
    },
  },
  methods: {
    handleIconClick() {
      this.isVisible = !this.isVisible
      this.inputType = this.isVisible ? 'text' : 'password'
    },
  },
}
</script>
