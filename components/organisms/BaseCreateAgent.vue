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
          form-name="agentForm"
          :fields="fields"
          :completed="completed"
          :validate="validate"
          @input="setValues"
        ></BaseForm>
        <BaseButton
          class="w-full py-3 mt-8 text-lg font-medium text-white rounded ripple-bg-accent2"
          type="button"
          :class="loading ? 'cursor-wait' : ''"
          @click="loading ? null : (completed = true)"
        >
          <BaseLoading v-if="loading"></BaseLoading>
          <span v-else> Create Agent </span>
        </BaseButton>
      </div>

      <BaseInfoDialog
        :info-dialog="infoDialog"
        @close="() => (infoDialog = false)"
      >
        <p class="flex items-center w-full h-full font-medium text-error">
          Sorry dear ORGANISER, you cannot add yourself as an agent to this
          event.
        </p>
      </BaseInfoDialog>
    </div>
  </div>
</template>

<script>
import * as Realm from 'realm-web'
import fetchUser from '@/graphs/read/fetchUser'
import updateAgentMutation from '@/graphs/update/updateAgentMutation'
import InsertOneUserMutation from '@/graphs/create/InsertOneUserMutation'
export default {
  name: 'BaseCreateAgent',
  props: {
    createAgent: {
      type: Boolean,
      default: false,
    },
    closeCreateAgent: {
      type: Function,
      default: () => {},
    },
    agents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      completed: false,
      infoDialog: false,
      fields: [
        {
          component: 'BaseFormText',
          name: 'agentEmail',
          type: 'text',
          label: "Agent's Email",
          autocomplete: 'on',
          classList: 'w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-4 rounded font-medium w-full py-6 text-lg',
          validators: [{ component: 'required' }, { component: 'email' }],
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
          label: "Agent's ID",
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
        this.fields[1].value = `ET@${this.generateUniqueString()}`
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
    validate(isValid) {
      if (isValid) {
        this.loading = true
        this.addAgent()
      } else this.completed = false
    },
    async addAgent() {
      if (
        this.fields[0].value.toLowerCase() ===
        this.$realmApp.currentUser.customData.email
      ) {
        this.loading = false
        this.completed = false
        this.infoDialog = true
      } else {
        try {
          // register
          await this.$realmApp.emailPasswordAuth.registerUser(
            this.fields[0].value.toLowerCase(),
            this.fields[1].value
          )
          const credentials = Realm.Credentials.emailPassword(
            this.fields[0].value.toLowerCase(),
            this.fields[1].value
          )
          const user = await this.$realmApp.logIn(credentials)
          const userVariables = {
            organiserName: this.fields[0].value.split('@')[0].split('.')[0],
            phone: '',
            bankAccounts: [],
            email: this.fields[0].value.toLowerCase(),
            authId: user.id,
            events: [this.$route.params.id],
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          await this.$apolloClient.mutate({
            mutation: InsertOneUserMutation,
            variables: userVariables,
          })
          await this.$realmApp.currentUser.logOut()
          const {
            data: {
              updateOneEvent: { agents },
            },
          } = await this.$apolloClient.mutate({
            mutation: updateAgentMutation,
            variables: {
              agents: [
                {
                  email: this.fields[0].value.toLowerCase(),
                  agentId: this.fields[1].value,
                },
                ...(this.agents || []).map((v) => ({
                  email: v.email,
                  agentId: v.agentId,
                })),
              ],
              eventId: this.$route.params.id,
              updatedAt: new Date(),
            },
          })

          this.$emit('updatedAgents', agents)
          this.fields[0].value = ''
        } catch (err) {
          console.log(err.message)
          if (err.message.toLowerCase().includes('name already in use')) {
            // login
            try {
              const {
                data: {
                  user: { email },
                },
              } = await this.$apolloClient.query({
                query: fetchUser,
                variables: { email: this.fields[0].value.toLowerCase() },
              })
              const {
                data: {
                  updateOneEvent: { agents },
                },
              } = await this.$apolloClient.mutate({
                mutation: updateAgentMutation,
                variables: {
                  agents: [
                    { email, agentId: this.fields[1].value },
                    ...(this.agents || []).map((v) => ({
                      email: v.email,
                      agentId: v.agentId,
                    })),
                  ],
                  eventId: this.$route.params.id,
                  updatedAt: new Date(),
                },
              })

              this.$emit('updatedAgents', agents)
              this.fields[0].value = ''
            } catch (err) {
              console.error(err.message)
            } finally {
              this.loading = false
              this.completed = false
            }
          }
        }
      }
    },
  },
}
</script>
