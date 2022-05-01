import { GET_ALL_MOVIE } from "./types/MovieType";
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
