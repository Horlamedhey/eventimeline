<template>
  <div>
    <div>
      <BaseLabel
        v-if="label"
        :html-for="`#${id}`"
        :error="error"
        :class-list="labelClassList"
        class="mb-2 text-base font-medium font-quicksand"
      >
        <template v-if="required">* </template>{{ label }}
      </BaseLabel>
    </div>

    <div>
      <textarea
        :id="id"
        rows="3"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :value="value"
        :name="name"
        :class="inputClassList"
        class="outline-none"
        @input="$emit('input', $event.target.value)"
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
  name: 'BaseFormTextArea',
  props: {
    /** Label text for the field */
    label: String,
    /** Label text for the field */
    inputClassList: [String, Array],
    labelClassList: [String, Array],
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
