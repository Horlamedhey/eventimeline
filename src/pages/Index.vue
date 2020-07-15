<template>
  <Layout>
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
        <g-image src="@/assets/svg/selfie.svg" alt="" class="ml-auto"></g-image>
        <p
          class="absolute flex justify-end px-5 py-4 ml-0 text-base font-medium font-inter intro-text sm:block sm:ml-8"
          style="color: rgba(77,49,191,0.4)"
        >
          Find and organise events close to you & everything in-between
        </p>
      </div>
    </div>
    <div
      ref="mainContainer"
      class="relative flex mt-48 divide-x"
      :style="{ minHeight: sideMenuHeight }"
    >
      <!-- sidebar -->
      <div
        ref="sideMenu"
        :class="
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        "
        class="absolute w-10/12 p-4 transition duration-300 transform sm:w-6/12 md:w-4/12 lg:w-3/12 md:translate-x-0"
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
      <!-- Main content -->
      <div
        ref="mainContent"
        class="w-full p-4 pt-0 transition duration-300 transform bg-transparent md:w-8/12 md:translate-x-6/12 lg:translate-x-4/12 lg:w-9/12"
        :class="
          sidebarOpen
            ? ['translate-x-10/12', 'sm:translate-x-6/12', 'ease-out']
            : 'translate-x-0 ease-in'
        "
      >
        <div class="flex items-center">
          <BaseButton
            class="mr-4 md:hidden focus:outline-none"
            @click="sidebarOpen = !sidebarOpen"
          >
            <BaseSideBarIcon
              :class="sidebarOpen ? 'text-secondary' : 'text-gray-variant'"
            ></BaseSideBarIcon>
          </BaseButton>
          <h1
            class="pt-1 font-semibold capitalize md:pt-0 text-1xl font-josefinsans"
            style="color: #1b1b1b"
          >
            Popular
            <span
              v-if="$route.query.timeline"
              class="text-base font-normal font-quicksand"
              style="color: rgba(27, 27, 27, 0.6);"
            >
              {{ $route.query.timeline.split("-").join(" ") }}
            </span>
          </h1>
        </div>
        <div
          class="flex flex-wrap items-center justify-center mt-12 events-container"
        >
          <!-- <div class="grid items-center grid-cols-1 mt-16 sm:grid-cols-2 "> -->
          <BaseEventGridCard
            v-for="event in $page.events.edges"
            :key="event.node.id"
            :event="event.node"
            class="mx-3 mb-10"
          ></BaseEventGridCard>
        </div>
      </div>
    </div>

    <BaseLoader :loading="loading" class="z-50"></BaseLoader>
  </Layout>
</template>
<page-query>
query{
  events: allEvents (sortBy:"id", order: ASC){
    edges{
      node{
        id,
        title,
        image(width: 170, height: 224, fit: contain),
        price,
        date,
        color
      }
    }
  }
}
</page-query>
<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseLoader from "~/components/atoms/BaseLoader.vue";
import BaseSideBarIcon from "~/components/atoms/icons/BaseSideBarIcon.vue";
import BaseSideCatNav from "~/components/organisms/BaseSideCatNav.vue";
import BaseSideDateNav from "~/components/organisms/BaseSideDateNav.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseEventGridCard from "~/components/molecules/BaseEventGridCard.vue";
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
    BaseEventGridCard,
  },
  data() {
    return {
      hydrated: false,
      loading: true,
      sidebarOpen: false,
    };
  },
  computed: {
    sideMenuHeight() {
      if (this.hydrated) {
        return this.$refs.sideMenu.clientHeight + 50 + "px";
      } else {
        return "unset";
      }
    },
  },
  mounted() {
    this.loading = false;
    window.addEventListener("resize", function() {
      if (window.innerWidth >= 1264) {
        this.sidebarOpen = false;
      }
    });
    this.hydrated = true;
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
  }
}
@media (min-width: 960px) {
  .selfie-div {
    margin-left: -2.6rem;
  }
}
@media (max-width: 330px) {
  .selfie-div {
    margin-top: -0.85rem;
  }
}
@media (max-width: 600px) {
  .celebrate-div {
    z-index: -1;
  }
}
@media (min-width: 421px) {
  .events-container {
    justify-content: flex-start;
  }
}
.event-buttons {
  width: fit-content;
  @apply block rounded font-inter font-semibold text-base text-white transition-all duration-500 ease-in-out;
}
</style>
