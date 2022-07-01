import { GET_ALL_MOVIE, GET_MOVIE_BY_ID } from "./types/MovieType";
import { MovieService } from "./../../services/MovieService";
import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { SUCCESS } from "../../utils/settings/config";
export const getAllMovieAction = (
  search,
  minMovieEvaluate,
  maxMovieEvaluate
) => {
  return async (dispatch) => {
    try {
      const result = await MovieService.getAllMovies(
        search,
        minMovieEvaluate,
        maxMovieEvaluate
      );
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

export const deleteMovieByIdAction = (id) => {
  return async (dispatch) => {
    try {
      await MovieService.deleteMovieById(id);
      openNotificationWithIcon(SUCCESS, "Đã xóa thành công", "success");
      dispatch(getAllMovieAction());
    } catch (error) {
      console.log("error>>", error);
    }
  };
};

export const createMovieAction = (formData) => {
  return async (dispatch) => {
    try {
      await MovieService.createMovie(formData);
      openNotificationWithIcon(SUCCESS, "Đã tạo thành công", "success");
      dispatch(getAllMovieAction());
    } catch (error) {
      console.log("error>>", error);
    }
  };
};

export const updateMovieAction = (formData, id) => {
  return async (dispatch) => {
    try {
      await MovieService.updateMovie(formData, id);
      openNotificationWithIcon(SUCCESS, "Đã sửa thành công", "success");
      dispatch(getAllMovieAction());
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
