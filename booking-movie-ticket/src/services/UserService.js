import Api from "./baseApi";

const login = (userLogin) => {
  return Api.post("/login", userLogin);
};

export const UserService = {
  login,
};
