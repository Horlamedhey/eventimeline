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
            :id="id"
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
        :id="id"
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
        v-if="type === 'password'"
        class="absolute top-0 bottom-0 right-0 flex items-center w-8 h-8 m-auto"
        :class="[addOnClassList]"
        @click="handleIconClick"
      >
        <svg
          v-if="!isVisible"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentcolor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentcolor"
          stroke-width="1"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
          ></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      </div>
    </div>

    <div v-if="incremental" class="w-auto text-center">
      <BaseButton
        type="button"
        style="padding-top: 2px;"
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
        class="px-4 py-3 bg-transparent ripple-bg-error group"
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
      validator(value) {
        return ['text', 'email', 'url', 'tel', 'search', 'password']
      },
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
    id: String,
    /** name attribute for the input */
    name: String,
    /** pattern attribute for input (used for mobile keypad) */
    pattern: String,
    prefix: { type: String, default: null },
    loading: Boolean,
    /** inputmode attribute for input (used for mobile keypad) */
    inputmode: String,
  },
  data() {
    return {
      inputType: this.type,
      isVisible: false,
    }
  },
  methods: {
    handleIconClick() {
      this.isVisible = !this.isVisible
      this.inputType = this.isVisible ? 'text' : 'password'
    },
  },
}
</script>
