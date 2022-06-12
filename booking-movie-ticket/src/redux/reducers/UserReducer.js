import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import { LOGIN } from "../actions/types/UserType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      state.userLogin = action.value;
      localStorage.setItem(USER_LOGIN, JSON.stringify(state.userLogin));
      localStorage.setItem(TOKEN, action.value.accessToken);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
