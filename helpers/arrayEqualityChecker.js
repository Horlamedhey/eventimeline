export default async (arr1, arr2) => {
  let equality = true
  await new Promise((resolve) => {
    for (let i = 0; i < arr1.length; i++) {
      const elem1 = arr1[i]
      if (arr2.find((v) => v === elem1) !== undefined) {
        continue
      } else {
        equality = false
      }
    }
    resolve()
  })
  return equality && arr1.length === arr2.length
}
