import Api from "./baseApi";

const login = (userLogin) => {
  return Api.post("/login", userLogin);
};

const register = (body) => {
  return Api.post("/users", body);
};
const isExistsByUsername = (username) => {
  return Api.get(`/users/username/${username}`);
};
const isExistsByEmail = (email) => {
  return Api.get(`/users/email/${email}`);
};

export const UserService = {
  login,
  register,
  isExistsByUsername,
  isExistsByEmail,
};
