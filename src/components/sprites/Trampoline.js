import React, { useEffect, useRef, useReducer, useContext, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Container, AnimatedSprite, useTick, useApp, Graphics } from '@pixi/react';
import trampoline1 from "../../assets/trampoline/pinkTrampoline1.png";
import trampoline2 from "../../assets/trampoline/pinkTrampoline2.png";
import { checkCollision } from '../../features/checkCollision';
// import { TrampolineContext } from '../Game';

const textures = [
  PIXI.Texture.from(trampoline1),
  PIXI.Texture.from(trampoline2),
];

function reducer(state, action) {
  switch (action.type) {
    case 'MOVE_LEFT':
      return { ...state, velocity: -5 };
    case 'MOVE_RIGHT':
      return { ...state, velocity: 5 };
    case 'STOP':
      return { ...state, velocity: 0 };
    default:
      return state;
  }
}

export default function Trampoline({ stageWidth, stageHeight, speed, trampolineRef, blueyRef}) {
  const [motion, keyDispatch] = useReducer(reducer, { velocity: 0 });

  const [collision, setCollision] = useState(false);
  const smallerScreen = stageWidth <780;
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowLeft') {
        keyDispatch({ type: 'MOVE_LEFT' });
      } else if (event.key === 'ArrowRight') {
        keyDispatch({ type: 'MOVE_RIGHT' });
      }
    }

    function handleKeyUp(event) {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        keyDispatch({ type: 'STOP' });
      }
    }

    // const handleMove = (velocity) => {
    //   keyDispatch({ type: velocity > 0 ? 'MOVE_RIGHT' : 'MOVE_LEFT' });
    // };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const app = useApp();
  const rightRef = useRef(null);
  const leftRef = useRef(null);

   
  const handleRightButtonClick = () => {
    keyDispatch({ type: 'MOVE_RIGHT' });
  
    // Start moving the trampoline continuously until the button is released
    const intervalId = setInterval(() => {
      keyDispatch({ type: 'STOP' });
    }, 150); // Adjust the interval time as needed for smooth movement
  
    // Store the intervalId in a ref, so we can clear it later
    rightRef.current.intervalId = intervalId;
    // clearInterval(rightRef.current.intervalId);

  };
  
  const handleRightButtonUp = () => {
    clearInterval(rightRef.current.intervalId);
  };
  

  const handleLeftButtonClick = () => {
    keyDispatch({ type: 'MOVE_LEFT' });
      const intervalId = setInterval(() => {
      keyDispatch({ type: 'STOP' });
    }, 150); 
  
    leftRef.current.intervalId = intervalId;

  };
  
  const handleLeftButtonUp = () => {
    clearInterval(leftRef.current.intervalId);
  };

  useTick(() => {
    const trampoline = trampolineRef.current;
    const trampolineWidth = trampoline?.width || 0;
    const trampolineHeight = trampoline?.height || 0;

    if (trampoline) {
      trampoline.x += motion.velocity;
      trampoline.x += speed;

      // Check if the trampoline is going out of bounds
      if (trampoline.x < 0) {
        trampoline.x = 0;
      } else if (trampoline.x + trampolineWidth / 2 > stageWidth) {
        trampoline.x = stageWidth - trampolineWidth / 2;
      }
    }
  const blueyBounds = blueyRef.current.getBounds();
  const trampolineBounds = trampolineRef.current.getBounds();
  if (checkCollision(blueyBounds, trampolineBounds)) {
    setCollision(true);

    // Revert back to texture1 after 1 second
    setTimeout(() => {
      setCollision(false);
    }, 300);
  }
});

  const yPosition = stageHeight * 0.93;

  return (
    <>
    <Container x={50} y={smallerScreen? stageHeight*0.9: yPosition}>
      <AnimatedSprite
        ref={trampolineRef}
        animationSpeed={0.02}
        isPlaying={false}
        scale={stageWidth*0.00025}
        // scale={0.25}

        textures={textures}
        currentFrame={collision ? 1 : 0}
        anchor={0.5}
      />

     
    </Container>
    {smallerScreen && 
    <Container>
       <Graphics
        ref={rightRef}
        draw={g => {
          g.lineStyle(2, 0xff00ff, 1);
          g.beginFill(0xff00bb, 0.25);
    
          // Calculate the height of the equilateral triangle based on the width
          const triangleWidth = 50;
          const triangleHeight = (Math.sqrt(3) / 2) * triangleWidth;
          const x= stageWidth*0.8
          const y= stageHeight *0.98
          // Draw the equilateral triangle
          g.moveTo(x, y);
          g.lineTo(x, y - triangleHeight);
          g.lineTo(x + triangleWidth, y - triangleHeight / 2);
          g.lineTo(x, y);
          g.endFill();
        }}
        interactive
        pointertap={handleRightButtonClick}
        pointerup={handleRightButtonUp}
        pointerout={handleRightButtonUp}
      />



<Graphics
        ref={leftRef}
        draw={g => {
          g.lineStyle(2, 0xff00ff, 1);
          g.beginFill(0x00FF00, 0.25);
    
          // Calculate the height of the equilateral triangle based on the width
          const triangleWidth = -50;
          const triangleHeight = (Math.sqrt(3) / 2) * -triangleWidth;
          const x= stageWidth/4 + triangleWidth/2
          const y= stageHeight *0.98
          // Draw the equilateral triangle
          g.moveTo(x, y);
          g.lineTo(x, y - triangleHeight);
          g.lineTo(x + triangleWidth, y - triangleHeight / 2);
          g.lineTo(x, y);
          g.endFill();
         
        

        }}
        interactive
        pointertap={handleLeftButtonClick}
        pointerup={handleLeftButtonUp}
        pointerout={handleLeftButtonUp}
      />
    </Container>}
    </>
  );
}
