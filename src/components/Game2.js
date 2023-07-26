import React, { createContext, useReducer, useState, useEffect, useRef, useApp } from "react";
import { Stage, Text, useTick, AppProvider } from "@pixi/react";
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


export const TrampolineContext = createContext();
export const BlueyContext = createContext();
export const gameOverContext = createContext();
export const startGameContext = createContext();


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
	const stageWidth = 800;
	const stageHeight = 800;
	const [state, dispatch] = useReducer(trampolineReducer, initialState);
	const [inputValue, setInputValue] = useState("");
	const [gameOver, setGameOver] = useState(false);
	const [startGame, setStartGame] = useState(false);
	const [blueyPosition, setBlueyPosition] = useState({ x: 0, y: 0 });
	const [textAdded, setTextAdded] = useState(false);
	const [restartGame, setRestartGame] = useState(false);
	const defaultWords = ["destroy", "sadness", "loud-chewing"];
	const blueySpeed  = useRef(6)
	const blueyAngle = useRef(Math.random() * Math.PI * 2);
	const blueyRef = useRef(null);

	useTick((delta) => {
		const dx = Math.cos(blueyAngle.current) * blueySpeed.current * delta;
		const dy = Math.sin(blueyAngle.current) * blueySpeed.current * delta;
		blueyRef.current.x += dx;
		blueyRef.current.y += dy;

		if (blueyRef.current.x > stageWidth){
			blueyAngle.current = Math.PI - blueyAngle.current;
		}

		if(blueyRef.current.y > stageHeight) {
			if (startGame){
				blueySpeed.current = 0;
				setGameOver(true);
			}

			else{
				blueyAngle.current = -blueyAngle.current
			}
		}

		if(blueyRef.current.y < -blueyRef.current.height/2){
			blueyAngle.current = -blueyAngle.current;
		}
	})

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
		const words = [];
		if (inputValue) {
			const inputWords = inputValue.trim().split(" ");
			inputWords.forEach((word) => {
				words.push(word);
			});
		}
		return words;
	}

	useEffect(() => {
		if (!startGame) {
			setGameOver(false);
		}
	}, [startGame]);

	const formattedText = formatInputValue(inputValue);
	const wordList = addedWords(inputValue);
	window.addEventListener("keydown", handleInputChange);

	return (
		<AppProvider>
		<TrampolineContext.Provider value={{ dispatch }}>
			{/* <BlueyContext.Provider value={blueyPosition}> */}
				<gameOverContext.Provider value={gameOver}>
					<Stage width={stageWidth} height={stageHeight}>
						{/* {startGame && <Monsters amount={numberOfRows(3)} wordList={wordList}/>} */}
						{startGame && (
							<Words
								amount={numberOfRows(3)}
								wordList={wordList.length > 0 ? wordList : defaultWords}
								stageWidth={stageWidth}
								stageHeight={stageHeight}
							/>
							// <Bricks
							// 	amount={numberOfRows(3)}
							// 	wordList={wordList.length > 0 ? wordList : defaultWords}
							// 	stageWidth={stageWidth}
							// 	stageHeight={stageHeight}
							// />
						)}
						{startGame && (
							<Trampoline
								stageHeight={stageHeight}
								stageWidth={stageWidth}
								speed={state.velocity}
							/>
						)}
						{startGame && (
							<Bluey ref={blueyRef} setGameOver={setGameOver} startGame={startGame} blueyRef={blueyRef} angle={blueyAngle} speed={blueySpeed} />
						)}
						{gameOver && <GameOverBox setStartGame={setStartGame} />}

						{!startGame && <WordInputBox text={formattedText} />}
						{!startGame && <Skip setStartGame={setStartGame} />}
					</Stage>

					<input
						value={inputValue}
						onChange={handleInputChange}
						//   style={{ display: "none" }}
						style={{ position: "absolute", left: "-9999px" }}
						autoFocus
					/>
					{/* </restartContext.Provider> */}
				</gameOverContext.Provider>
				<MoveLeftButton dispatch={dispatch} />
				<MoveRightButton dispatch={dispatch} />
			{/* </BlueyContext.Provider> */}
		</TrampolineContext.Provider>
		</AppProvider>
	);
};
