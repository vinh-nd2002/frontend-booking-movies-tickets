import Api from "./baseApi";

const getAllCineplexs = () => {
  return Api.get("/cineplexs");
};

export const CineplexService = {
  getAllCineplexs,
};
