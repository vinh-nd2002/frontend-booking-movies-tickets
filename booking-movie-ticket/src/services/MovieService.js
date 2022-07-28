import Api from "./baseApi";

const getAllMovies = (requestParams) => {
  return Api.get("/movies", { params: requestParams });
};

const getMovieById = (id) => {
  return Api.get(`/movies/${id}`);
};

const deleteMovieById = (id) => {
  return Api.delete(`/movies/${id}`);
};

const createMovie = (formData) => {
  return Api.post("/movies", formData);
};

const updateMovie = (formData, id) => {
  return Api.put(`/movies/${id}`, formData);
};

export const MovieService = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovieById,
  updateMovie,
};
