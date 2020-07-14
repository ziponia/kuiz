import { MakeStore, Context, createWrapper } from "next-redux-wrapper";
import { createStore, combineReducers } from "@reduxjs/toolkit";
import app, { AppState } from "./app";
import game, { GameState } from "./game";

export type RootState = {
  app: AppState;
  game: GameState;
};

const reducer = combineReducers({
  app: app.reducer,
  game: game.reducer,
});
export const makeStore: MakeStore<RootState> = (context: Context) => {
  const store = createStore(reducer);
  return store;
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: false });
