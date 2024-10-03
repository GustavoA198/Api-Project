export function IncludeInListObject (arrayOfObjects, listOfKeys, value) {
  for (const object of arrayOfObjects) {
    for (const key of listOfKeys) {
      if (object[key] === value) {
        return true
      }
    }
  }
  return false
}
