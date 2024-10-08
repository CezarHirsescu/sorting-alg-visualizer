import { useState, useEffect } from "react"

import "./SortingVisualizer.css"
import { selectionSortSteps } from "../../algorithms"
import { COLORS } from "../../constants"
import Button from "../Button/Button"
// import Toggle from "../Toggle/Toggle"

// const Algorithms = {
// 	None: -1,
// 	SelectionSort: 0,
// 	MergeSort: 1,
// 	QuickSort: 2,
// 	InsertionSort: 3,
// }

// generateRandomArray(int min, int max, int n) -> int[n]
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
function swapInArr(arr, i, j) {
	const temp = arr[i]
	arr[i] = arr[j]
	arr[j] = temp
	return arr
}

// VERY handy function to give delay between each step of the sort
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

const SortingVisualizer = () => {
	// const [algorithm, setAlgorithm] = useState(-1)
	const [length, setLength] = useState(50)
	const [values, setValues] = useState(() =>
		generateRandomArray(50, 500, length)
	)
	const [colors, setColors] = useState(() => Array(length).fill(COLORS.aqua))
	const [delay, setDelay] = useState(2)
  const [restrictInput, setRestrictInput] = useState(false) 

	useEffect(() => {
		setValues(generateRandomArray(50, 500, length))
		setColors(() => {
			const arr = []
			for (let i = 0; i < length; i++) arr.push(COLORS.aqua)
			return arr
		})
    setDelay(() => {
      if (length <= 10) return 500
      else if (length <= 15) return 100
      else if (length <= 20) return 50
      else if (length <= 30) return 20
      else if (length <= 50) return 10
      else return 2

    })
	}, [length])

	// function finishAnimation() {
	// 	for (let i = -1; i < length; i++) {
	// 		setTimeout(() => {
	// 			setColors((prev) => {
	// 				if (i === -1) {
	// 					for (let k = 0; k < length; k++) {
	// 						prev[k] = COLORS.aqua
	// 					}
	// 				} else {
	// 					prev[i] = COLORS.lightGreen
	// 				}
	// 				return [...prev]
	// 			})
	// 		}, delay * i)
	// 	}
	// }

	function handleGenerateRandom() {
		setValues(generateRandomArray(50, 500, length))
		setColors((prev) => prev.map(() => COLORS.aqua))
	}

	async function handleSelectionSort() {
    setRestrictInput(true)

		const steps = selectionSortSteps(values)

		// add empty step to signify that the animation is over
		steps.push({ swap: [], highlight: [] })

		// make changes to state based on the steps
		for (let i = 0; i < steps.length; i++) {
			const { swap, highlight } = steps[i]

			// do highlighting
			setColors((prev) => {
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
				prev[highlight[1]] = COLORS.violet
				if (highlight.length === 3) prev[highlight[2]] = COLORS.red

				return [...prev]
			})
			await sleep(delay)

			// do a swap if there is one
			if (swap.length) {
				setValues((prev) => swapInArr([...prev], swap[0], swap[1]))
				await sleep(delay * 2)
			}
		}

    setRestrictInput(false)
	}

	// const toggleAlgHelper = (SortingAlg) =>
	// 	setAlgorithm((prev) => (prev === SortingAlg ? -1 : SortingAlg))

	return (
		<div className="app">
			<div className="header">
				{/* <Toggle
					onClick={() => toggleAlgHelper(Algorithms.SelectionSort)}
					isToggled={Algorithms.SelectionSort === algorithm}
				>
					Selection Sort
				</Toggle>
				<Toggle
					onClick={() => toggleAlgHelper(Algorithms.MergeSort)}
					isToggled={Algorithms.MergeSort === algorithm}
				>
					Merge Sort
				</Toggle>
				<Toggle
					onClick={() => toggleAlgHelper(Algorithms.QuickSort)}
					isToggled={Algorithms.QuickSort === algorithm}
				>
					Quick Sort
				</Toggle>
				<Toggle
					onClick={() => toggleAlgHelper(Algorithms.InsertionSort)}
					isToggled={Algorithms.InsertionSort === algorithm}
				>
					Insertion Sort
				</Toggle> */}
			</div>

			<div className="bar-container">
				{values.map((value, index) => (
					<div
						key={index}
						className="bar"
						style={{
							width: `${1000 / length}px`,
							height: `${value}px`,
							backgroundColor: `${colors[index]}`,
							transition: `height ${
								delay * 2
							}ms ease-in-out, background-color ${delay / 2}ms ease-in-out`,
						}}
					></div>
				))}
			</div>

			<div className="footer">
				<Button onClick={handleGenerateRandom} disabled={restrictInput}>Generate Random Array</Button>
				<Button onClick={handleSelectionSort} disabled={restrictInput}>Start!</Button>

				{/* <input
					type="range"
					min="1"
					max="500"
					value={delay}
					onChange={(e) => setDelay(e.target.value)}
          disabled={restrictInput}
				/>
				{delay} */}

				<input
					type="range"
					min="10"
					max="100"
					value={length}
					onChange={(e) => setLength(e.target.value)}
          disabled={restrictInput}
				/>
				{length}
			</div>
		</div>
	)
}

export default SortingVisualizer
