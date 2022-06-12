import { UserService } from "../../services/UserService";
import { LOGIN } from "./types/UserType";
import { history } from "../../App";

export const loginAction = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await UserService.login(userLogin);
      dispatch({
        type: LOGIN,
        value: result,
      });
      history.back();
    } catch (error) {
      console.log("error>>", error);
    }
  };
};
