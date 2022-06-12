import {
  BOOKING_SEAT,
  BOOKING_SEATS_SUCCESS,
  GET_ALL_SEATS,
  GET_SCHEDULE_MOVIE_DETAIL,
  OTHER_BOOKING_SEAT,
} from "../actions/types/BookingType";

const stateDefault = {
  arrSeats: [],
  scheduleMovieDetail: {},
  arrChoosingSeat: [],
  arrOtherChoosingSeat: [],
};

export const BookingReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_ALL_SEATS:
      state.arrSeats = action.value;
      return { ...state };
    case GET_SCHEDULE_MOVIE_DETAIL:
      state.scheduleMovieDetail = action.value;
      state.test++;
      return { ...state };
    case BOOKING_SEAT:
      let updateSeat = [...state.arrChoosingSeat];
      let index = updateSeat.findIndex(
        (choosingSeat) => choosingSeat.seatId === action.value.seatId
      );
      if (index !== -1) {
        updateSeat.splice(index, 1);
      } else {
        updateSeat.push(action.value);
      }

      state.arrChoosingSeat = updateSeat;
      return { ...state };
    case OTHER_BOOKING_SEAT: {
      state.arrOtherChoosingSeat = action.value;
      return { ...state };
    }
    case BOOKING_SEATS_SUCCESS: {
      state.arrChoosingSeat = action.value;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
