<template>
  <div class="flex flex-wrap sm:flex-no-wrap" :class="classList">
    <input
      :id="id"
      type="text"
      :value="value"
      :name="name"
      class="absolute invisible"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @keypress="$emit('keypress', $event)"
      @paste="$emit('paste', $event)"
    />
    <BaseButton
      class="w-10/12 px-20 py-16 m-auto border-2 border-dashed rounded border-black-300 ripple-bg-gray-variant6 sm:w-auto"
      type="button"
      @click="$emit('upload')"
    >
      <BaseCameraIcon class="w-8 h-8 m-auto text-black-300"></BaseCameraIcon>
    </BaseButton>
    <div
      class="flex flex-col justify-between w-10/12 py-2 m-auto mt-2 sm:ml-8 sm:mt-0 sm:w-auto"
    >
      <h3 class="text-xl font-medium">Upload Event Thumbnail</h3>
      <p class="text-base">
        Please make sure to use a high quality image. Very important.
      </p>
      <p class="text-sm">Size limit (5MB)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormFileUpload',
  props: {
    /** Value of the input */
    value: {
      type: String,
      default: '',
    },
    classList: [Array, String],
    // inputClassList: [Array, String],
    /** Id attribute for the input */
    id: String,
    /** name attribute for the input */
    name: String,
  },
  methods: {},
}
</script>
