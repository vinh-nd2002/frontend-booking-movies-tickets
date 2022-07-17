import Api from "./baseApi";

const login = (userLogin) => {
  return Api.post("/login", userLogin);
};

const resendConfirmUser = (email) => {
  const requestParams = {
    email: email,
  };
  return Api.get("/users/userRegistrationConfirmRequest", {
    params: requestParams,
  });
};

const resetPasswordRequest = (email) => {
  const requestParams = {
    email: email,
  };
  return Api.get("/users/resetPasswordRequest", { params: requestParams });
};

const resendResetPassword = (email) => {
  const requestParams = {
    email: email,
  };
  return Api.get("/users/resendResetPassword", { params: requestParams });
};

const resetPassword = (token, newPassword) => {
  const body = new FormData();
  body.append("newPassword", newPassword);
  body.append("token", token);

  return Api.put("/users/resetPassword", body);
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
  resetPassword,
  resetPasswordRequest,
  resendConfirmUser,
  resendResetPassword,
};
