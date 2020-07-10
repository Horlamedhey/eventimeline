<template>
  <Layout>
    <section>
      <div class="container justify-center mx-auto mt-8 sm:flex">
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
              class="px-5 py-2 mt-3 md:mt-5 event-buttons bg-secondary-dark focus:outline-none hover:bg-opacity-75"
            >
              Find events
            </BaseButton>
            <BaseButton
              to="/create-event"
              class="px-5 py-2 mt-3 md:mt-5 event-buttons bg-accent focus:outline-none hover:bg-opacity-75"
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
    <section class="mt-48">
      <div class="relative flex overflow-x-hidden divide-x">
        <div
          :class="
            sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
          "
          class="absolute w-10/12 h-screen transition duration-300 transform sm:w-6/12 md:w-4/12 lg:w-3/12 md:translate-x-0 "
        >
          <BaseSideCatNav></BaseSideCatNav>
          <BaseSideDateNav></BaseSideDateNav>

          <div class="flex justify-center mt-16">
            <BaseInput
              id="search-input"
              name="search"
              type="search"
              placeholder="Search..."
              classList="border-black-600 border xl:w-4/6 lg:w-3/6 md:w-4/6 sm:w-7/12 hidden sm:block mr-1 pr-1"
              inputClassList="text-sm font-inter placeholder-black-600 py-3"
            ></BaseInput>
          </div>
        </div>
        <div
          class="w-full h-screen transition duration-300 transform bg-transparent md:w-8/12 md:translate-x-6/12 lg:translate-x-4/12 lg:w-9/12"
          :class="
            sidebarOpen
              ? ['translate-x-10/12', 'sm:translate-x-6/12', 'ease-out']
              : 'translate-x-0 ease-in'
          "
        >
          <BaseButton
            class="md:hidden focus:outline-none"
            @click="sidebarOpen = !sidebarOpen"
          >
            <BaseSideBarIcon
              :class="sidebarOpen ? 'text-secondary' : 'text-gray-variant'"
            ></BaseSideBarIcon>
          </BaseButton>
        </div>
      </div>
    </section>
    <BaseLoader :loading="loading" class="z-50"></BaseLoader>
  </Layout>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseLoader from "~/components/atoms/BaseLoader.vue";
import BaseSideBarIcon from "~/components/atoms/icons/BaseSideBarIcon.vue";
import BaseSideCatNav from "~/components/organisms/BaseSideCatNav.vue";
import BaseSideDateNav from "~/components/organisms/BaseSideDateNav.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
export default {
  metaInfo: {
    title: "Home",
  },
  components: {
    BaseButton,
    BaseLoader,
    BaseSideBarIcon,
    BaseSideCatNav,
    BaseSideDateNav,
    BaseInput,
  },
  data() {
    return {
      loading: true,
      sidebarOpen: false,
    };
  },
  mounted() {
    this.loading = false;
    window.addEventListener("resize", function() {
      if (window.innerWidth >= 1264) {
        this.sidebarOpen = false;
      }
    });
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
