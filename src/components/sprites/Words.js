import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Text, useTick } from "@pixi/react";
import { checkCollision } from "../../features/checkCollision";
import {  scoreContext } from "../Game";


export default function Words({ amount, wordList, stageWidth, stageHeight, blueyRef, blueyAngle, blueySpeed, setWin }) {
  const [words, setWords] = useState([]);
  const wordRefs = useRef([]);
  const { score, setScore } = useContext(scoreContext);

  
  
  useEffect(() => {
    const updatedWords = [];
    const bricksPerRow = 10; // Number of bricks in each row
    const brickHeight = 40; // Height of each brick
    const spacingX = stageWidth / bricksPerRow;
    const spacingY = 60; // Vertical spacing between rows

    for (let i = 0; i < amount; i++) {
      const row = Math.floor(i / bricksPerRow); // Calculate the current row
      const col = i % bricksPerRow; // Calculate the current column

      const wordIndex = wordList ? i % wordList.length : 0;
      const word = wordList ? wordList[wordIndex] : "";
      const randomColor = generateRandomColor();

      const textXPos = calculateXPosition(col, spacingX, stageWidth);
      const textYPos = calculateYPosition(row, brickHeight, spacingY, stageHeight);

      updatedWords.push({
        word,
        fontSize: calculateFontSize(),
        color: randomColor,
        x: textXPos,
        y: textYPos,
      });
    }

    setWords(updatedWords);
  }, [amount]);

  const generateRandomColor = () => {
    const colors = [
      "#6698FF",
      "#38ACEC",
      "#7FFFD4",
      "#32CD32",
      "#32CD32",
      "#FF69B4",
      "#FA2A55",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculateFontSize = () => {
    // const fontSizes = [16, 25, 20, 30, 28];
    const fontSizes = [stageWidth*0.016 + 1, stageWidth*0.025 +2, stageWidth* 0.020 + 1, stageWidth*0.030+3, 0.028*stageWidth];

    return fontSizes[Math.floor(Math.random() * fontSizes.length)];
  };

  const calculateYPosition = (row, brickHeight, spacingY, stageHeight) => {
    const minY = row * spacingY + brickHeight + 8;
    const maxY = (row + 2) * spacingY - brickHeight;
    return Math.floor(Math.random() * (maxY - minY + 1)) + minY;
  };

  const calculateXPosition = (col, spacingX, stageWidth) => {
    let xPos = col * spacingX;

    if (col === 0) {
      const offset = spacingX * 3;
      xPos += offset;
    }

    if (xPos < 0) {
      xPos = 0;
    } else if (xPos + spacingX > stageWidth) {
      xPos = stageWidth - spacingX;
    }

    return xPos;
  };


  
  useTick(() => {
    const blueyBounds = blueyRef.current?.getBounds();
    setWords((prevWords) => {
      return prevWords.filter((word, index) => {
        const wordContainer = wordRefs.current[index];
        const wordBounds = wordContainer?.getBounds();
        const collided = blueyBounds?.intersects(wordBounds);
  
        if (collided) {
          blueyAngle.current = -blueyAngle.current;
          setScore((prevScore) => prevScore + 1);
          blueySpeed.current += 0.01
          // Handle the collision here, such as updating state or triggering an action
          return false; // Remove the collided word from the array
        }
        return true; // Keep the word in the array if no collision occurred
      });
    });

    if (words.length == 0){
      // ServiceWorkerContainer(true)
      setWin(true)
    }
  });
  
  

  return (
    <>
    <Container>
   
      {words.map((word, index) => (
        
        <Container key={index} x={word.x} y={word.y} visible={ true} ref={(ref) => (wordRefs.current[index] = ref)}>
          <Text
            text={word.word}
            style={{
              fontFamily: "Arial",
              fontSize: word.fontSize,
              fill: word.color,
              fontWeight: "bold",
              align: "center",
              zIndex: 2,
            }}
            anchor={0.5}
          />
        </Container>
      ))} 
    </Container>
  
    </>
  );
}
