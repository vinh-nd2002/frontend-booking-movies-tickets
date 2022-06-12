import { baseApi } from "./baseApi";

const getAllCinemas = () => {
  return baseApi("GET", "/cinemas");
};

const getCinemaById = (id) => {
  return baseApi("GET", `/cinemas/${id}`);
};

export const CinemaService = {
  getAllCinemas,
  getCinemaById,
};
