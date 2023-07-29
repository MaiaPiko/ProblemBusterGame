import React from "react";
import { useContext } from "react";
import { TrampolineContext } from "../../Game";

function MoveRightButton({ stageWidth }) {
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
			style={{
				width: "50%",
				// borderLeft: "none"
			}}
		>
			<h1 style={{ borderX: 25 }}>&#8594;</h1>
		</button>
	);
}

function MoveLeftButton({ stageWidth }) {
	// const dispatch  = useContext(GameContext);
	const { state, dispatch } = useContext(TrampolineContext);

	const handleLeftButtonClick = () => {
		dispatch({ type: "MOVE_LEFT" });
	};

	const handleButtonRelease = () => {
		dispatch({ type: "STOP" });
	};

	return (
		<button
			onMouseDown={handleLeftButtonClick}
			onMouseUp={handleButtonRelease}
			onTouchStart={handleLeftButtonClick}
			onTouchEnd={handleButtonRelease}
			style={{
				width: "50%",
				// borderRight: "none"
			}}
		>
			<h1 style={{ borderX: 25 }}>&#8592;</h1>
		</button>
	);
}

export default function NavigationButtons({ dispatch, stageWidth }) {
	return (
		<div
			style={{
				display: "flex", // Use flex display to place the buttons side by side
				justifyContent: "space-between", // Add space between the buttons
				width: stageWidth, // Set the width of the parent div to the stageWidth
			}}
		>
			<MoveLeftButton dispatch={dispatch} />
			<MoveRightButton dispatch={dispatch} />
		</div>
	);
}
