import { configureStore } from "@reduxjs/toolkit";
import movementReducer from "../features/movement/movementSlice.js";

const gameStore = configureStore({
	reducer: {
		move: movementReducer,
	},
});

export default gameStore;
