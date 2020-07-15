<template>
  <div class="mt-10">
    <h2 class="text-black-700 text-tinier font-inter">
      Timeline
    </h2>
    <BaseNavList
      :items="categories"
      contentContainerClass="flex items-center group content-container-class mt-4 hover:shadow bg-gray-variant1 hover:bg-white  transition duration-300 ease-in overflow-x-hidden rounded"
      contentClass="text-base font-josefinsans font-normal text-gray-variant flex transition duration-300 ease-in group-hover:bg-white group-hover:text-black-600 rounded py-2 px-16 pr-full whitespace-no-wrap"
      activeClass="important-white-bg-text transition duration-300 ease-in"
      activeAddonClass="text-black-600 transition duration-300 ease-in"
      activeContentContainerClass="shadow important-white-bg-text transition duration-300 ease-in"
      addOnClass="group-hover:text-black-600 transition duration-300 ease-in"
    ></BaseNavList>
    <BaseButton
      class="block px-4 py-2 m-auto mt-3 transition duration-300 ease-in-out rounded cursor-pointer focus:outline-none active:bg-gray-100 hover:bg-gray-200"
    >
      <p class="text-center font-inter font-regular text-xxs text-black-500">
        Set calendar
      </p>
    </BaseButton>
  </div>
</template>

<script>
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseNavList from "~/components/molecules/BaseNavList.vue";
import BaseCalendarIcon from "~/components/atoms/icons/BaseCalendarIcon.vue";
export default {
  name: "BaseSideDateNav",
  components: {
    BaseButton,
    BaseNavList,
  },
  data() {
    return {};
  },
  computed: {
    categories() {
      return [
        {
          label: "This week",
          icon: BaseCalendarIcon,
          to: {
            path: "/",
            query: {
              category: this.$route.query.category || "all",
              timeline: "this-week",
            },
          },
          pointerKey: "timeline",
          pointerValue: "this-week",
        },
        {
          label: "Last week",
          icon: BaseCalendarIcon,
          to: {
            path: "/",
            query: {
              category: this.$route.query.category || "all",
              timeline: "last-week",
            },
          },
          pointerKey: "timeline",
          pointerValue: "last-week",
        },
        {
          label: "This month",
          icon: BaseCalendarIcon,
          to: {
            path: "/",
            query: {
              category: this.$route.query.category || "all",
              timeline: "this-month",
            },
          },
          pointerKey: "timeline",
          pointerValue: "this-month",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.important-white-bg-text {
  background-color: white !important;
  color: rgba(0, 0, 0, 0.6) !important;
}
</style>
