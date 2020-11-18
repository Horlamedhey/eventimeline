<template>
  <div
    ref="loginMenu"
    class="absolute top-0 right-0 mt-16 mr-8 bg-white rounded-lg shadow-lg opacity-0"
    style="width: 320px; z-index: -1"
  >
    <BaseCloseButton @close="$emit('closeLogin')"></BaseCloseButton>
    <div class="px-6 py-10 rounded shadow-outline-accent form-container">
      <BaseForm
        form-name="loginDetails"
        :fields="fields"
        :completed="completed"
        :validate="validate"
        @input="setValues"
      ></BaseForm>
      <div ref="actionBtn" class="flex items-center justify-center mt-10">
        <BaseButton
          type="button"
          class="flex items-center justify-center w-56 py-3 ml-8 font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
          :class="loading ? 'cursor-wait' : ''"
          @click="loading ? null : (completed = true)"
        >
          <BaseLoading v-if="loading"></BaseLoading>
          <template v-else>
            <span
              class="next-button-content group-hover:transition group-hover:text-white"
            >
              Continue
            </span>
            <BaseArrowRightIcon
              class="ml-2 next-button-content group-hover:transition group-hover:text-white"
            ></BaseArrowRightIcon>
          </template>
        </BaseButton>
      </div>
    </div>
    <BaseIncorrectPassword
      :incorrect-password="incorrectPassword"
      :incorrect-email="true"
      @closeIncorrectPassword="() => (incorrectPassword = false)"
    ></BaseIncorrectPassword>
  </div>
</template>

<script>
import * as Realm from 'realm-web'
import setFormValues from '@/mixins/setFormValues'
export default {
  name: 'BaseLoginMenu',
  mixins: [setFormValues],
  props: {
    loginOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      completed: false,
      incorrectPassword: false,
      fields: [
        {
          component: 'BaseFormText',
          name: 'email',
          type: 'email',
          label: 'EMAIL',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [{ component: 'required' }, { component: 'email' }],
          value: '',
        },
        {
          component: 'BaseFormText',
          name: 'password',
          type: 'password',
          label: 'PASSWORD',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',

          validators: [],
          value: '',
        },
      ],
      timeline: null,
    }
  },
  watch: {
    loginOpen(curr) {
      if (curr) {
        this.timeline.fromTo(
          this.$refs.loginMenu,
          {
            zIndex: -1,
          },
          { zIndex: 1 }
        )
        this.timeline.fromTo(
          this.$refs.loginMenu,
          {
            opacity: 0,
            y: -40,
          },
          { opacity: 1, y: 0, duration: 0.4, ease: 'Power1.out' }
        )
      } else {
        this.timeline.fromTo(
          this.$refs.loginMenu,
          { opacity: 1, zIndex: 1, y: 0 },
          {
            opacity: 0,
            zIndex: -1,
            y: -40,
            duration: 1,
            delay: 0.5,
            ease: 'Power1.out',
          }
        )
      }
    },
  },
  beforeMount() {
    this.timeline = this.$gsap.timeline()
  },
  methods: {
    validate(isValid) {
      if (isValid) {
        this.loading = true
        this.loginUser()
      } else this.completed = false
    },
    async loginUser() {
      const credentials = Realm.Credentials.emailPassword(
        this.currValues.email.toLowerCase(),
        this.currValues.password
      )
      try {
        await this.$realmApp.logIn(credentials)
        this.$emit('closeLogin')
        this.$router.push('/my-events')
      } catch (err) {
        this.completed = false
        // console.log(err.message)
        if (err.message.toLowerCase().includes('invalid username/password')) {
          this.incorrectPassword = true
          //   alert('invalid password')
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
