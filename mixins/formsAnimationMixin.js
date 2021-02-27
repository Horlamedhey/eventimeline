import setFormValues from '@/mixins/setFormValues'
import arrayEqualityChecker from '~/helpers/arrayEqualityChecker'
import objectEqualityChecker from '~/helpers/objectEqualityChecker'
export default {
  mixins: [setFormValues],
  props: {
    position: {
      type: Number,
      default: 1,
      required: true,
    },
    currentForm: {
      type: Number,
      default: 1,
      required: true,
    },
    setCurrentForm: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      completed: false,
      timeline: null,
      processedCurrValues: {},
    }
  },
  watch: {
    currentForm(curr, prev) {
      if (this.position === curr) {
        this.completed = false
      }
      switch (true) {
        case curr === this.position && prev < this.position:
          this.showForm()
          break

        case curr === this.position && prev > this.position:
          this.reShowForm()
          break

        case curr > this.position && curr === this.position + 1:
          this.next()
          break

        case curr < this.position &&
          curr === this.position - 1 &&
          prev === this.position:
          this.prev()
          break

        default:
          break
      }
    },
  },
  beforeMount() {
    this.timeline = this.$gsap.timeline()
  },
  methods: {
    advanceSet(values, unStandardForm) {
      if (this.currentForm === 3) {
        if (
          this.prevValues.bankName !== undefined &&
          this.prevValues.bankName.length === 0 &&
          this.currValues.bankName.length > 0
        ) {
          this.fields.find((v) => v.name === 'accountNumber').disabled = false
          this.fields.find(
            (v) => v.name === 'accountNumber'
          ).placeholder = undefined
        }
        // if (
        //   this.sortedChoices &&
        //   (this.currValues.bankName !== this.prevValues.bankName ||
        //     this.currValues.accountNumber !== this.prev.accountNumber)
        // ) {
        //   console.log('me')
        //   this.fields.find((v) => v.name === 'accountName').value = ''
        // }
      }
    },
    // validateBeforeNext(arg) {
    validateBeforeNext() {
      // console.log(arg)
      this.completed = true
    },
    async validate(isValid) {
      if (isValid) {
        // console.log('valid', this.choicesSorted)
        const multiNamedFields = this.fields.filter(
          (v) => v.multiName !== undefined
        )
        const multiNames = []

        for (let i = 0; i < multiNamedFields.length; i++) {
          const multiName = multiNamedFields[i].multiName
          if (!multiNames.includes(multiName)) {
            multiNames.push(multiName)
          }
        }
        for (const key in this.currValues) {
          const element = this.currValues[key]
          const visibility =
            this.fields.find(
              (v) =>
                (v.group === key || v.name === key) &&
                (v.visible === undefined || v.visible === true)
            ) !== undefined

          if (
            (typeof element === 'string' && element.length > 0) ||
            (typeof element === 'object' &&
              element.length &&
              element.length > 0) ||
            (typeof element === 'object' && !element.length && visibility)
          ) {
            if (multiNames.length > 0) {
              for (let i = 0; i < multiNames.length; i++) {
                const multiName = multiNames[i]
                if (key.includes(multiName)) {
                  if (this.processedCurrValues[multiName]) {
                    if (
                      typeof element === 'string' &&
                      !this.processedCurrValues[multiName].includes(element)
                    ) {
                      // console.log(key, element, multiName, 'string')
                      this.processedCurrValues[multiName].push(element)
                    } else if (typeof element === 'object' && element.length) {
                      const equalities = []
                      // console.log(key, element, multiName, 'array')
                      const arrayProcessedCurrValues = this.processedCurrValues[
                        multiName
                      ].filter(
                        (v) => typeof element === 'object' && element.length
                      )
                      for (
                        let j = 0;
                        j < arrayProcessedCurrValues.length;
                        j++
                      ) {
                        const arrayProcessedCurrValue =
                          arrayProcessedCurrValues[i]
                        equalities.push(
                          await arrayEqualityChecker(
                            arrayProcessedCurrValue,
                            element
                          )
                        )
                      }

                      if (!equalities.includes(true)) {
                        // console.log(element)
                        this.processedCurrValues[multiName].push(element)
                      }
                    } else if (typeof element === 'object' && !element.length) {
                      // console.log(key, element, multiName, 'object')
                      const equalities = []
                      const objectProcessedCurrValues = this.processedCurrValues[
                        multiName
                      ].filter(
                        (v) => typeof element === 'object' && !element.length
                      )
                      for (
                        let j = 0;
                        j < objectProcessedCurrValues.length;
                        j++
                      ) {
                        const objectProcessedCurrValue =
                          objectProcessedCurrValues[i]
                        equalities.push(
                          await objectEqualityChecker(
                            objectProcessedCurrValue,
                            element
                          )
                        )
                      }

                      if (!equalities.includes(true)) {
                        // console.log(element)
                        this.processedCurrValues[multiName].push(element)
                      }
                    }
                  } else {
                    this.processedCurrValues[multiName] = [element]
                  }
                } else {
                  this.processedCurrValues[key] = element
                }
              }
            } else {
              this.processedCurrValues[key] = element
            }
          }
        }
        if (this.position === 2) {
          // console.log(this.choicesSorted, 'authing')
          this.authenticateOrganiser()
        } else {
          this.setCurrentForm(
            this.position + 1,
            this.processedCurrValues,
            this.formName
          )
        }
      } else {
        this.completed = false
      }
    },
    // Show the current form
    showForm() {
      this.timeline.fromTo(
        this.$refs.formContainer,
        {
          height: 0,
          opacity: 0,
          zIndex: 0,
        },
        {
          height: 'unset',
          opacity: 1,
          zIndex: 1,
          delay: this.position === 1 ? 1.5 : 2,
        }
      )
      this.timeline.fromTo(
        this.$refs.header,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: 'power1.out',
        }
      )
      this.timeline.fromTo(
        this.$refs.form,
        {
          y: 400,
          scale: 0.7,
        },
        {
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.75)',
        },
        '-=1.5'
      )
      this.timeline.fromTo(
        this.$refs.actionBtn,
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'Power1.out',
        },
        '-=2'
      )
    },

    // Remove the current form for the next form to be shown
    next() {
      this.timeline.to(this.$refs.header, {
        opacity: 0,
        duration: 1,
        ease: 'bounce.in',
      })
      this.timeline.to(this.$refs.form, {
        y: -400,
        scale: 0,
        duration: 1,
        ease: 'elastic.in(1, 0.75)',
      })
      this.timeline.to(this.$refs.formContainer, {
        height: 0,
        opacity: 0,
        zIndex: 0,
      })
      this.timeline.to(this.$refs.actionBtn, {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: 'Power1.out',
      })
    },

    // show the previous form
    reShowForm() {
      this.timeline.to(this.$refs.formContainer, {
        height: 'unset',
        opacity: 1,
        zIndex: 1,
        delay: 0.5,
      })
      this.timeline.to(
        this.$refs.form,
        {
          y: 0,
          scale: 1,
          duration: 2,
          ease: 'elastic.out(1, 0.75)',
        },
        '-=0.5'
      )
      this.timeline.to(
        this.$refs.header,
        {
          opacity: 1,
          duration: 1,
          ease: 'power1.out',
        },
        '-=1'
      )
      this.timeline.to(
        this.$refs.actionBtn,
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'Power1.out',
        },
        '-=2'
      )
    },

    // remove the current form for the previous form to be reshown
    prev() {
      this.timeline.to(this.$refs.header, {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
      })
      this.timeline.to(
        this.$refs.form,
        {
          y: 400,
          scale: 0,
          duration: 2,
          ease: 'elastic.out(1, 0.75)',
        },
        '-=0.5'
      )
      this.timeline.to(
        this.$refs.actionBtn,
        {
          opacity: 0,
          scale: 0.5,
          duration: 1,
          ease: 'Power1.out',
        },
        '-=2'
      )
      this.timeline.to(
        this.$refs.formContainer,
        {
          height: 0,
          opacity: 0,
          zIndex: 0,
        },
        '-=2.2'
      )
    },
  },
}
