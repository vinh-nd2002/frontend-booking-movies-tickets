import { UserService } from "../../services/UserService";
import { LOGIN, LOGOUT } from "./types/UserType";
import { openNotificationWithIcon } from "../../components/Notification/Notification";
import { ERROR, SUCCESS } from "../../utils/settings/config";

export const loginAction = (userLogin, propsRoute) => {
  return async (dispatch) => {
    console.log("propsRoute", propsRoute);
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
      openNotificationWithIcon(SUCCESS, "Login thành công", "success");
    } catch (error) {
      openNotificationWithIcon(ERROR, "Login thất bại", "error");
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
    openNotificationWithIcon(SUCCESS, "Logout thành công", "success");
  };
};
