<template>
  <div>
    <div>
      <BaseLabel
        v-if="label"
        :html-for="`#${id}`"
        :error="error"
        :class-list="[labelClassList, 'mb-2']"
        class="relative text-base font-medium font-quicksand"
        :style="
          incremental ? { paddingTop: '1px', marginBottom: '0.4rem' } : {}
        "
      >
        <template v-if="required">* </template>{{ label }}
        <BaseButton
          type="button"
          class="relative inline-flex"
          :class="{ 'overflow-hidden': !showExtraInfo }"
          @click="showExtraInfo = !showExtraInfo"
        >
          <BaseInfoIcon
            v-if="extraInfo !== undefined"
            class="w-5 h-5 ml-2 text-white"
          ></BaseInfoIcon>
          <div
            v-if="extraInfo !== undefined"
            :class="[
              showExtraInfo ? 'opacity-100 z-10' : 'opacity-0 z-0',
              extraInfoClassList,
            ]"
            class="absolute top-0 left-0 px-4 py-2 text-sm font-medium text-left text-white transition-opacity duration-300 bg-black rounded shadow-md sm:text-base extra-info"
          >
            {{ extraInfo }}
          </div>
        </BaseButton>
      </BaseLabel>
    </div>

    <div>
      <BaseInput
        :field-id="fieldId"
        :append-inner="appendInner"
        :error="error"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :incremental="incremental"
        :added="added"
        :value="value"
        :name="name"
        :inputmode="inputmode"
        :pattern="pattern"
        :prefix="prefix"
        :loading="loading"
        :input-class-list="inputClassList"
        :add-on-class-list="error ? 'text-error' : ''"
        @appendInnerAction="$emit('appendInnerAction')"
        @input="(value) => $emit('input', value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @keypress="$emit('keypress', $event)"
        @increment="$emit('increment')"
        @decrement="$emit('decrement')"
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
    fieldId: { type: String, default: '' },
    label: String,
    /** Label text for the field */
    inputClassList: [String, Array],
    labelClassList: [String, Array],
    extraInfoClassList: [String, Array],
    /** Type of the text input. Options ['text', 'email', 'url', 'tel', 'search', 'password'] */
    type: {
      type: String,
      default: 'text',
    },
    /** Value of the input */
    value: {
      type: [String, Number],
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
    loading: {
      type: Boolean,
      default: false,
    },
    extraInfo: {
      type: String,
      default: undefined,
    },
    /** Pattern attribute for input (used for mobile keypad) */
    pattern: {
      type: String,
      default: null,
    },
    prefix: {
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
    //  Incremental input
    incremental: {
      type: Boolean,
      default: false,
    },
    //  Filled incremental input
    added: {
      type: Boolean,
      default: false,
    },
    appendInner: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      showExtraInfo: false,
    }
  },
  computed: {
    id() {
      return '_' + Math.random().toString(36).substr(2, 9)
    },
  },
  mounted() {
    document.addEventListener('click', (evt) => {
      const infoElement = document.querySelector('.extra-info.opacity-100')
      let targetElement = evt.target // clicked element
      do {
        if (targetElement !== infoElement) {
          targetElement = targetElement.parentNode
        }
        // Go up the DOM
      } while (targetElement)

      this.showExtraInfo = false
    })
  },
}
</script>
