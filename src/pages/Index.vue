<template>
  <Layout>
    <section>
      <div class="container justify-center mx-auto mt-24 sm:flex">
        <div class="relative sm:mt-12 celebrate-div">
          <g-image
            src="@/assets/svg/celebrate.svg"
            alt=""
            class="ml-auto sm:ml-0"
          ></g-image>
          <div class="absolute ml-4 sm:-ml-16 top-6">
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
              class="px-4 py-1 mt-3 md:px-5 md:py-2 md:mt-5 event-buttons bg-secondary-dark focus:outline-none hover:bg-opacity-75"
            >
              Find events
            </BaseButton>
            <BaseButton
              to="/create-event"
              class="px-4 py-1 mt-3 md:px-5 md:py-2 md:mt-5 event-buttons bg-accent focus:outline-none hover:bg-opacity-75"
            >
              Organise event and ticketing
            </BaseButton>
          </div>
        </div>
        <!--  -->
        <div class="relative selfie-div">
          <g-image
            src="@/assets/svg/selfie.svg"
            alt=""
            class="ml-auto"
          ></g-image>
          <p
            class="absolute flex justify-end px-5 py-4 ml-0 text-base font-medium font-inter intro-text sm:block sm:ml-8"
            style="color: rgba(77,49,191,0.4)"
          >
            Find and organise events close to you & everything in-between
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
.selfie-div {
  margin-top: -1rem;
}
@media (min-width: 600px) {
  .selfie-div {
    margin-left: -2.3rem;
    margin-top: 0 !important;

    .intro-text {
      // margin-left: 3.4rem;
    }
  }
}
@media (min-width: 960px) {
  .selfie-div {
    margin-left: -2.6rem;
  }
}
@media (max-width: 330px) {
  .celebrate-div {
  }
  .selfie-div {
    margin-top: -0.85rem;
  }
}
@media (max-width: 600px) {
  .celebrate-div {
    z-index: -1;
  }
}
.event-buttons {
  width: fit-content;
  @apply block rounded font-inter font-semibold text-base text-white transition-all duration-500 ease-in-out;
}
</style>
