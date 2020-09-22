<template>
  <div
    ref="sideBarOverlay"
    class="absolute top-0 bottom-0 left-0 right-0 flex justify-end -mt-4 -mb-4 -ml-10 -mr-4 opacity-0 -z-1 bg-black-200"
    @click="closeCreateAgent"
  >
    <div
      ref="sideBar"
      class="h-full px-5 py-12 transform translate-x-full bg-white w-96"
      @click.stop=""
    >
      <div class="flex justify-between">
        <h2 class="text-lg font-medium">Create new agent</h2>
        <BaseButton
          class="rounded-full focus:outline-none"
          @click="closeCreateAgent"
        >
          <BaseCloseIcon class="text-primary-lighter"></BaseCloseIcon>
        </BaseButton>
      </div>
      <div class="mt-10">
        <BaseForm
          v-if="createAgent"
          :fields="fields"
          @input="setValues"
        ></BaseForm>
        <BaseButton
          class="w-full py-3 mt-8 text-lg font-medium text-white rounded ripple-bg-accent2"
        >
          Create Agent
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCraeteAgent',
  props: {
    createAgent: {
      type: Boolean,
      default: false,
    },
    closeCreateAgent: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      fields: [
        {
          component: 'BaseFormText',
          name: 'agentName',
          type: 'text',
          placeholder: "Agent's Name",
          autocomplete: 'on',
          classList: 'w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-4 rounded font-medium w-full py-6 text-lg',
          validators: [
            { component: 'required' },
            { component: 'minLength', param: 3 },
          ],
          value: '',
        },
        {
          component: 'BaseFormText',
          fieldId: 'agentId',
          name: 'agentId',
          type: 'text',
          disabled: true,
          appendInner: () =>
            import('~/components/atoms/icons/BaseClipboardIcon'),
          appendInnerAction: 'copyValue',
          placeholder: "Agent's ID",
          classList: 'w-full mt-8',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-4 rounded font-medium w-full py-6 text-lg',
          validators: [{ component: 'required' }],
          value: '',
        },
      ],
    }
  },
  watch: {
    createAgent(curr) {
      if (curr) {
        this.fields[1].value = `${
          this.$route.params.id
        }-${this.generateUniqueString()}`
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: 0,
          duration: 0.2,
        })
        timeline.to(this.$refs.sideBarOverlay, {
          opacity: 1,
          duration: 0.3,
          ease: 'power1.out',
        })
        timeline.to(this.$refs.sideBar, {
          x: 0,
          duration: 0.2,
          ease: 'power1.out',
        })
      } else {
        const timeline = this.$gsap.timeline()
        timeline.to(this.$refs.sideBar, {
          x: '100%',
          duration: 0.2,
          ease: 'power1.out',
        })
        timeline.to(this.$refs.sideBarOverlay, {
          zIndex: -1,
          opacity: 0,
          duration: 0.3,
          ease: 'power1.out',
        })
      }
    },
  },
  methods: {
    generateUniqueString() {
      const ts = String(new Date().getTime())
      let i = 0
      let out = ''

      for (i = 0; i < ts.length; i += 2) {
        out += Number(ts.substr(i, 2)).toString(36)
      }

      return out
    },

    setValues(formData) {
      for (const key in formData) {
        if (Object.hasOwnProperty.call(formData, key)) {
          const value = formData[key]
          this.fields.find((v) => v.name === key).value = value
        }
      }
    },
    copyValue(fieldId) {
      new Promise((resolve) => {
        this.fields[1].disabled = false
        resolve()
      })
        .then(() => {
          const copyText = document.getElementById(fieldId)
          copyText.select()
          copyText.setSelectionRange(0, 99999) /* For mobile devices */

          /* Copy the text inside the text field */
          document.execCommand('copy')
        })
        .then(() => {
          this.fields[1].disabled = true
        })
    },
  },
}
</script>
