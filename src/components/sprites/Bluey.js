import React, { useEffect, useRef, useContext } from "react";
import * as PIXI from "pixi.js";
import { Container, AnimatedSprite, useApp, useTick, Stage } from "@pixi/react";
import bluey1 from "../../assets/bluey/bluey.png";
import bluey2 from "../../assets/bluey/blueyBlinks.png";
import { gameOverContext, startGameContext, BlueyContext } from "../Game";
import { checkCollision } from "../../features/checkCollision";

const textures = [
	PIXI.Texture.from(bluey1),
	PIXI.Texture.from(bluey2),
	PIXI.Texture.from(bluey1),
];

// function checkCollision(rect1, rect2) {
//   return (
//     rect1.x + rect1.width > rect2.x &&
//     rect1.x < rect2.x + rect2.width &&
//     rect1.y + rect1.height > rect2.y &&
//     rect1.y < rect2.y + rect2.height
//   );
// }

function Bluey({
	setGameOver,
	startGame,
	blueyRef,
	trampolineRef,
	blueyAngle,
	speed,
	stageWidth,
}) {
	// const speed = useRef(6);
	const app = useApp();
	// const blueyRef = useRef(null);
	const gameOver = useContext(gameOverContext);
	const gameStart = useContext(gameOverContext);
	const passblueyPosition = useContext(BlueyContext);
	const angleVariables = [1, 0.9, 1]
	useTick((delta) => {
		const dx = Math.cos(blueyAngle.current) * speed.current * delta;
		const dy = Math.sin(blueyAngle.current) * speed.current * delta;
		const newBlueyX = blueyRef.current.x + dx;
		const newBlueyY = blueyRef.current.y + dy;
	  
		// Ensure bluey stays within the stage boundaries on the X-axis
		if (newBlueyX < 0) {
		  blueyRef.current.x = 0;
		  blueyAngle.current = Math.PI - blueyAngle.current * angleVariables[Math.floor(Math.random() * angleVariables.length)];
		} else if (newBlueyX > app.screen.width) {
		  blueyRef.current.x = app.screen.width;
		  blueyAngle.current = Math.PI - blueyAngle.current * angleVariables[Math.floor(Math.random() * angleVariables.length)];
		} else {
		  blueyRef.current.x = newBlueyX;
		}
	  
		// Ensure bluey stays within the stage boundaries on the Y-axis
		if (newBlueyY < 0) {
		  blueyRef.current.y = 0;
		  blueyAngle.current = -blueyAngle.current;
		} else if (newBlueyY > app.screen.height) {
		  if (startGame) {
			setGameOver(true);
		  } else {
			blueyRef.current.y = app.screen.height;
			blueyAngle.current = -blueyAngle.current;
		  }
		} else {
		  blueyRef.current.y = newBlueyY;
		}
	  
		const blueyBounds = blueyRef.current.getBounds();
		const trampolineBounds = trampolineRef.current.getBounds();
	  
		if (checkCollision(blueyBounds, trampolineBounds)) {
			const variables = [-blueyAngle.current , -Math.PI/2, -blueyAngle.current*0.9, -blueyAngle.current*1.1]
		//   blueyAngle.current = -blueyAngle.current;
		blueyAngle.current = variables[Math.floor(Math.random() * variables.length)]
		}
	  });

	return (
		<Container>
			<Container x={50} y={450} ref={blueyRef}>
				<AnimatedSprite
					animationSpeed={0.01}
					isPlaying={true}
					// scale={0.15}
					scale={stageWidth * 0.00015}
					textures={textures}
					anchor={0.5}
				/>
			</Container>
		</Container>
	);
}

export default Bluey;
