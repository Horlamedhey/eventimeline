export default {
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
      prevValues: {},
      currValues: {},
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
    setValues(values, unStandardForm) {
      // TODO: Set object values such as ticket prices
      if (!unStandardForm) {
        this.fields.forEach((v) => {
          v.value = values[v.name]
        })
      }
      this.prevValues = { ...this.currValues }
      this.currValues = { ...values }
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
    },
    // validateBeforeNext(arg) {
    validateBeforeNext() {
      // console.log(arg)
      this.completed = true
    },
    validate(isValid) {
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
                    this.processedCurrValues[multiName].push(element)
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
          opacity: 0,
          zIndex: 0,
        },
        { opacity: 1, zIndex: 1, delay: 1.5 }
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
          x: 800,
          scale: 0,
        },
        {
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.75)',
        },
        '-=0.5'
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
        x: -800,
        scale: 0,
        duration: 1.5,
        ease: 'elastic.in(1, 0.75)',
      })
      this.timeline.to(this.$refs.actionBtn, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: 'Power1.out',
      })
      this.timeline.to(this.$refs.formContainer, {
        opacity: 0,
        zIndex: 0,
      })
    },

    // show the previous form
    reShowForm() {
      this.timeline.to(this.$refs.formContainer, {
        opacity: 1,
        zIndex: 1,
        delay: 1.5,
      })
      this.timeline.to(this.$refs.header, {
        opacity: 1,
        duration: 1,
        ease: 'power1.out',
      })
      this.timeline.to(
        this.$refs.form,
        {
          x: 0,
          scale: 1,
          duration: 1.5,
          ease: 'elastic.out(1, 0.75)',
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
          x: 800,
          scale: 0,
          duration: 1.5,
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
      this.timeline.to(this.$refs.formContainer, {
        opacity: 0,
        zIndex: 0,
      })
    },
  },
}
