import { baseApi } from "./baseApi";

const getAllMovies = () => {
  return baseApi("GET", "/movies");
};

export const MovieService = {
  getAllMovies,
};
