import { useState, useEffect } from "react"

import "./SortingVisualizer.css"
import { selectionSortSteps } from "../Algorithms/algorithms"
import { COLORS } from "../Constants"

// generateRandomArray(int min, int max, int n) -> int[100]
function generateRandomArray(min, max, n) {
	const arr = []
	min = Math.ceil(min)
	max = Math.floor(max)
	for (let i = 0; i < n; i++) {
		arr.push(Math.floor(Math.random() * (max - min + 1) + min))
	}
	return arr
}

// swaps elements i and j in array arr
// swap(int arr[], int i, int j) -> arr 
function swapStuff(arr, i, j) {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
  return arr
}


const SortingVisualizer = () => {
  const [length, setLength] = useState(75) // in the future I will have a slider to modify the number of elements in the ui
	const [values, setValues] = useState(() => generateRandomArray(5, 500, length))
  const [colors, setColors] = useState(() => Array(length).fill(COLORS.aqua))
	const [delay, setDelay] = useState(50)
  // const [animations, setAnimations] = useState([])
  
  function finishAnimation() {  
    for (let i = -1; i < colors.length; i++) {
      setTimeout(() => {
        setColors(prev => {
          if (i === -1) {
            for (let k = 0; k < prev.length; k++) {
              prev[k] = COLORS.aqua
            }
          } else {
            prev[i] = COLORS.lightGreen
          }
          return [...prev]
        })
      }, 10 * i)
    }
  }


  function handleGenerateRandom() {
    setValues(generateRandomArray(5, 500, 75))
    setColors(Array(length).fill(COLORS.aqua))
  }


  function handleSelectionSort() {
    const steps = selectionSortSteps(values)

    // add empty step to signify that the animation is over
    steps.push({swap: [], highlight: []})

    steps.forEach(({ swap, highlight }, i) => {
      setTimeout(() => {
        if (swap.length) {
          setValues(prev => swapStuff([...prev], swap[0], swap[1]))
        }
        if (highlight.length) {
          setColors(prev => {
            // reset colors first
            for (let j = 0; j < prev.length; j++) {
              if (j < highlight[0]) {
                prev[j] = COLORS.lightGreen
              } else {
                prev[j] = COLORS.aqua
              }
            }
            // then apply highlighting
            prev[highlight[0]] = COLORS.blue
            prev[highlight[1]] = COLORS.red
            if (highlight.length === 3) prev[highlight[2]] = COLORS.violet;

            return [...prev]  
          })
        } else {
          finishAnimation()
        }
      }, delay * i)
    })
  }


	return (
		<div style={{ textAlign: "center" }}>
			<p>Sorting Visualizer</p>
			<div className="bar-container">
				{values.map((value, index) => (
					<div
						key={index}
						className="bar"
						style={{ width: "10px", height: `${value}px`, backgroundColor: `${colors[index]}` }}
					></div>
				))}
			</div>
			<button onClick={handleGenerateRandom}>
				Generate Random Array
			</button>
			<button onClick={handleSelectionSort}>
				Selection Sort
			</button>

			<input
				type="range"
				min="1"
				max="100"
				value={delay}
				onChange={(e) => setDelay(e.target.value)}
			/>
			{delay}
		</div>
	)
}

export default SortingVisualizer
