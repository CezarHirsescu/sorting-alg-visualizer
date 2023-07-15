import { useState } from "react"
import "./Toggle.css"

// utility component. A button that is toggled on and off
const Toggle = ({onClick, isToggled, disabled, children }) => {

	return (
		<button onClick={onClick} className={isToggled ? "toggled" : ""}>
			{children}
		</button>
	)
}

export default Toggle
