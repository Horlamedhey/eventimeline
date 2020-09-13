import errorMessages from './errorMessages'

export default {
  methods: {
    $getErrorMessages(field, isVisible = false, multiName, groupName) {
      const messageList = []
      const validations = this.$v
      let currentValidation

      if (validations) {
        for (const key in validations) {
          if (key.charAt(0) === '$') continue

          if (key === field) {
            currentValidation = validations[key]
            break
          } else if (groupName) {
            for (const key2 in validations[key][groupName]) {
              if (key.charAt(0) === '$') continue
              if (key2 === field) {
                currentValidation = validations[key][groupName][key2]
                break
              }
            }
            break
          } else {
            for (const key2 in validations[key]) {
              if (key2 === field) {
                currentValidation = validations[key][key2]
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
                errorMessages[groupName][multiName || field] &&
                !currentValidation[key] &&
                !key.includes('$')
              ) {
                messageList.push(
                  errorMessages[groupName][multiName || field][key]
                )
              }
            }
          } else {
            for (const key in errorMessages[groupName][multiName || field]) {
              let state

              if (currentValidation[key]) {
                state = 'success'
              } else if (!currentValidation[key] && currentValidation.$dirty) {
                state = 'error'
              }

              if (currentValidation[key] !== undefined) {
                messageList.push({
                  state,
                  text: errorMessages[groupName][multiName || field][key],
                })
              }
            }
          }
        } else if (!isVisible) {
          for (const key in currentValidation) {
            if (
              errorMessages[multiName || field] &&
              !currentValidation[key] &&
              !key.includes('$')
            ) {
              messageList.push(errorMessages[multiName || field][key])
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
                text: errorMessages[multiName || field][key],
              })
            }
          }
        }
      }

      return messageList
    },
  },
}
