<template>
  <Layout
    v-slot:default="{ loading, sidebarOpen, toggleSideBar }"
    style="background-color: #f4f4f4"
  >
    <div
      ref="mainContainer"
      class="relative flex py-10 overflow-hidden md:justify-around"
      :style="{ minHeight: sideMenuHeight }"
    >
      <!-- sidebar -->
      <div
        ref="sideMenu"
        :class="
          sidebarOpen
            ? 'translate-x-0 sm:translate-x-1/12 ease-out'
            : '-translate-x-full ease-in md:translate-x-0'
        "
        class="absolute w-9/12 transition duration-300 transform bg-white md:relative sm:w-4/12 md:w-3/12 lg:w-2/12 side-menu"
      >
        <BaseFilterNav></BaseFilterNav>
      </div>
      <!-- Main content -->
      <div
        ref="mainContent"
        class="w-full transition duration-300 transform md:w-8/12 lg:w-9/12"
        :class="
          sidebarOpen
            ? ['translate-x-10/12', 'sm:translate-x-5/12', 'ease-out']
            : 'translate-x-0 ease-in'
        "
      >
        <div
          style="box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2); max-height: 600px; "
          class="py-2 overflow-y-auto bg-gray-200"
        >
          <BaseListEventCardsSection
            :sidebarOpen="sidebarOpen"
            :toggleSideBarOpen="toggleSideBar"
            class="hidden px-4 sm:block"
          ></BaseListEventCardsSection>

          <BaseGridEventCardsSection
            :sidebarOpen="sidebarOpen"
            :toggleSideBarOpen="toggleSideBar"
            class="sm:hidden"
          ></BaseGridEventCardsSection>
        </div>
        <div
          class="flex items-center justify-between px-6 py-3 mt-6 bg-white shadow"
        >
          <div class="flex items-center">
            <BaseHeartBeatIcon class="inline text-primary"></BaseHeartBeatIcon>
            <span class="ml-2 font-medium font-quicksand text-black-800">
              See trending
            </span>
          </div>
          <div class="flex items-center">
            <span>1 of 3206</span>
            <BaseChevronDownIcon
              class="inline transform -rotate-90 text-black-600"
            ></BaseChevronDownIcon>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query{
  listEvents: allListEvents (sortBy:"id", order: ASC){
    edges{
      node{
        id,
        title,
        image(width: 115, height: 115, fit: fill),
        price,
        date
      }
    }
  }
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
// components
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseSideBarIcon from "~/components/atoms/icons/BaseSideBarIcon.vue";
import BaseHeartBeatIcon from "~/components/atoms/icons/BaseHeartBeatIcon.vue";
import BaseChevronDownIcon from "~/components/atoms/icons/BaseChevronDownIcon.vue";
import BaseListEventCardsSection from "~/components/organisms/BaseListEventCardsSection.vue";
import BaseGridEventCardsSection from "~/components/organisms/BaseGridEventCardsSection.vue";
import BaseFilterNav from "~/components/organisms/BaseFilterNav.vue";
//
// mixins
import basicMixins from "~/mixins/pagesBasicMixins.js";
export default {
  metaInfo: {
    title: "Events",
  },
  mixins: [basicMixins],
  components: {
    BaseListEventCardsSection,
    BaseGridEventCardsSection,
    BaseButton,
    BaseSideBarIcon,
    BaseHeartBeatIcon,
    BaseChevronDownIcon,
    BaseFilterNav,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss">
@media (max-width: 960px) {
  .side-menu {
    height: calc(100% - 80px);
  }
}
</style>
