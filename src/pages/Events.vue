<template>
  <Layout
    v-slot:default="{ loading, sidebarOpen, toggleSideBar }"
    style="background-color: #f4f4f4"
  >
    <div
      ref="mainContainer"
      class="relative flex pt-10 overflow-hidden md:justify-around"
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
        class="absolute w-11/12 transition duration-300 transform bg-white md:relative sm:w-6/12 md:w-4/12 lg:w-3/12 "
      >
        <BaseFilterNav></BaseFilterNav>
      </div>
      <!-- Main content -->
      <div
        ref="mainContent"
        class="w-full transition duration-300 transform bg-gray-200 shadow-outline-gray md:w-7/12 lg:w-8/12 md:mx-0"
        :class="
          sidebarOpen
            ? ['translate-x-11/12', 'sm:translate-x-7/12', 'ease-out']
            : 'translate-x-0 ease-in sm:mx-10'
        "
      >
        <div>
          <BaseButton
            class="mr-4 md:hidden focus:outline-none"
            @click="toggleSideBar"
          >
            <BaseSideBarIcon
              :class="sidebarOpen ? 'text-secondary' : 'text-red-700'"
            ></BaseSideBarIcon>
          </BaseButton>
        </div>
        <!-- <BaseListEventCardsSection
          :sidebarOpen="sidebarOpen"
          :toggleSideBarOpen="toggleSideBar"
          class="md:pl-6"
        ></BaseListEventCardsSection> -->
      </div>
    </div>
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
// components
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseSideBarIcon from "~/components/atoms/icons/BaseSideBarIcon.vue";
import BaseListEventCardsSection from "~/components/organisms/BaseListEventCardsSection.vue";
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
    BaseButton,
    BaseSideBarIcon,
    BaseFilterNav,
  },
  data() {
    return {};
  },
};
</script>
