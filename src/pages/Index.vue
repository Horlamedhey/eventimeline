<template>
  <Layout v-slot:default="{ loading, sidebarOpen, toggleSideBar }">
    <BaseLandingSection></BaseLandingSection>
    <div
      ref="mainContainer"
      class="relative flex mt-48 overflow-hidden divide-x sm:mt-32"
      :style="{ minHeight: sideMenuHeight }"
    >
      <!-- sidebar -->
      <div
        ref="sideMenu"
        :class="
          sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        "
        class="absolute p-4 transition duration-300 transform md:relativew-10/12 sm:w-6/12 md:w-4/12 lg:w-3/12 md:translate-x-0"
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
        <BaseGridEventCardsSection
          :sidebarOpen="sidebarOpen"
          :toggleSideBarOpen="toggleSideBar"
        ></BaseGridEventCardsSection>
      </div>
    </div>
    <BaseAnnounceDecor></BaseAnnounceDecor>
    <BasePartners></BasePartners>

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
// components
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseLoader from "~/components/atoms/BaseLoader.vue";
import BaseSideCatNav from "~/components/organisms/BaseSideCatNav.vue";
import BaseSideDateNav from "~/components/organisms/BaseSideDateNav.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseAnnounceDecor from "~/components/organisms/BaseAnnounceDecor.vue";
import BaseLandingSection from "~/components/organisms/BaseLandingSection.vue";
import BaseGridEventCardsSection from "~/components/organisms/BaseGridEventCardsSection.vue";
import BasePartners from "~/components/organisms/BasePartners.vue";
//
// mixins
import basicMixins from "~/mixins/pagesBasicMixins.js";
export default {
  metaInfo: {
    title: "Home",
  },
  mixins: [basicMixins],
  components: {
    BaseLandingSection,
    BaseButton,
    BaseLoader,
    BaseSideCatNav,
    BaseSideDateNav,
    BaseInput,
    BaseAnnounceDecor,
    BaseGridEventCardsSection,
    BasePartners,
  },
  data() {
    return {};
  },
  computed: {},
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
.event-buttons {
  @apply block rounded transition-all duration-500 ease-in-out cursor-pointer;
}
.top-event-buttons {
  width: fit-content;
  @apply font-inter font-semibold text-base text-white;
}
</style>
