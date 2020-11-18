export default {
  data() {
    return {
      prevValues: {},
      currValues: {},
    }
  },
  methods: {
    setValues(values, unStandardForm) {
      if (!unStandardForm) {
        this.fields.forEach((u) => {
          if (u.fields !== undefined) {
            u.fields.forEach((v) => {
              if (values[u.group] !== undefined) {
                v.value = values[u.group][v.name]
              }
            })
          } else {
            u.value = values[u.name]
          }
        })
      }
      this.prevValues = { ...this.currValues }
      this.currValues = { ...values }
      if (this.currentForm) {
        this.advanceSet()
      }
    },
  },
}
