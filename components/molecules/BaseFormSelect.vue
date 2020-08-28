<template>
  <div>
    <BaseLabel
      v-if="label"
      :html-for="`#${id}`"
      :error="error"
      :class-list="[labelClassList, 'mb-2']"
      class="relative text-base font-medium font-quicksand"
      :style="incremental ? { paddingTop: '1px', marginBottom: '0.4rem' } : {}"
    >
      <template v-if="required">* </template>{{ label }}
      <BaseButton
        type="button"
        class="relative"
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

    <div>
      <BaseSelect
        :id="id"
        :value="value"
        :disabled="disabled"
        :empty-value-label="emptyValueLabel"
        :options="options"
        :autocomplete="autocomplete"
        :name="name"
        :loading="loading"
        :input-class-list="inputClassList"
        :add-on-class-list="error ? 'text-error' : ''"
        @change="(value) => $emit('change', value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
    </div>

    <div class="u-form-field__validation-messages">
      <BaseValidationMessages :error="error" :error-messages="errorMessages" />
    </div>
  </div>
</template>

<script>
import uid from '@/helpers/uid'
export default {
  name: 'BaseFormSelect',
  props: {
    /** Label text for the field */
    label: String,
    /** Available options for the select. A single option format is: { label: String, value: String, disabled: Boolean } */
    options: {
      type: Array,
      required: true,
    },
    /** Value of the select */
    value: {
      type: String,
      required: true,
      default: '',
    },
    /** Whether the field is required */
    required: {
      type: Boolean,
      default: false,
    },
    /** Disabled attribute for the select */
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    /** Placeholder text for first item in the select */
    emptyValueLabel: String,
    /** Autocomplete attribute used for browser autocomplete */
    autocomplete: String,
    /** The error messages shown if the input validation is failed */
    errorMessages: {
      type: [String, Array],
    },
    extraInfo: {
      type: String,
      default: undefined,
    },
    /** name attribute for select */
    name: String,
    /** Whether select value is invalid */
    error: {
      type: Boolean,
      default: false,
    },
    inputClassList: [String, Array],
    labelClassList: [String, Array],
    extraInfoClassList: [String, Array],
    incremental: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showExtraInfo: false,
    }
  },
  computed: {
    id() {
      return uid()
    },
  },
}
</script>
