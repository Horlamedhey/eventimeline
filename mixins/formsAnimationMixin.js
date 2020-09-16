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
      timeline: null,
    }
  },
  watch: {
    currentForm(curr, prev) {
      if (this.position === curr) {
        console.log(curr, prev, this.position)
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
