import { CinemaService } from "./../../services/CinemaService";
import { GET_CINEMA_DETAIL } from "./types/CinemaType";
export const GetCinemaById = (id) => {
  return async (dispatch) => {
    try {
      const result = await CinemaService.GetCinemaById(id);
      dispatch({
        type: GET_CINEMA_DETAIL,
        value: result,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
