import React from "react";
import { useContext } from "react";
import { TrampolineContext } from "../../Game";

function MoveRightButton() {
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


function MoveLeftButton() {
    // const dispatch  = useContext(GameContext);
    const { state, dispatch } = useContext(TrampolineContext);

    const handleLeftButtonClick = () => {
      dispatch({ type: 'MOVE_LEFT' });
    };
  
    const handleButtonRelease = () => {
        dispatch({ type: 'STOP' });
      };
    
      return (
        <button
          onMouseDown={handleLeftButtonClick}
          onMouseUp={handleButtonRelease}
          onTouchStart={handleLeftButtonClick}
          onTouchEnd={handleButtonRelease}
        >
          &#8592;
        </button>
      );
    }


	export default function navigationButtons({dispatch}){
		return(
			<div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
			<MoveLeftButton dispatch={dispatch} />
				<MoveRightButton dispatch={dispatch} />
			</div>
		)
	}