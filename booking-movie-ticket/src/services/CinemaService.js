import { baseApi } from "./baseApi";

const getAllCinemas = () => {
  return baseApi("GET", "/cinemas");
};

export const MovieService = {
  getAllCinemas,
};
