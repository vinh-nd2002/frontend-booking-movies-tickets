import Api from "./baseApi";

const getAllMovies = (search, minMovieEvaluate, maxMovieEvaluate) => {
  const requestParams = {
    search: search,
    minMovieEvaluate: minMovieEvaluate ? minMovieEvaluate : 0,
    maxMovieEvaluate: maxMovieEvaluate ? maxMovieEvaluate : 10,
  };
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

export const MovieService = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovieById,
};
