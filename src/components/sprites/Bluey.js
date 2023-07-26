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
  stageWidth
}) {
	// const speed = useRef(6);
	const app = useApp();
	// const blueyRef = useRef(null);
	const gameOver = useContext(gameOverContext);
	const gameStart = useContext(gameOverContext);
	const passblueyPosition = useContext(BlueyContext);

	useTick((delta) => {
		const dx = Math.cos(blueyAngle.current) * speed.current * delta;
		const dy = Math.sin(blueyAngle.current) * speed.current * delta;
		blueyRef.current.x += dx;
		blueyRef.current.y += dy;

		// setBlueyPosition(blueyRef.current.x, blueyRef.current.y)

		if (
			blueyRef.current.x > app.screen.width ||
			blueyRef.current.x < -blueyRef.current.width + blueyRef.current.width
		) {
			blueyAngle.current = Math.PI - blueyAngle.current ;
		}

		if (blueyRef.current.y > app.screen.height) {
			if (startGame) {
				// speed.current = 0;
				setGameOver(true);
        speed.current = 7 
			} else {
				blueyAngle.current = -blueyAngle.current;
			}
		}

		if (blueyRef.current.y < -blueyRef.current.height / 2) {
			blueyAngle.current = -blueyAngle.current;
		}

		const blueyBounds = blueyRef.current.getBounds();
		const trampolineBounds = trampolineRef.current.getBounds();



		if (checkCollision(blueyBounds, trampolineBounds)) {
		
			blueyAngle.current = -blueyAngle.current; 
    //   speed.current += 0.1;
    }
	});

	return (
		<Container>
			<Container x={50} y={450} ref={blueyRef}>
				<AnimatedSprite
					animationSpeed={0.01}
					isPlaying={true}
					// scale={0.15}
					scale={stageWidth* 0.00015}

					textures={textures}
					anchor={0.5}
				/>
			</Container>
		</Container>
	);
}

export default Bluey;
