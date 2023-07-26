import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    velocity: 0,
  };

  const movementSlice = createSlice({
    name: "move",
    initialState,
    reducers: {
      moveLeft: (state, action) => {
        state.velocity = 5;
      },
      moveRight: (state, action) => {
        state.velocity = -5;
      },
      stop:(state, action) =>{
        state.velocity = 0;
      }
    },
  });

  export const { moveLeft, moveRight, stop} = movementSlice.actions;

export default movementSlice.reducer;