import { GET_ALL_CINEPLEX } from "../actions/types/CineplexType";

const stateDefault = {
  cineplexs: [],
};

export const CineplexReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_CINEPLEX:
      state.cineplexs = action.value;
      return { ...state };
    default:
      return { ...state };
  }
};
