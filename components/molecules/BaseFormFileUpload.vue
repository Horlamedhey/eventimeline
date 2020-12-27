<template>
  <div>
    <div class="flex flex-wrap sm:flex-nowrap" :class="classList">
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
        id="uploadButton"
        :style="preview ? { backgroundImage: `url(${preview})` } : {}"
        class="w-10/12 px-20 py-16 m-auto transition duration-300 bg-center bg-cover border-2 border-dashed rounded sm:w-auto group"
        :class="
          error
            ? ['border-error', ' ripple-bg-error-lighter']
            : [
                'border-black-300',
                preview === null ? ' ripple-bg-gray-variant6' : '',
              ]
        "
        type="button"
        @click="openCloudinaryWidget"
      >
        <BaseCameraIcon
          class="w-8 h-8 m-auto transition duration-300 group-hover:text-white"
          :class="error ? 'text-error' : 'text-black-300'"
        ></BaseCameraIcon>
      </BaseButton>
      <div
        v-if="!noDescription"
        class="flex flex-col justify-between w-10/12 py-2 m-auto mt-2 sm:ml-8 sm:mt-0 sm:w-auto"
      >
        <h3 class="text-xl font-medium">Upload Event Thumbnail</h3>
        <p class="text-base">
          Please make sure to use a high quality image. Very important.
        </p>
        <p class="text-sm">Size limit (1MB)</p>
      </div>
    </div>
    <div>
      <BaseValidationMessages :error="error" :error-messages="errorMessages" />
    </div>
    <!-- <h3 v-if="widget !== null" class="text-lg font-medium">
      Choose Upload Source
    </h3> -->
    <!-- <div id="upload-container"></div> -->
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
    externalPreview: {
      type: String,
      default: '',
    },
    classList: [Array, String],
    // inputClassList: [Array, String],
    /** Id attribute for the input */
    id: String,
    /** name attribute for the input */
    name: String,
    /** The error message shown if the input validation is failed */
    errorMessages: {
      type: [String, Array],
    },
    /** Whether input value is invalid */
    error: {
      type: Boolean,
      default: false,
    },
    noDescription: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      widget: null,
      preview: null,
    }
  },
  mounted() {
    if (this.externalPreview !== '') this.preview = this.externalPreview
  },
  methods: {
    async generateUploadSignature(callback, paramsToSign) {
      // console.log(paramsToSign)
      const data = await this.$axios.$post(
        'https://cloudinary-upload-sigature.vercel.app/api',
        paramsToSign
      )
      // console.log(data)
      callback(data)
      // console.log(paramsToSign)
      // callback(signature)
    },
    createCloudinaryWidget() {
      // eslint-disable-next-line no-undef
      const newWidget = cloudinary.createUploadWidget(
        {
          cloudName: 'befittinglife',
          uploadPreset: 'eventimeline',
          apiKey: '169241722441159',
          multiple: false,
          cropping: true,
          croppingAspectRatio: 0.5,
          clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
          maxFileSize: 1048576,
          styles: {
            palette: {
              window: '#FFF',
              windowBorder: '#4d31bf',
              tabIcon: '#4d31bf',
              menuIcons: '#5A616A',
              textDark: '#000000',
              textLight: '#FFFFFF',
              link: '#4d31bf',
              action: '#ea218d',
              inactiveTabIcon: '#4d31bf',
              error: '#E53E3E',
              inProgress: '#ea218d',
              complete: '#20B832',
              sourceBg: '#E4EBF1',
            },
          },
          // inlineContainer: '#upload-container',
          showPoweredBy: false,
          // showCompletedButton: true,
          uploadSignature: this.generateUploadSignature,
        },
        (error, result) => {
          // check upload success
          if (error) {
            const imageInput = document.querySelector('#imageInput')
            imageInput.value = error.statusText
            this.$emit('input', error.statusText)
            this.$emit('blur')
            // console.log('error', error.statusText)
          } else if (result.event === 'success') {
            const {
              public_id: publicId,
              colors: {
                0: { 0: color },
              },
              secure_url: secureUrl,
            } = result.info
            this.$emit('input', `${publicId} ${color}`)
            this.$emit('blur')
            this.widget.close()
            this.preview = secureUrl
          } else if (result.event === 'close') {
            document.getElementById('uploadButton').blur()
          }
        }
      )
      return newWidget
    },
    openCloudinaryWidget() {
      // if (this.widget === null) {
      this.widget = this.createCloudinaryWidget()
      // }
      this.widget.open()
    },
  },
}
</script>
