import { GET_ALL_MOVIE, GET_MOVIE_BY_ID } from "./types/MovieType";
import { MovieService } from "./../../services/MovieService";
import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { ERROR, SUCCESS } from "../../utils/settings/config";
export const getAllMovieAction = (requestParams) => {
  return async (dispatch) => {
    try {
      const result = await MovieService.getAllMovies(requestParams);
      dispatch({
        type: GET_ALL_MOVIE,
        value: result,
      });
    } catch (error) {
      openNotificationWithIcon(
        ERROR,
        "Sorry, an unexpected error has occurred. Please try again",
        "error"
      );
      console.log("error", error);
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
      openNotificationWithIcon(
        ERROR,
        "Sorry, an unexpected error has occurred. Please try again",
        "error"
      );
      console.log("error", error);
    }
  };
};

export const deleteMovieByIdAction = (id) => {
  return async (dispatch) => {
    try {
      await MovieService.deleteMovieById(id);
      openNotificationWithIcon(SUCCESS, "Deleted successfully", "success");
      dispatch(getAllMovieAction());
    } catch (error) {
      openNotificationWithIcon(
        ERROR,
        "Sorry, an unexpected error has occurred. Please try again",
        "error"
      );
      console.log("error", error);
    }
  };
};

export const createMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      await MovieService.createMovie(formData);
      openNotificationWithIcon(SUCCESS, "Created successfully", "success");
      dispatch(getAllMovieAction());
    } catch (error) {
      openNotificationWithIcon(
        ERROR,
        "Sorry, an unexpected error has occurred. Please try again",
        "error"
      );
      console.log("error", error);
    }
  };
};

export const updateMovieAction = (formData, id) => {
  return async (dispatch) => {
    try {
      await MovieService.updateMovie(formData, id);
      openNotificationWithIcon(SUCCESS, "updated successfully", "success");
      dispatch(getAllMovieAction());
    } catch (error) {
      openNotificationWithIcon(
        ERROR,
        "Sorry, an unexpected error has occurred. Please try again",
        "error"
      );
      console.log("error", error);
    }
  };
};
