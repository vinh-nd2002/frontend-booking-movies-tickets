import { TOKEN, USER_LOGIN } from "../../utils/settings/config";
import {
  GET_ALL_USER,
  GET_ALL_USERS,
  GET_USER_DETAIL,
  LOGIN,
  LOGOUT,
} from "../actions/types/UserType";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  usersDefault: [],
  userDetail: {},
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LOGIN: {
      state.userLogin = action.value;
      localStorage.setItem(USER_LOGIN, JSON.stringify(state.userLogin));
      localStorage.setItem(TOKEN, action.value.accessToken);
      return { ...state };
    }

    case LOGOUT: {
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(TOKEN);
      state.userLogin = action.value;
      return { ...state };
    }

    case GET_USER_DETAIL: {
      state.userDetail = action.value;
      return { ...state };
    }

    case GET_ALL_USERS: {
      state.usersDefault = action.value;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
