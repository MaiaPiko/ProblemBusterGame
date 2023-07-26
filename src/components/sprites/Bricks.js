import React, {useContext} from "react";
import * as PIXI from "pixi.js";
import { Container, Text, Graphics } from "@pixi/react";
import { startGameContext, gameOverContext } from "../Game";
export default function Bricks({ amount, wordList, stageWidth, stageHeight }) {
	
  // const gameOver = useContext(gameOverContext);
  // const gameStart = useContext(startGameContext);

  
  const bricksPerRow = 10;
	// const spacingX = 100;
	const spacingY = 60;
	const rectHeight = 40;
	const brickColor = [
		"#6698FF",
		"#38ACEC",
		"#7FFFD4",
		"#32CD32",
		"#32CD32",
		"#FF69B4",
		"#FA2A55",
	];
	const fontSizes = [16, 25, 20, 30, 28];
	return (

		<Container>
			{Array.from({ length: amount }, (_, index) => {
				const wordIndex = wordList
					? Math.floor(index / 2) % wordList.length
					: 0;
				const word = wordList ? wordList[wordIndex] : "";
				const wordLength = word.length;
				const spacingX = stageWidth / bricksPerRow;
		
				const randomColorIndex = Math.floor(Math.random() * brickColor.length);
				const randomColor = brickColor[randomColorIndex];
				const randomColor2 =
					brickColor[Math.floor(Math.random() * brickColor.length)];
				// let textYPos = rectHeight * (Math.random()*3)
				const textXPos = spacingX * (Math.random() * 3);
				const textYPos = spacingY * (Math.random() * 3);
				if (textYPos > stageHeight - spacingY) {
					textYPos = spacingY * (Math.random() * 3);
				}
				if (textXPos > stageWidth - spacingX) {
					textXPos = spacingX * (Math.random() * 3);
				}
      
				return (
          
					<Container
						key={index}
						// x={(index % bricksPerRow) * textXPos} // Calculate x position based on column index
						// y={Math.floor(index / bricksPerRow) * textYPos} // Calculate y position based on row index
						x={(index % bricksPerRow) * spacingX}
						// y={Math.floor(index / bricksPerRow) * spacingY}
						y={
							Math.floor(index / bricksPerRow) * spacingY +
							spacingY * Math.random()
						}
					>
						<Text
							text={word}
							style={{
								fontFamily: "Arial",
								// fontSize: 16,
								fontSize:
									fontSizes[Math.floor(Math.random() * fontSizes.length)],
								fill: randomColor2,
								dropShadow: true,
								dropShadowColor: "black",
								dropShadowBlur: 5,
								dropShadowAngle: Math.PI / 5,
								dropShadowDistance: 2,
								// fill: [ brickColor[Math.floor(Math.random() * brickColor.length)],  brickColor[Math.floor(Math.random() * brickColor.length)]],
								fontWeight: "bold",
								align: "center",
								zIndex: 2,
							}}
							// y={rectHeight / 2 - 8}
							// y={rectHeight * (Math.random()*3)}
							// y = {textYPos}
							// x={textXPos} // Adjust the x position to center the text horizontally
							anchor={0.5} // Center the anchor point of the text
						/>
					</Container>
				);
			})}
		</Container>
	);
}
