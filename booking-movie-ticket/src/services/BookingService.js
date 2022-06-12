import Api from "./baseApi";

const getAllSeats = () => {
  return Api.get("/seats");
};

const getScheduleMovieById = (id) => {
  return Api.get(`/schedulemovies/${id}`);
};

export const BookingService = {
  getScheduleMovieById,
  getAllSeats,
};
