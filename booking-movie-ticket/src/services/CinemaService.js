import Api from "./baseApi";

const getAllCinemas = () => {
  return Api.get("/cinemas");
};

const getCinemaById = (id) => {
  return Api.get(`/cinemas/${id}`);
};

export const CinemaService = {
  getAllCinemas,
  getCinemaById,
};
