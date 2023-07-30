import React, { useContext, useEffect, useRef } from 'react';

import { Container, Text, Graphics, useApp } from "@pixi/react";
import { startGameContext } from './Game';

function GameOverBox({ setStartGame, stageWidth, stageElement }) {
  const restartGame = useContext(startGameContext);
  const containerRef = useRef(null);
  const handleKeyInput = () => {
    setStartGame(false);
  };

  const handleClick = () => {
    setStartGame(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      handleKeyInput();
    };
    const handleClickInput = (event) => {
      handleClick();
    };
        // Get the actual DOM element of the PixiJS container
        const containerElement = containerRef.current;
        if (!containerElement) return;
    
        // Attach the click event listener directly to the container element
        containerElement.addEventListener('click', handleClick);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClickInput);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClickInput);
      containerElement.removeEventListener('click', handleClick);

      
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  const smallerScreen = stageWidth <= 768;
  const app = useApp();

  return (
    <Container ref={containerRef}>
      <Text
        text="Game Over"
        x={app.screen.width / 2}
        y={app.screen.width / 2}
        anchor={0.5}
        style={{
          align: 'center',
          fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
          fontSize: smallerScreen ? 30 : 60,
          fontWeight: '400',
          fill: ['#ffffff', '#00ff99'], // gradient
          stroke: '#01d27e',
          strokeThickness: 5,
          letterSpacing: 20,
          // dropShadow: true,
          // dropShadowColor: 'pink',
          // dropShadowBlur: 2,
          // dropShadowAngle: Math.PI / 6,
          // dropShadowDistance: 6,
          wordWrap: true,
          wordWrapWidth: smallerScreen ? 200 : 440,
        }}
      />
      {/* <Graphics
        draw={(g) => {
          g.lineStyle(2, 0xff00ff, 1);
          g.beginFill(0xff00bb, 0.25);
          g.drawRoundedRect(250, 200, 200, 200, 15);
          g.endFill();
        }}
      /> */}
    </Container>
  );
}

export default GameOverBox;
