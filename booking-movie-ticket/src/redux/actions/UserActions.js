import { UserService } from "../../services/UserService";
import {
  GET_ALL_USERS,
  GET_USER_DETAIL,
  LOGIN,
  LOGOUT,
} from "./types/UserType";
import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { ERROR, SUCCESS } from "../../utils/settings/config";

export const loginAction = (userLogin, propsRoute) => {
  return async (dispatch) => {
    try {
      const result = await UserService.login(userLogin);
      dispatch({
        type: LOGIN,
        value: result,
      });
      result.role === "ADMIN"
        ? propsRoute.history.push("/admin")
        : propsRoute.history.push(
            propsRoute.location.state ? propsRoute.location.state.from : "/"
          );
      openNotificationWithIcon(SUCCESS, "Logged in successfully", "success");
    } catch (error) {
      openNotificationWithIcon(ERROR, "Login failed", "error");
      console.log("error>>", error);
    }
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
      value: {},
    });
    openNotificationWithIcon(SUCCESS, "Logout successfully", "success");
  };
};

export const registerAction = (body) => {
  return async (dispatch) => {
    try {
      await UserService.register(body);
      dispatch(getAllUsersAction());
    } catch (error) {
      openNotificationWithIcon(ERROR, "Registration failed", "error");
      console.log("error>>", error);
    }
  };
};

export const getAllUsersAction = () => {
  return async (dispatch) => {
    try {
      const result = await UserService.getAllUsers();

      dispatch({ type: GET_ALL_USERS, value: result });
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

export const getProfileUserAction = (userId) => {
  return async (dispatch) => {
    try {
      const result = await UserService.getProfile(userId);

      dispatch({ type: GET_USER_DETAIL, value: result });
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
