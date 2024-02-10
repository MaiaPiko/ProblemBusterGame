import {
	AnimatedSprite,
	Container,
	Sprite,
	Text,
	useApp,
	useTick,
} from "@pixi/react";
import bluey1 from "../assets/bluey/bluey.png";
import bluey2 from "../assets/bluey/blueyBlinks.png";
import bluey3 from "../assets/bluey/talking/4.png";
import bluey4 from "../assets/bluey/talking/3.png";

import * as PIXI from "pixi.js";
import { useState, useRef, useEffect } from "react";
import trampoline1 from "../assets/trampoline/pinkTrampoline1.png";
import trampoline2 from "../assets/trampoline/pinkTrampoline2.png";
import { checkCollision } from "../features/checkCollision";


const textures = [
    PIXI.Texture.from(bluey4),

	PIXI.Texture.from(bluey1),
	PIXI.Texture.from(bluey2),
	PIXI.Texture.from(bluey1),
	PIXI.Texture.from(bluey3),

];

const trampolineTextures = [
    PIXI.Texture.from(trampoline1),
    PIXI.Texture.from(trampoline2),
  ];

let i = 0;

function YouWin({ setStartGame }) {
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	const [rotation, setRotation] = useState(0);

	useTick((delta) => {
		i += 0.05 * delta;

		// setX(Math.sin(i) * 100);
		setY(Math.sin(i / 0.5) * 100);
		setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);

        const blueyBounds = blueyRef.current.getBounds();
        const trampolineBounds = trampolineRef.current.getBounds();
        if (checkCollision(blueyBounds, trampolineBounds)) {
          setCollision(true);

          setTimeout(() => {
            setCollision(false);
          }, 300);
        }
	});
	const app = useApp();
	const smallerScreen = app.screen.width <700;
	const scale = smallerScreen ? app.screen.width/1700 : 0.25;
	const position = { x: app.screen.width / 2, y: app.screen.height / 2 };

	const blueyHeight = textures[0]?.height * scale;
	const blueyWidth = textures[0]?.width * scale;



    const blueyRef = useRef(null);
    const trampolineRef = useRef(null);

    const [collision, setCollision] = useState(false);



	const handleKeyInput = () => {
		setStartGame(false);
	};

	useEffect(() => {
		const handleKeyDown = (event) => {
			handleKeyInput();
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	return (
		<Container>
			<Container x={position.x} y={position.y}>
				<AnimatedSprite
					animationSpeed={0.02}
					isPlaying={true}
					scale={scale}
					textures={textures}
					anchor={0.5}
					ref={blueyRef}
					y={y}
				/>
                	</Container>

                <Container x={position.x} y = {position.y + blueyHeight}>
                <AnimatedSprite
                isPlaying={false}
                scale={scale}
                textures={trampolineTextures}
                currentFrame={collision ? 1:0}
                anchor={0.5}
                ref={trampolineRef}
                />
                </Container>
			<Container x={position.x} y={position.y - blueyHeight}>
				<Text
					text="We did it!"
					style={{
						fill: "white",
                        fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
                        fontSize: 60,
                        fontWeight:'400',
                        fill: ['#e6add8', '#99ccff'], 


					}}
					anchor={0.5}
				></Text>
			</Container>
		</Container>
	);
}

export default YouWin;
