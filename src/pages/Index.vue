<template>
  <Layout>
    <section>
      <div class="container justify-center mx-auto mt-24 sm:flex">
        <div class="relative sm:mt-12 celebrate-div">
          <g-image
            src="@/assets/svg/celebrate.svg"
            class="ml-auto sm:ml-0"
          ></g-image>
          <div class="absolute ml-4 sm:-ml-16 top-6">
            <h1 class="font-bold font-josefinsans text-4-5xl">
              Ready
              <br />
              to turn-up
              <span class="italic">!</span>
            </h1>
            <BaseButton
              to="/events"
              class="event-buttons bg-secondary-dark focus:outline-none hover:bg-opacity-75"
            >
              Find events
            </BaseButton>
            <BaseButton
              to="/create-event"
              class="event-buttons bg-accent focus:outline-none hover:bg-opacity-75"
            >
              Organise event and ticketing
            </BaseButton>
          </div>
        </div>
        <!--  -->
        <div class="-mt-16 selfie-div">
          <g-image src="@/assets/svg/selfie.svg" class="ml-auto"></g-image>
          <p
            class="px-5 py-4 text-base font-medium font-inter"
            style="margin-left: 3.4rem; color: rgba(77,49,191,0.4)"
          >
            Find and organise events
            <br />
            close to you & everything in-between
          </p>
        </div>
      </div>
    </section>
    <section>
      <div class="flex">
        <div class=""></div>
        <div></div>
      </div>
    </section>
  </Layout>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
export default {
  metaInfo: {
    title: "Home",
  },
  components: {
    BaseButton,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@media (min-width: 600px) {
  .selfie-div {
    margin-left: -3rem;
    margin-top: 0 !important;
  }
}
@media (max-width: 330px) {
  .celebrate-div {
    padding-bottom: 2rem;
  }
}
@media (max-width: 600px) {
  .celebrate-div {
    z-index: -1;
  }
}
@media (min-width: 960px) {
  .selfie-div {
    margin-left: -3.4rem;
  }
}
.event-buttons {
  width: fit-content;
  @apply block px-5 py-3 mt-10 rounded font-inter font-semibold text-base text-white transition-all duration-500 ease-in-out;
}
</style>
