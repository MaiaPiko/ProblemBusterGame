import React from 'react';
import { useContext } from 'react';
import { TrampolineContext } from '../../Game';

export default function MoveLeftButton() {
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