<template>
  <div class="m-auto mt-40 bg-primary lg:w-10/12 xl:w-8/12">
    <div
      :style="{
        background: `url(https://res.cloudinary.com/befittinglife/image/upload/v1596032401/events/confetti.png)`,
      }"
      class="w-full"
    >
      <div
        class="flex flex-wrap-reverse items-center justify-center py-20 sm:space-x-16 md:space-x-40"
      >
        <div class="p-12 bg-white rounded" style="height: fit-content">
          <p class="text-sm text-center font-inter">
            Give your next event the kind of <br />publicity it deserves.
          </p>
          <h1
            class="mt-10 text-2xl font-bold text-center sm:text-3-5xl font-josefinsans"
          >
            Sell out your event <br />within minutes<i>!</i>
          </h1>
          <BaseButton
            to="/create-event"
            class="w-11/12 px-5 py-2 mx-auto mt-12 text-xl text-center event-buttons bg-secondary font-josefinsans focus:outline-none hover:bg-opacity-75"
          >
            Create Event
          </BaseButton>
        </div>

        <client-only>
          <cld-image
            public-id="events/hiring.png"
            alt="create-event"
            fetch-format="auto"
            quality="auto"
            client-hints="true"
            loading="lazy"
            width="auto"
            class="pt-5"
          >
            <cld-placeholder type="blur"> </cld-placeholder>
          </cld-image>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseAnnounceDecor',
}
</script>
