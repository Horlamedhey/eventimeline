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
}
</script>
