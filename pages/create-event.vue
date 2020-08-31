<template>
  <div
    class="flex flex-wrap justify-between pb-64 m-auto bg-white md:flex-no-wrap font-quicksand xl:w-7/12"
  >
    <BaseCreateEventIntro
      style="background-image: url(/create-event-vector.png);"
      class="px-8 py-20 bg-no-repeat bg-contain w-72 sm:w-96"
    ></BaseCreateEventIntro>
    <BaseCreateEventForm
      class="w-full px-3 sm:px-0 sm:w-9/12 sm:m-auto md:w-7/12 lg:w-5/12"
    ></BaseCreateEventForm>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Create Event',
  },
  mounted() {},
  methods: {
    async generateUploadSignature(callback, paramsToSign) {
      console.log(paramsToSign)
      const data = await this.$axios.$post(
        'http://localhost:3000/api',
        paramsToSign
      )
      console.log(data)
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
          maxFiles: 1,
          cropping: true,
          clientAllowedFormats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
          showPoweredBy: false,
          uploadSignature: this.generateUploadSignature,
        },
        (error, result) => {
          // check upload success
          if (!error && result && result.event === 'success') {
            console.log('result', result.info)
          } else {
            console.log('error', error)
          }
        }
      )
      return newWidget
    },
    openCloudinaryWidget() {
      const widget = this.createCloudinaryWidget()
      widget.open()
    },
  },
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }],
    }
  },
}
</script>
