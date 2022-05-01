import { GET_ALL_CINEPLEX } from "./types/CineplexType";
import { CineplexService } from "./../../services/CineplexService";
export const getAllCineplexAction = () => {
  return async (dispatch) => {
    try {
      const result = await CineplexService.getAllCineplexs();
      dispatch({
        type: GET_ALL_CINEPLEX,
        value: result,
      });
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
