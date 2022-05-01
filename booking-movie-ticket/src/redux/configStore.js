import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { MovieReducer } from "./reducers/MovieReducer";
import { CineplexReducer } from "./reducers/CineplexReducer";
const rootReducers = combineReducers({
  MovieReducer,
  CineplexReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
