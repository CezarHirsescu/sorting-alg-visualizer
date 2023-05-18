/** 
 * step {
 *  swap: [int, int]
 *  highlight: [int...]
 * }
 */ 

function selectionSortSteps(arr) {
  const steps = []
  arr = [...arr]

  for (let i = 0; i < arr.length - 1; i++) {
    let pos = i
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({swap: [], highlight: [i, j, pos]})
      if (arr[j] < arr[pos]) {
        pos = j
      }
    }
    steps.push({swap: [i, pos], highlight: [i, pos]})
    const temp = arr[i]
    arr[i] = arr[pos]
    arr[pos] = temp
  }

  return steps
}


export default selectionSortSteps