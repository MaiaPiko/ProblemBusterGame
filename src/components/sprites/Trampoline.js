import React, { useEffect, useRef, useReducer, useContext, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Container, AnimatedSprite, useTick } from '@pixi/react';
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

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
    <Container x={50} y={yPosition}>
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
  );
}
