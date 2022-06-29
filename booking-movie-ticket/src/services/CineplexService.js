import Api from "./baseApi";

const getAllCineplexs = () => {
  return Api.get("/cineplexs");
};

const getCineplexsById = (id) => {
  return Api.get(`/cineplexs/${id}`);
};

export const CineplexService = {
  getAllCineplexs,
  getCineplexsById,
};
