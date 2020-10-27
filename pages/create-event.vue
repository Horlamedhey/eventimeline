<template>
  <div
    class="flex flex-wrap justify-between pb-64 m-auto bg-white border-t md:flex-no-wrap font-quicksand xl:w-7/12"
  >
    <BaseCreateEventIntro
      :style="{
        backgroundImage: `url(${require('@/static/images/confetti.gif')})`,
      }"
      class="px-8 py-20 bg-no-repeat bg-contain w-72 sm:w-96"
    ></BaseCreateEventIntro>
    <BaseCreateEventForm
      class="w-full px-3 sm:px-0 sm:w-9/12 sm:m-auto md:w-7/12 lg:w-5/12"
    ></BaseCreateEventForm>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
export default {
  metaInfo: {
    title: 'Create Event',
  },
  data() {
    return {}
  },
  // apollo: {
  //   events: {
  //     query: gql`
  //       query {
  //         events {
  //           _id
  //           category
  //           color
  //           date
  //           image
  //           location
  //           online
  //           price
  //           provisions
  //           textColor
  //           title
  //         }
  //       }
  //     `,
  //     fetchOnServer: false,
  //   },
  // },
  mounted() {},
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }],
    }
  },
}
</script>
