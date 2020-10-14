import errorMessages from './errorMessages'

export default {
  methods: {
    $getErrorMessages(
      formName,
      field,
      isVisible = false,
      multiName,
      groupName
    ) {
      const messageList = []
      const validations = this.$v.formData
      let currentValidation

      if (validations) {
        for (const key in validations) {
          if (key.charAt(0) === '$') continue

          if (key === field) {
            currentValidation = validations[key][formName]
            break
          } else if (groupName) {
            for (const key2 in validations[formName][groupName]) {
              if (key.charAt(0) === '$') continue
              if (key2 === field) {
                currentValidation = validations[formName][groupName][key2]
                break
              }
            }
            break
          } else {
            for (const key2 in validations[formName]) {
              if (key2 === field) {
                currentValidation = validations[formName][key2]
              }
            }
          }
        }

        if (!currentValidation) return

        if (groupName) {
          // console.log(currentValidation)
          if (!isVisible) {
            for (const key in currentValidation) {
              if (
                errorMessages[formName][groupName][multiName || field] &&
                !currentValidation[key] &&
                !key.includes('$')
              ) {
                messageList.push(
                  errorMessages[formName][groupName][multiName || field][key]
                )
              }
            }
          } else {
            for (const key in errorMessages[formName][groupName][
              multiName || field
            ]) {
              let state

              if (currentValidation[key]) {
                state = 'success'
              } else if (!currentValidation[key] && currentValidation.$dirty) {
                state = 'error'
              }

              if (currentValidation[key] !== undefined) {
                messageList.push({
                  state,
                  text:
                    errorMessages[formName][groupName][multiName || field][key],
                })
              }
            }
          }
        } else if (!isVisible) {
          for (const key in currentValidation) {
            if (
              errorMessages[formName][multiName || field] &&
              !currentValidation[key] &&
              !key.includes('$')
            ) {
              messageList.push(errorMessages[formName][multiName || field][key])
            }
          }
        } else {
          for (const key in errorMessages[multiName || field]) {
            let state

            if (currentValidation[key]) {
              state = 'success'
            } else if (!currentValidation[key] && currentValidation.$dirty) {
              state = 'error'
            }

            if (currentValidation[key] !== undefined) {
              messageList.push({
                state,
                text: errorMessages[formName][multiName || field][key],
              })
            }
          }
        }
      }

      return messageList
    },
  },
}
