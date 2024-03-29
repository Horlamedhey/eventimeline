<template>
  <div ref="formContainer">
    <h3 ref="header" class="font-medium text-1xl sm:text-2-5xl">
      Step 2:<br />Organiser’s Details
    </h3>
    <div ref="form" class="mt-10 shadow-md">
      <div class="px-6 py-10 rounded shadow-outline form-container">
        <BaseForm
          :form-name="formName"
          :fields="fields"
          :completed="completed"
          :validate="validate"
          @input="setValues"
        ></BaseForm>
      </div>
    </div>

    <div ref="actionBtn" class="flex items-center justify-center mt-20">
      <BaseButton
        v-if="!loading"
        type="button"
        class="p-3 rounded-full shadow-xl ripple-bg-gray-100"
        @click="setCurrentForm(position - 1)"
      >
        <BaseChevronDownIcon class="transform rotate-90"></BaseChevronDownIcon>
      </BaseButton>

      <BaseButton
        type="button"
        class="flex items-center justify-center w-56 py-3 ml-8 font-medium rounded-full bg-secondary-light ripple-bg-secondary-light group"
        :class="loading ? 'cursor-wait' : ''"
        @click="loading ? null : validateBeforeNext()"
      >
        <BaseLoading v-if="loading"></BaseLoading>
        <template v-else>
          <span
            class="next-button-content group-hover:transition group-hover:text-white"
          >
            Next Step
          </span>
          <BaseArrowRightIcon
            class="ml-2 next-button-content group-hover:transition group-hover:text-white"
          ></BaseArrowRightIcon>
        </template>
      </BaseButton>
    </div>

    <BaseIncorrectPassword
      :incorrect-password="incorrectPassword"
      @closeIncorrectPassword="() => (incorrectPassword = false)"
    ></BaseIncorrectPassword>

    <BaseNewDataDialog
      :new-data-dialog="newDataDialog"
      :close-new-data-dialog="closeNewDataDialog"
      :data-model="newDataModel"
      @selectedData="processChoice"
    ></BaseNewDataDialog>
  </div>
</template>

<script>
// import assert from 'assert'
import * as Realm from 'realm-web'
import formsAnimationMixin from '~/mixins/formsAnimationMixin'
export default {
  name: 'BaseEventOrganiserDetails',
  mixins: [formsAnimationMixin],
  data() {
    return {
      loading: false,
      incorrectPassword: false,
      newDataDialog: false,
      choicesSorted: false,
      authUser: null,
      newDataModel: {},
      formName: 'organiserDetails',
      fields: [
        {
          component: 'BaseFormText',
          name: 'organiserName',
          type: 'text',
          label: 'ORGANISER’S NAME',
          autocomplete: 'on',
          classList: 'w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [
            { component: 'required' },
            { component: 'minLength', param: 2 },
          ],
          value: '',
        },
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
          name: 'phone',
          type: 'tel',
          label: 'PHONE',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          validators: [
            // { component: 'isPhone' },
          ],
          value: '',
        },
        {
          component: 'BaseFormText',
          name: 'adminPass',
          type: 'password',
          label: 'ADMIN PASS',
          autocomplete: 'on',
          classList: 'mt-8 w-full',
          inputClassList:
            'focus:border-2 border focus:border-accent4 border-black-200 h-10 px-2 rounded w-full py-4 text-lg',
          extraInfoClassList: 'sm:w-56 w-48 sm:ml-8 -ml-4 sm:mt-0 mt-5',
          extraInfo:
            'This is a secret password to access the event admin page.',
          validators: [
            // { component: 'required' },
            // { component: 'minLength', param: 8 },
          ],
          value: '',
        },
      ],
    }
  },
  methods: {
    async authenticateOrganiser() {
      this.loading = true
      //   register/login
      // const {
      //   newUser,
      //   user: {
      //     id: authId,
      //     accessToken,
      //     customData: { accounts, events },
      //   },
      // } =
      this.authUser = await this.authenticateUser(
        this.currValues.email.toLowerCase(),
        this.currValues.adminPass
      )
      this.loading = false
      if (this.authUser === null) {
        this.completed = false
      } else {
        const {
          user: {
            customData: { name, phone },
          },
        } = this.authUser

        if (
          this.authUser.newUser ||
          (!this.authUser.newUser &&
            name === this.currValues.organiserName &&
            phone === this.currValues.phone) ||
          this.choicesSorted
        ) {
          this.setCurrentForm(
            this.position + 1,
            this.processedCurrValues,
            this.formName,
            this.authUser
          )
        } else {
          // console.log(
          //   name,
          //   phone,
          //   this.currValues.organiserName,
          //   this.currValues.phone
          // )
          if (name !== this.currValues.organiserName) {
            this.newDataModel.oldName = {
              value: name,
              selected: false,
            }
            this.newDataModel.newName = {
              value: this.currValues.organiserName,
              selected: false,
            }
          }
          if (phone !== this.currValues.phone) {
            this.newDataModel.oldNumber = {
              value: phone,
              selected: false,
            }
            this.newDataModel.newNumber = {
              value: this.currValues.phone,
              selected: false,
            }
          }
          this.newDataDialog = true
        }
      }
    },

    async authenticateUser(email, password) {
      //   create user credential
      const credentials = Realm.Credentials.emailPassword(email, password)

      try {
        // register
        await this.$realmApp.emailPasswordAuth.registerUser(email, password)
        const user = await this.$realmApp.logIn(credentials)
        return { user, newUser: true }
      } catch (err) {
        console.log(err.message)
        if (err.message.toLowerCase().includes('name already in use')) {
          // login
          try {
            const user = await this.$realmApp.logIn(credentials)
            return { user, newUser: false }
          } catch (err) {
            console.error(err.message)

            if (
              err.message.toLowerCase().includes('invalid username/password')
            ) {
              this.incorrectPassword = true
              return null
              // alert('invalid password')
            }
          }
        }
      }
    },
    closeNewDataDialog() {
      this.newDataDialog = false
      this.completed = false
      this.newDataModel = {}
    },
    async processChoice(choice) {
      await new Promise((resolve) => {
        if (choice.organiserName !== undefined) {
          this.fields.find((v) => v.name === 'organiserName').value =
            choice.organiserName
        }
        if (choice.phone !== undefined) {
          this.fields.find((v) => v.name === 'phone').value = choice.phone
        }
        this.newDataDialog = false
        this.completed = false
        this.choicesSorted = true
        // console.log('sorted')
        resolve()
      })
      // this.validateBeforeNext(6)
      this.validateBeforeNext()
    },
  },
}
</script>
