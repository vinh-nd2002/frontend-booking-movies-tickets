import Api from "./baseApi";

const getAllMovies = () => {
  return Api.get("/movies");
};

const getMovieById = (id) => {
  return Api.get(`/movies/${id}`);
};

export const MovieService = {
  getAllMovies,
  getMovieById,
};
