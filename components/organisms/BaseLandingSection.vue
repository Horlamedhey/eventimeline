<template>
  <div class="container justify-center mx-auto mt-8 sm:flex">
    <div class="relative sm:mt-12 celebrate-div">
      <client-only>
        <cld-image
          public-id="events/celebrate.svg"
          alt="celebrate"
          fetch-format="auto"
          quality="auto"
          client-hints="true"
          crop="scale"
          loading="lazy"
          width="250"
          height="300"
          class="ml-auto sm:ml-0"
        >
          <cld-placeholder type="blur"> </cld-placeholder>
        </cld-image>
      </client-only>
      <div class="absolute top-0 ml-4 sm:-ml-16">
        <h1 class="font-bold font-josefinsans text-4-5xl">
          Ready
          <br />
          to turn-up
          <span class="italic">!</span>
        </h1>
        <!-- // padding-left: 1rem; // padding-right: 1rem; // padding-top:
            0.3rem; // padding-bottom: 0.3rem; // margin-top: 0.8rem; -->
        <BaseButton
          to="/events"
          class="px-5 py-2 mt-3 top-event-buttons md:mt-5 event-buttons bg-secondary-dark focus:outline-none hover:bg-opacity-75"
        >
          Find events
        </BaseButton>
        <BaseButton
          to="/create-event"
          class="px-5 py-2 mt-3 top-event-buttons md:mt-5 event-buttons bg-accent focus:outline-none hover:bg-opacity-75"
        >
          Organise event and ticketing
        </BaseButton>
        <BaseButton
          to="/create-event"
          class="px-5 py-2 mt-3 top-event-buttons md:mt-5 event-buttons bg-primary-light focus:outline-none hover:bg-opacity-75"
        >
          Provide a service
        </BaseButton>
      </div>
    </div>
    <!--  -->
    <div class="relative selfie-div">
      <client-only>
        <cld-image
          public-id="events/selfie.svg"
          alt="selfie"
          fetch-format="auto"
          quality="auto"
          client-hints="true"
          crop="scale"
          loading="lazy"
          width="250"
          height="300"
          class="ml-autos"
        >
          <cld-placeholder type="blur"> </cld-placeholder>
        </cld-image>
      </client-only>
      <p
        class="absolute flex justify-end px-5 py-4 ml-0 text-base font-medium font-inter intro-text sm:block sm:ml-8"
        style="color: rgba(77, 49, 191, 0.4)"
      >
        Find and organise events close to you & everything in-between
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLandingSection',
}
</script>
