import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame } from "./game.interface";

export type GameState = {
  games: IGame[];
};

export const initialState: GameState = {
  games: [
    {
      orders: 0,
      question: "",
      answer: "",
    },
  ],
};

export default createSlice({
  name: "game",
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<IGame>) => {
      state.games = state.games.concat({
        ...action.payload,
      });
    },
    removeGame: (state, action: PayloadAction<number>) => {
      state.games = state.games.filter(game => game.orders !== action.payload);
    },
    setQuestionVal: (state, action: PayloadAction<IGame>) => {
      state.games = state.games.map(game => {
        if (game.orders === action.payload.orders) {
          return {
            ...game,
            ...action.payload,
          };
        }
        return game;
      });
    },
  },
});
