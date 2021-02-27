export default async (obj1, obj2) => {
  let equality = true
  await new Promise((resolve) => {
    for (const key in obj1) {
      if (Object.hasOwnProperty.call(obj1, key)) {
        const element = obj1[key]
        if (obj2[key] === element) {
          continue
        } else equality = false
      }
    }
    equality = equality && Object.keys(obj1).length === Object.keys(obj2).length
    resolve()
  })
  return equality
}
