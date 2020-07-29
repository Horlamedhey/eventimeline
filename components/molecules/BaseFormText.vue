<template>
  <div :class="[]">
    <div>
      <BaseLabel
        v-if="label"
        :html-for="`#${id}`"
        :error="error"
        :class-list="labelClassList"
      >
        <template v-if="required">* </template>{{ label }}
      </BaseLabel>
    </div>

    <div>
      <BaseInput
        :id="id"
        :error="error"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :value="value"
        :name="name"
        :inputmode="inputmode"
        :pattern="pattern"
        :class-list="inputClassList"
        @input="(value) => $emit('input', value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keypress="$emit('keypress', $event)"
      />
    </div>

    <div>
      <BaseValidationMessages :error="error" :error-messages="errorMessages" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormText',
  props: {
    /** Label text for the field */
    label: String,
    /** Label text for the field */
    inputClassList: Object,
    labelClassList: Object,
    /** Type of the text input. Options ['text', 'email', 'url', 'tel', 'search', 'password'] */
    type: {
      type: String,
      default: 'text',
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
    /** The error message shown if the input validation is failed */
    errorMessages: {
      type: [String, Array],
    },
    /** Name attribute for input */
    name: String,
    /** Whether input value is invalid */
    error: {
      type: Boolean,
      default: false,
    },
    /** Pattern attribute for input (used for mobile keypad) */
    pattern: {
      type: String,
      default: null,
    },
    /** inputmode attribute for input (used for mobile keypad) */
    inputmode: {
      type: String,
      default: null,
    },
    /** Whether the field is required */
    required: {
      type: Boolean,
      default: false,
    },
    /** Autocomplete attribute used for browser autocomplete */
    autocomplete: String,
    /** Disabled attribute for the input */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    id() {
      return '_' + Math.random().toString(36).substr(2, 9)
    },
  },
}
</script>
