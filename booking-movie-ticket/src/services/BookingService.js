import Api from "./baseApi";

const getAllSeats = () => {
  return Api.get("/seats");
};

const getScheduleMovieById = (id) => {
  return Api.get(`/schedulemovies/${id}`);
};

const getSchedules = () => {
  return Api.get("/schedules");
};

const createScheduleMovie = (formData) => {
  return Api.post("/schedulemovies", formData);
};

export const BookingService = {
  getScheduleMovieById,
  getAllSeats,
  getSchedules,
  createScheduleMovie,
};
