import { GET_ALL_MOVIE, GET_MOVIE_BY_ID } from "./types/MovieType";
import { MovieService } from "./../../services/MovieService";
export const getAllMovieAction = () => {
  return async (dispatch) => {
    try {
      const result = await MovieService.getAllMovies();
      dispatch({
        type: GET_ALL_MOVIE,
        value: result,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
export const getMovieByIdAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await MovieService.getMovieById(id);
      dispatch({
        type: GET_MOVIE_BY_ID,
        value: result,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
