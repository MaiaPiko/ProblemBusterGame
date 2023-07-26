import React from "react";
import { useContext } from "react";
import { TrampolineContext } from "../../Game";

export default function MoveRightButton() {
	// const dispatch  = useContext(GameContext);
	const { state, dispatch } = useContext(TrampolineContext);

	const handleRightButtonClick = () => {
		dispatch({ type: "MOVE_RIGHT" });
	};
	const handleButtonRelease = () => {
		dispatch({ type: "STOP" });
	};

	return (
		<button
			onMouseDown={handleRightButtonClick}
			onMouseUp={handleButtonRelease}
			onTouchStart={handleRightButtonClick}
			onTouchEnd={handleButtonRelease}
		>
			&#8594;
		</button>
	);
}
