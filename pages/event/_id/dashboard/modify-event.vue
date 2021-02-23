<template>
  <div>
    <h1 class="dashboard-main-title">Event Details</h1>
    <div class="p-8 mt-5 shadow-outline dashboard-card">
      <div class="flex justify-between">
        <div class="w-1/2">
          <h2 class="edit-titles dashboard-main-subtitle">
            <span style="line-height: initial"> EVENT TITLE </span>
            <BaseButton
              v-if="!editFields.eventTitle.editing"
              @click="editData('eventTitle')"
            >
              <BaseEditIcon class="edit-button" />
            </BaseButton>
            <BaseButton
              v-else
              class="cancel-button"
              @click="cancelEdit('eventTitle')"
            >
              Cancel
            </BaseButton>
          </h2>
          <h3 class="text-lg font-medium">{{ event.eventTitle }}</h3>
          <div
            class="w-full mt-4 transition-opacity duration-300 ease-in-out"
            :class="
              editFields.eventTitle.editing
                ? 'opacity-100 relative'
                : 'opacity-0 absolute'
            "
          >
            <BaseFormText
              v-model="editFields.eventTitle.value"
              name="eventTitle"
              type="text"
              placeholder="EVENT TITLE"
              autocomlabelplete
              label-class-list="text-white text-base"
              input-class-list="focus:border-2 border-black-200 focus:border-dashboard-accent-variant border h-8 px-2 rounded w-full py-4 text-sm"
            ></BaseFormText>
          </div>

          <h2 class="mt-10 edit-titles dashboard-main-subtitle">
            <span style="line-height: initial"> DESCRIPTION </span>
            <BaseButton
              v-if="!editFields.eventDescription.editing"
              @click="editData('eventDescription')"
            >
              <BaseEditIcon class="edit-button" />
            </BaseButton>
            <BaseButton
              v-else
              class="cancel-button"
              @click="cancelEdit('eventDescription')"
            >
              Cancel
            </BaseButton>
          </h2>
          <p class="text-lg font-medium">
            {{ event.eventDescription }}
          </p>
          <div
            class="w-full mt-4 transition-opacity duration-300 ease-in-out"
            :class="
              editFields.eventDescription.editing
                ? 'opacity-100 relative'
                : 'opacity-0 absolute'
            "
          >
            <BaseFormTextArea
              v-model="editFields.eventDescription.value"
              name="eventDescription"
              placeholder="DESCRIPTION"
              autocomplete
              label-class-list="text-white text-base"
              input-class-list="focus:border-2 border-black-200 focus:border-dashboard-accent-variant border px-2 rounded w-full py-4 text-sm"
            ></BaseFormTextArea>
          </div>
        </div>
        <div>
          <BaseFormFileUpload
            disabled
            no-description
            :external-preview="`https://res.cloudinary.com/befittinglife/image/upload/c_scale,h_164,q_auto,w_196/v1/${event.eventImage}`"
          ></BaseFormFileUpload>
        </div>
      </div>

      <div class="flex mt-10 space-x-20">
        <div v-for="(ticket, i) in event.tickets" :key="`ticket-${i}`">
          <h2 class="uppercase edit-titles dashboard-main-subtitle">
            <span style="line-height: initial">
              {{ ticket.ticketType }} PRICE
            </span>
            <!-- <BaseButton @click="editData('tickets', i)">
              <BaseEditIcon class="edit-button" />
            </BaseButton> -->
          </h2>
          <h3 class="font-medium text-1xl">
            {{ ticket.ticketPrice | currencyFormatter }}
          </h3>
        </div>
      </div>

      <BaseButton
        :disabled="!changeStatus"
        class="px-6 py-2 mt-16 text-xl font-medium text-center rounded-lg ripple-bg-dashboard-accent text-dashboard-accent-variant"
        @click="saveEdit"
      >
        <BaseLoading v-if="saveLoading" />
        <span v-else> Save Changes </span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
import UpdateOneEventMutation from '@/graphs/update/UpdateOneEventMutation'
export default {
  name: 'ModifyEvent',
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      editFields: {
        eventTitle: {
          editing: false,
          changed: false,
          value: '',
        },
        eventDescription: {
          editing: false,
          changed: false,
          value: '',
        },
      },
      saveLoading: false,
    }
  },
  computed: {
    changeStatus() {
      const changeStatus = []
      for (const key in this.editFields) {
        if (Object.hasOwnProperty.call(this.editFields, key)) {
          const editField = this.editFields[key]
          // console.log(editField, key, editField.value, this.event[key])
          if (
            editField.value.length > 0 &&
            editField.value !== this.event[key]
          ) {
            editField.changed = true
            changeStatus.push(true)
          } else {
            editField.changed = false
          }
        }
      }
      if (changeStatus.length > 0) {
        return true
      }
      return false
    },
  },
  methods: {
    editData(dataName) {
      const event = { ...this.event }
      this.editFields[dataName].editing = true
      this.editFields[dataName].value = event[dataName]
    },
    cancelEdit(dataName) {
      this.editFields[dataName].editing = false
      this.editFields[dataName].value = ''
    },
    cancelAllEdits() {
      this.editFields = {
        eventTitle: {
          editing: false,
          value: '',
        },
        eventDescription: {
          editing: false,
          value: '',
        },
      }
    },
    async saveEdit() {
      this.saveLoading = true
      try {
        await this.$apolloClient.mutate({
          mutation: UpdateOneEventMutation,
          variables: {
            eventId: this.event._id,
            eventTitle: this.editFields.eventTitle.changed
              ? this.editFields.eventTitle.value
              : null,
            eventDescription: this.editFields.eventDescription.changed
              ? this.editFields.eventDescription.value
              : null,
            updatedAt: new Date(),
          },
        })
        // TODO: Filter out unchanged fields before emission
        this.$emit('updateEvent', this.editFields)
        this.saveLoading = false
        setTimeout(() => {
          this.cancelAllEdits()
        }, 50)
      } catch (err) {
        console.log(err)
      }
    },
  },
  head() {
    return {
      script: [{ src: 'https://widget.cloudinary.com/v2.0/global/all.js' }],
    }
  },
}
</script>

<style lang="scss">
.edit-titles {
  @apply flex items-end;
}
.edit-button,
.cancel-button {
  @apply inline-block ml-4;
}
.edit-button {
  @apply text-dashboard-accent-variant;
}
.cancel-button {
  @apply text-error font-medium;
}
</style>
