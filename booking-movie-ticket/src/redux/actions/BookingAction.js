import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { stompClient } from "../../pages/Checkout/Checkout";
import { SUCCESS } from "../../utils/settings/config";
import { BookingService } from "./../../services/BookingService";
import {
  BOOKING_SEAT,
  BOOKING_SEATS_SUCCESS,
  GET_ALL_SEATS,
  GET_SCHEDULE_MOVIE_DETAIL,
  OTHER_BOOKING_SEAT,
} from "./types/BookingType";

export const getScheduleMovieDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await BookingService.getScheduleMovieById(id);

      console.log("abc", result);
      dispatch({
        type: GET_SCHEDULE_MOVIE_DETAIL,
        value: result,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};

export const otherUserBookingSeatAction = (arrOtherSeats) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: OTHER_BOOKING_SEAT,
        value: arrOtherSeats,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};

export const getAllSeatsAction = () => {
  return async (dispatch) => {
    try {
      const arrSeats = await BookingService.getAllSeats();
      dispatch({
        type: GET_ALL_SEATS,
        value: arrSeats,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};

export const bookingSeatAction = (seat, scheduleMovieDetail, userLogin) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: BOOKING_SEAT,
      value: seat,
    });

    let arrChoosingSeat = getState().BookingReducer.arrChoosingSeat;

    let seatBooking = {
      scheduleMovieId: scheduleMovieDetail.scheduleMovieId,
      username: userLogin.username,
      seats: arrChoosingSeat,
    };

    if (stompClient) {
      stompClient.send(
        "/booking/load-booking-seats",
        {},
        JSON.stringify(seatBooking)
      );
    }
  };
};

export const bookingTicketsAction = (
  arrChoosingSeat,
  scheduleMovieId,
  userLogin,
  moviePrice
) => {
  return async (dispatch) => {
    let bookingTicketForm = {
      scheduleMovieId: scheduleMovieId,

      seats: arrChoosingSeat.map((item) => {
        const seat = {
          seatId: item.seatId,
          ticketPrice: item.seatType === "VIP" ? moviePrice * 1.5 : moviePrice,
        };

        return seat;
      }),
      username: userLogin.username,
    };
    if (stompClient) {
      stompClient.send(
        "/booking/booking-seats",
        {},
        JSON.stringify(bookingTicketForm)
      );

      // Reset lại danh sách ghế đang chọn
      await dispatch({
        type: BOOKING_SEATS_SUCCESS,
        value: [],
      });

      // Khoảng trễ để update lại database rồi mới báo thành công
      setTimeout(() => {
        stompClient.send(
          "/booking/booking-success",
          {},
          JSON.stringify(scheduleMovieId)
        );
      }, 100);
      openNotificationWithIcon(SUCCESS, "Đặt vé thành công", "success");
    }
  };
};
