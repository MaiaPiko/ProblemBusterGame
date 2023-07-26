import React from 'react';
import * as PIXI from 'pixi.js';
import { Container, AnimatedSprite, Text } from '@pixi/react';
import ghost1 from "../../assets/ghosts/ghost1.svg";
import ghost2 from "../../assets/ghosts/ghost2.svg";
import ghost3 from "../../assets/ghosts/ghost3.svg";

const textures = [
  PIXI.Texture.from(ghost1),
  PIXI.Texture.from(ghost2),
  PIXI.Texture.from(ghost3),
];

export default function Monsters({ amount, wordList }) {
  const monstersPerRow = 8;
  const spacingX = 100;
  const spacingY = 100;

  return (
    <Container>
      {Array.from({ length: amount }, (_, index) => (
        <Container
          key={index}
          x={(index % monstersPerRow) * spacingX} // Calculate x position based on column index
          y={Math.floor(index / monstersPerRow) * spacingY} // Calculate y position based on row index
        >
          <AnimatedSprite
            animationSpeed={0.12}
            isPlaying={true}
            scale={0.5}
            textures={textures}
          />
          {index % 2 === 0 ? (
            <Text
              text={wordList[Math.floor(index / 2) % wordList.length]}
              style={{
                fontFamily: 'Arial',
                fontSize: 16,
                fill: ['#ffffff', '#00ff99'],
                fontWeight: 'bold',
                align: 'center',
                zIndex: 2,
              }}
              y={55}
              x={25}
            />
          ) : null}
        </Container>
      ))}
    </Container>
  );
}
