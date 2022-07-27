import Api from "./baseApi";

const getAllSeats = () => {
  return Api.get("/seats");
};

const getScheduleMovieById = (id) => {
  return Api.get(`/schedule-movies/${id}`);
};

const sendMailAfterBookingSuccess = (email, scheduleMovieId) => {
  const requestParams = {
    email: email,
    scheduleMovieId: scheduleMovieId,
  };
  return Api.get("/schedule-movies/success-ticket-booking", {
    params: requestParams,
  });
};

const getSchedules = () => {
  return Api.get("/schedules");
};

const createScheduleMovie = (formData) => {
  return Api.post("/schedule-movies", formData);
};

export const BookingService = {
  getScheduleMovieById,
  getAllSeats,
  getSchedules,
  createScheduleMovie,
  sendMailAfterBookingSuccess,
};
