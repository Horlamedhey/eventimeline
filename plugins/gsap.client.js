import { gsap } from 'gsap'
export default (_, inject) => {
  // Inject $hello(msg) in Vue, context and store.
  inject('gsap', gsap)
}
