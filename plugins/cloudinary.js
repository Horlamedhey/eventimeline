import Vue from 'vue'
import { Cloudinary } from 'cloudinary-vue'
// import {
// //   CldContext,
//   CldImage,
// //   CldVideo,
// //   CldTransformation,
// //   CldPoster,
// } from 'cloudinary-vue'

Vue.use(Cloudinary, {
  configuration: { cloudName: 'befittinglife' },
})
// Vue.component('cld-image', CldImage)
