<template>
  <div
    class="absolute bottom-0 w-full overflow-hidden text-white font-quicksand footer"
  >
    <svg viewBox="0 0 100 20" preserveAspectRatio="none">
      <polygon points="0,20 100,20 100,0" />
    </svg>
    <div
      class="relative flex flex-wrap justify-between w-full px-6 pt-32 pb-24 bg-black sm:px-0 sm:justify-evenly"
    >
      <!-- <div
      class="flex flex-wrap justify-center px-2 mt-10 sm:justify-evenly pb-36 pt-full sm:pt-1/3 content-wrapper"
    > -->
      <div
        v-for="(footerLinksList, i) in footerLinksLists"
        :key="`footerLinksList-${i}`"
        class=""
      >
        <h2 class="text-lg font-bold">
          {{ footerLinksList.heading }}
        </h2>
        <BaseNavList
          :items="footerLinksList.links"
          contentClass="text-base block mt-2 font-hairline"
        ></BaseNavList>
      </div>
    </div>
    <div class="relative z-30 z-40 flex justify-center pb-2 bg-black">
      <p class="text-xs">
        {{ `© ${new Date().getFullYear()} Eventimeline` }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseNavList from "~/components/molecules/BaseNavList.vue";
export default {
  name: "BaseFooter",
  components: {
    BaseNavList,
  },
  data() {
    return {
      computedPadding: "unset",
      footerLinksLists: [
        {
          heading: "Use Eventimeline",

          links: [
            { label: "How it works", to: "/how-it-works" },
            { label: "Terms & Policies", to: "/terms-and-policies" },
            { label: "FAQs", to: "/faqs" },
          ],
        },
        {
          heading: "Find Events",

          links: [
            { label: "Birthdays", to: "/?category=birthdays" },
            { label: "Launch Parties", to: "/?category=launch_parties" },
            { label: "Hangouts", to: "/?category=hangouts" },
            { label: "Meetups", to: "/?category=meetups" },
          ],
        },
        {
          heading: "Connect",

          links: [
            {
              label: "Facebook",
              href: "https://web.facebook.com/gaphar.horla1",
            },
            { label: "Twitter", href: "https://twitter.com/horlamedhey" },
            {
              label: "Instagram",
              href: "https://www.instagram.com/abdulgafarajao/",
            },
            { label: "Contact to support", to: "/support" },
          ],
        },
      ],
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
svg {
  width: 100%;
  fill: white;
  max-height: 100px;
  position: absolute;
  top: 0;
  transform: rotateX(180deg);
  z-index: 1;
  margin-top: -1px;
}
// .footer::after {
//   content: "";
//   top: 32%;
//   height: 200%;
//   @apply absolute w-full block transform skew-y-6 bg-black z-20;
// }
// @media (min-width: 600px) {
//   .footer::after {
//     top: 36%;
//   }
// }
// @media (min-width: 960px) {
//   .footer::after {
//     top: 42%;
//   }
// }
// @media (min-width: 1264px) {
//   .footer::after {
//     top: 50%;
//   }
// }
// @media (min-width: 1904px) {
//   .footer::after {
//     top: 60%;
//   }
// }
</style>
