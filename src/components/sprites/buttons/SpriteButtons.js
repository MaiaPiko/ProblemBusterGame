import React, { useContext } from 'react';
import { Container, Graphics, Text, useApp } from "@pixi/react";
import { TrampolineContext } from '../../Game';

function MoveRightButton({dispatch}) {
  // const { dispatch } = useContext(TrampolineContext);

  const handleRightButtonClick = () => {
    dispatch({ type: "MOVE_RIGHT" });
  };

  const handleButtonRelease = () => {
    dispatch({ type: "STOP" });
  };

  const handleMouseOver = () => {
    if (rightButtonRef.current) {
      rightButtonRef.current.cursor = "pointer";
    }
  };

  const rightButtonRef = React.useRef();
  // const app = useApp();

  return (
    <Container>
      <Graphics
        ref={rightButtonRef}
        draw={(g) => {
          g.lineStyle(2, 0xff00ff, 1);
          g.beginFill(0xff00bb, 0.25);
          g.drawRoundedRect(700, 700,  200, 75, 20);
          g.endFill();
        }}
        interactive={true}
        pointerover={handleMouseOver}
        pointerout={handleButtonRelease}
        pointertap={handleRightButtonClick}
      />

      <Text
        text="&#8594;"
        style={{
          fontFamily: "Arial",
          fontSize: 40,
          fontWeight: "bold",
          align: "center",
          fill: ["#ffffff"],
          zIndex: 2,
        }}
        // x={app.screen.width / 2.35}
        // y={app.screen.height / 1.51}
      />
    </Container>
  );
}

function MoveLeftButton({dispatch}) {

  const handleLeftButtonClick = () => {
    dispatch({ type: "MOVE_LEFT" });
  };

  const handleButtonRelease = () => {
    dispatch({ type: "STOP" });
  };

  const handleMouseOver = () => {
    if (leftButtonRef.current) {
      leftButtonRef.current.cursor = "pointer";
    }
  };

  // const app = useApp();
  const leftButtonRef = React.useRef();

  return (
    <Container>
      <Graphics
        ref={leftButtonRef}
        draw={(g) => {
          g.lineStyle(2, 0xff00ff, 1);
          g.beginFill(0xff00bb, 0.25);
          g.drawRoundedRect(700, app.screen.height / 1.55, 200, 75, 20);
          g.endFill();
        }}
        interactive={true}
        pointerover={handleMouseOver}
        pointerout={handleButtonRelease}
        pointertap={handleLeftButtonClick}
      />

      <Text
        text="&#8592;"
        style={{
          fontFamily: "Arial",
          fontSize: 40,
          fontWeight: "bold",
          align: "center",
          fill: ["#ffffff"],
          zIndex: 2,
        }}
        // x={app.screen.width / 2.35}
        // y={app.screen.height / 1.51}
      />
    </Container>
  );
}

export default function SpriteButtons() {
  const {dispatch } = useContext(TrampolineContext);

	return (
    <Container>
			   <MoveLeftButton dispatch={dispatch}/>
      <MoveRightButton dispatch={dispatch}/>
      </Container>
	
	);
}
