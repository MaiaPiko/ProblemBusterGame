import React, { useEffect, useRef, useContext } from 'react';
import { Graphics, Text, Container, useApp } from "@pixi/react";
import { startGameContext } from './Game';

const Skip = ({setStartGame}) => {
  const graphicsRef = React.useRef();
  const gameStart = useContext(startGameContext);
  const app = useApp()
  const handleMouseOver = () => {
    if (graphicsRef.current) {
      graphicsRef.current.cursor = "pointer";
    }
  };

  const handleMouseClick = () => {
    if (graphicsRef.current) {
      setStartGame(true);
    }
  }

  const handleMouseOut = () => {
    if (graphicsRef.current) {
      graphicsRef.current.cursor = "auto";
    }
  };

  return (
    <>
      <Container>
        <Graphics
          ref={graphicsRef}
          draw={(g) => {
            g.lineStyle(2, 0xff00ff, 1);
            g.beginFill(0xff00bb, 0.25);
            // g.drawRoundedRect(280, 400, 200, 75, 20);
            g.drawRoundedRect(app.screen.width/4 + 80, app.screen.height/1.55, 200, 75, 20);

            g.endFill();
          }}
          interactive={true}
          pointerover={handleMouseOver}
          pointerout={handleMouseOut}
          pointertap={handleMouseClick}
        />

        <Text
          text="skip"
          style={{
            fontFamily: "Arial",
            fontSize: 40,
            fontWeight: "bold",
            align: "center",
            fill: ["#ffffff"],
            zIndex: 2,
          }}
          // x={340}
          // y={415}
          x= {app.screen.width/2.35}
          y= {app.screen.height/1.51}
        />
      </Container>
    </>
  );
};

export default Skip;
