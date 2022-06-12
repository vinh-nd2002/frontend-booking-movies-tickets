import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { MovieReducer } from "./reducers/MovieReducer";
import { CineplexReducer } from "./reducers/CineplexReducer";
import { CinemaReducer } from "./reducers/CinemaReducer";
import { UserReducer } from "./reducers/UserReducer";
import { BookingReducer } from "./reducers/BookingReducer";
const rootReducers = combineReducers({
  MovieReducer,
  CineplexReducer,
  CinemaReducer,
  UserReducer,
  BookingReducer,
});

export const store = createStore(rootReducers, applyMiddleware(thunk));
