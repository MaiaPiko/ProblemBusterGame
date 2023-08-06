import React, {
	createContext,
	useReducer,
	useState,
	useEffect,
	useRef,
} from "react";
import { Container, Stage, Text, Graphics, useApp } from "@pixi/react";
import Trampoline from "./sprites/Trampoline";
import Bluey from "./sprites/Bluey";
import GameOverBox from "./GameOverBox";
import Words from "./sprites/Words";
import * as PIXI from "pixi.js";
import GameIntro from "./GameIntro";
import YouWin from "./YouWin";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

export const TrampolineContext = createContext();
export const BlueyContext = createContext();
export const gameOverContext = createContext();
export const startGameContext = createContext();
export const scoreContext = createContext();
export const introContext = createContext();
export const winContext = createContext();

const initialState = { velocity: 0 };
const numberOfRows = (number) => {
	let result = number * 20;
	return result;
};
function trampolineReducer(state, action) {
	switch (action.type) {
		case "MOVE_LEFT":
			return { ...state, velocity: -5 };
		case "MOVE_RIGHT":
			return { ...state, velocity: 5 };
		case "STOP":
			return { ...state, velocity: 0 };
		default:
			return state;
	}
}

function Score({ score }) {
	return (
		<Container>
			<Text
				text={`Score : ${score}`}
				style={{
					fill: "white",
					fontSize: 15,
				}}
			/>
		</Container>
	);
}

export const Game = () => {
	// const stageHeight = 800;
	const [state, dispatch] = useReducer(trampolineReducer, initialState);
	const [inputValue, setInputValue] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [startGame, setStartGame] = useState(false);
	const [score, setScore] = useState(0);
	const blueyRef = useRef(null);
	const inputBoxRef = useRef(false);
	const trampolineRef = useRef(null);
	const blueyAngle = useRef(Math.random() * Math.PI * 2);
	const stageRef = useRef(null); // Define the stageRef using useRef
	const inputRef = useRef(null);
	const [gameIntro, setGameIntro] = useState("true");
	const [smallerScreen, setSmallerScreen] = useState("false");
	const [win, setWin] = useState(false);
	const [showNavButtons, setShowNavButtons] = useState("false");
	// const blueySpeed = useRef(smallerScreen? 6: 8);
	// const leftButtonRef = React.useRef();

	useEffect(() => {
		const smallerScreenDevice = window.innerWidth <= 800;
		setSmallerScreen(smallerScreenDevice);
	}, []);

	useEffect(() => {
		if (blueyRef.current) {
			const blueyPosition = {
				x: blueyRef.current.x,
				y: blueyRef.current.y,
			};
		}
		inputFocus();
	}, []);
	const stageWidth = smallerScreen ? window.innerWidth : 800;
	const stageHeight = smallerScreen ? window.innerHeight * 0.9 : 900;
	const blueySpeed = useRef(stageWidth / 100);
	const [textAdded, setTextAdded] = useState(false);
	// const [restartGame, setRestartGame] = useState(false);
	const defaultWords = [
		"destroy",
		"sadness",
		"loud-chewing",
		"laziness",
		"high-humidity",
		"paper-cuts",
	];

	const handleInputChange = (event) => {
		if (event.keyCode === 13) {
			setStartGame(true);
		} else {
			setInputValue(event.target.value);
			setTextAdded(true);
		}
	};

	function formatInputValue(inputValue) {
		const words = [];
		if (inputValue) {
			const inputWords = inputValue.trim().split(" ");
			inputWords.forEach((word) => {
				words.push(word);
			});
			return words.join(", ");
		}
		return "";
	}

	function addedWords(inputValue) {
		const words = ["destroy"];
		if (inputValue) {
			const inputWords = inputValue.trim().split(" ");
			inputWords.forEach((word) => {
				if (word.trim() !== "") {
					words.push(word.trim());
				}
			});
		}
		return words;
	}

	useEffect(() => {
		if (!startGame) {
			setGameOver(false);
			setWin(false);
			setScore(0);
			setInputValue("")
		}
	}, [startGame]);

	useEffect(() => {
		if (startGame) {
			blueySpeed.current = stageWidth / 100; // Reset blueySpeed to the default value
		}
	}, [startGame, stageWidth]);

	const formattedText = formatInputValue(inputValue);
	const wordList = addedWords(inputValue);
	window.addEventListener("keydown", handleInputChange);

	const stageElement = stageRef.current;

	const inputFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	window.addEventListener("click", inputFocus);

	window.addEventListener("touchStart", inputFocus);

	return (
		<winContext.Provider value={setWin}>
			<startGameContext.Provider value={startGame}>
				<introContext.Provider value={{ gameIntro }}>
					<BlueyContext.Provider value={blueyRef}>
						<TrampolineContext.Provider value={{ dispatch }}>
							<gameOverContext.Provider value={gameOver}>
								{/* <p style={{textAlign:"left", paddingLeft: 50}}>{`Score: ${score}`}</p> */}
								<Stage width={stageWidth} height={stageHeight}>
									<Container ref={stageRef}>
										<scoreContext.Provider value={{ score, setScore }}>
											{startGame && !gameOver && !win && (
												<Score score={score} />
											)}

											{/* {startGame && <Monsters amount={numberOfRows(3)} wordList={wordList}/>} */}
											{startGame && !gameOver && !win && (
												<Words
													amount={numberOfRows(4)}
													wordList={
														wordList.length > 1 ? wordList : defaultWords
													}
													stageWidth={stageWidth}
													stageHeight={stageHeight}
													blueyRef={blueyRef}
													blueyAngle={blueyAngle}
													stageRef={stageRef}
													score={score}
													blueySpeed={blueySpeed}
													setWin={setWin}
												/>
											)}
											{startGame && !gameOver && !win && (
												<Trampoline
													stageHeight={stageHeight}
													stageWidth={stageWidth}
													speed={state.velocity}
													trampolineRef={trampolineRef}
													blueyRef={blueyRef}
												/>
											)}
											{startGame && !gameOver && !win && (
												<Bluey
													setGameOver={setGameOver}
													startGame={startGame}
													blueyRef={blueyRef}
													trampolineRef={trampolineRef}
													blueyAngle={blueyAngle}
													speed={blueySpeed}
													stageWidth={stageWidth}
												/>
											)}

											{gameOver && (
												<GameOverBox
													setStartGame={setStartGame}
													stageWidth={stageWidth}
												/>
											)}
											{!startGame && (
												<GameIntro
													setGameIntro={setGameIntro}
													inputBoxRef={inputBoxRef}
													text={formattedText}
													setStartGame={setStartGame}
													gameIntro={gameIntro}
													stageWidth={stageWidth}
													stageHeight={stageHeight}
												/>
											)}



											{win && <YouWin setStartGame={setStartGame} />}
										</scoreContext.Provider>

										{/* {startGame && !gameOver && !win && <NavigationButtons stageWidth={stageWidth} />} */}
									</Container>
								</Stage>
								{startGame && !smallerScreen && (
									<p>
										To navigate, use your keyboard's left and right arrows or
										click on the traingles on the screen.
									</p>
								)}
								{!startGame && (
									<input
										value={inputValue}
										onChange={handleInputChange}
										//   style={{ display: "none" }}
										style={{ position: "absolute", left: "-9999px" }}
										autoFocus
										ref={inputRef}
									/>
								)}

								<div
									style={{
										position: "absolute",
										left: "50%",
										transform: "translateX(-50%)",
										// bottom: "20px",
									}}
								>
									{smallerScreen && !startGame && (
										<button onClick={inputFocus}>Show KeyBoard &#9000;</button>
									)}
								</div>
							</gameOverContext.Provider>
						</TrampolineContext.Provider>
					</BlueyContext.Provider>
				</introContext.Provider>
			</startGameContext.Provider>
		</winContext.Provider>
	);
};
