import { GET_ALL_TICKETS } from "../actions/types/TicketType";

const stateDefault = {
  ticketsDefault: [],
};

export const TicketReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_TICKETS:
      state.ticketsDefault = action.value;
      return { ...state };
    default:
      return { ...state };
  }
};
