<template>
  <div class="relative rounded " :class="[classList]">
    <div
      v-if="type === 'search'"
      class="absolute top-0 bottom-0 w-8 h-8 m-auto left-3 group"
    >
      <BaseSearchIcon class="w-7 h-7"></BaseSearchIcon>
    </div>
    <input
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
          'pr-16': inputType === 'password',
          'pl-16': inputType === 'search',
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
      class="absolute top-0 bottom-0 w-8 h-8 m-auto right-1"
      @click="handleIconClick"
    >
      <svg
        v-if="!isVisible"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="red"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-eye"
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
        stroke="red"
        stroke-width="1"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-eye-off"
      >
        <path
          d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        ></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    /** Type of the text input. Options ['text', 'email', 'url', 'tel', 'search', 'password'] */
    type: {
      type: String,
      required: true,
      validator(value) {
        return ["text", "email", "url", "tel", "search", "password"];
      },
      default: "text",
    },
    /** Disables the input by adding "disabled" attribute */
    disabled: {
      type: Boolean,
      default: false,
    },
    /** Autocomplete attribute used for browser autocomplete */
    autocomplete: {
      type: String,
      default: "on",
    },
    /** Value of the input */
    value: {
      type: String,
      default: "",
    },
    /** Placeholder text for the input */
    placeholder: {
      type: String,
      default: "",
    },
    classList: [Array, String],
    inputClassList: [Array, String],
    /** Id attribute for the input */
    id: String,
    /** name attribute for the input */
    name: String,
    /** pattern attribute for input (used for mobile keypad) */
    pattern: String,
    /** inputmode attribute for input (used for mobile keypad) */
    inputmode: String,
  },
  data() {
    return {
      inputType: this.type,
      isVisible: false,
    };
  },
  methods: {
    handleIconClick() {
      this.isVisible = !this.isVisible;
      this.inputType = this.isVisible ? "text" : "password";
    },
  },
};
</script>

<style lang="scss"></style>
