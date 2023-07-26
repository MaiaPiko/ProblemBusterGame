import React, {
	createContext,
	useReducer,
	useState,
	useEffect,
	useRef,
} from "react";
import { Stage, Text } from "@pixi/react";
import Trampoline from "./sprites/Trampoline";
import Bluey from "./sprites/Bluey";
import MoveLeftButton from "./sprites/buttons/MoveLeftButton";
import MoveRightButton from "./sprites/buttons/MoveRightButton";
import GameOverBox from "./GameOverBox";
import WordInputBox from "./WordInputBox";
import Monsters from "./sprites/Monsters";
import Skip from "./Skip";
import Words from "./sprites/Words";
import Bricks from "./sprites/Bricks";
import * as PIXI from "pixi.js";
import navigationButtons from "./sprites/buttons/navigationButtons";
import GameIntro from "./GameIntro";

export const TrampolineContext = createContext();
export const BlueyContext = createContext();
export const gameOverContext = createContext();
export const startGameContext = createContext();
export const scoreContext = createContext();
export const introContext = createContext();
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

export const Game = () => {
	// const stageHeight = 800;
	const [state, dispatch] = useReducer(trampolineReducer, initialState);
	const [inputValue, setInputValue] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [startGame, setStartGame] = useState(false);
	const [score, setScore] = useState(0); // Define the score variable and its setter
	const blueyRef = useRef(null);
	const blueySpeed = useRef(7);
	const inputBoxRef = useRef(false);
	const trampolineRef = useRef(null);
	const blueyAngle = useRef(Math.random() * Math.PI * 2);
	const stageRef = useRef(null); // Define the stageRef using useRef
	const inputRef = useRef(null);
	const [gameIntro, setGameIntro] = useState("true")
	const [smallerScreen, setSmallerScreen] = useState("false")


	useEffect(() => {
		const smallerScreenDevice = window.innerWidth <= 780;
		setSmallerScreen(smallerScreenDevice);
	}, [])
	


	useEffect(() => {
		if (blueyRef.current) {
			const blueyPosition = {
				x: blueyRef.current.x,
				y: blueyRef.current.y,
			};
		}
	}, []);
	const stageWidth = smallerScreen? window.innerWidth : 800;
	const stageHeight = smallerScreen? window.innerHeight*0.95 :900;

	const [textAdded, setTextAdded] = useState(false);
	const [restartGame, setRestartGame] = useState(false);
	const defaultWords = [
		"destroy",
		"sadness",
		"loud-chewing",
		"laziness",
		"high-humidity",
		"paper-cuts",
	];

	// const handleInputChange = (event) => {
	// 	if (event.keyCode === 13) {
	// 		setStartGame(true);
	// 		}
	// 	 else {
	// 		setInputValue(event.target.value);
	// 		setTextAdded(true);
	// 	}
	// };

	
	const handleInputChange = (event) => {
		if (event.keyCode === 13) {
			setStartGame(true);
			}
		 else {
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
			setScore(0)
		}
	}, [startGame]);

	const formattedText = formatInputValue(inputValue);
	const wordList = addedWords(inputValue);
	window.addEventListener("keydown", handleInputChange);

	const stageElement = stageRef.current;
	window.addEventListener("click", () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	});

	return (
		<startGameContext.Provider value={startGame}>
		<introContext.Provider value={{gameIntro}}>
		<TrampolineContext.Provider value={{ dispatch }}>
			<BlueyContext.Provider value={blueyRef}>
				<gameOverContext.Provider value={gameOver}>
				<p style={{textAlign:"left", paddingLeft: 50}}>{`Score: ${score}`}</p>

					<Stage width={stageWidth} height={stageHeight} ref={stageRef}>
					<scoreContext.Provider value={{ score, setScore }}>
					
							{/* {startGame && <Monsters amount={numberOfRows(3)} wordList={wordList}/>} */}
							{startGame && !gameOver &&
							 
								<Words
									amount={numberOfRows(3)}
									wordList={wordList.length > 1 ? wordList : defaultWords}
									stageWidth={stageWidth}
									stageHeight={stageHeight}
									blueyRef={blueyRef}
									blueyAngle={blueyAngle}
									stageRef={stageRef}
									score={score}
									blueySpeed={blueySpeed}
									
								/>
							
							}
							{startGame && (
								<Trampoline
									stageHeight={stageHeight}
									stageWidth={stageWidth}
									speed={state.velocity}
									trampolineRef={trampolineRef}
									blueyRef={blueyRef}
								/>
							)}
							{startGame && (
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
							{gameOver && <GameOverBox setStartGame={setStartGame} stageWidth={stageWidth} />}
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

							{/* {!startGame && !gameIntro && (
								<WordInputBox
									inputBoxRef={inputBoxRef}
									text={formattedText}
									setStartGame={setStartGame}
								/>
							)} */}
							{/* {!startGame && !gameIntro && <Skip setStartGame={setStartGame} />} */}
						</scoreContext.Provider>
					</Stage>

					<input
						value={inputValue}
						onChange={handleInputChange}
						//   style={{ display: "none" }}
						style={{ position: "absolute", left: "-9999px" }}
						autoFocus
						ref={inputRef}
					/>

					<div
						style={{
							position: "absolute",
							left: "50%",
							transform: "translateX(-50%)",
							// bottom: "20px",
						}}
					>
						<MoveLeftButton dispatch={dispatch} />
						<MoveRightButton dispatch={dispatch} />
						{/* <h1>{`Score: ${score}`}</h1> */}
					</div>
					{/* </restartContext
					.Provider> */}
				</gameOverContext.Provider>
			</BlueyContext.Provider>
		</TrampolineContext.Provider>
		</introContext.Provider>
		</startGameContext.Provider>
	);
};
