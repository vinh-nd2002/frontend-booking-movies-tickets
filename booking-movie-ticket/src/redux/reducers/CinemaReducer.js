import { GET_CINEMA_DETAIL } from "../actions/types/CinemaType";

const stateDefault = {
  cinemaDetail: {},
};

export const CinemaReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_CINEMA_DETAIL:
      state.cinemaDetail = action.value;
      return { ...state };
    default:
      return { ...state };
  }
};
