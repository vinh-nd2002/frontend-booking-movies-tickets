import { baseApi } from "./baseApi";

const getAllCineplexs = () => {
  return baseApi("GET", "/cineplexs");
};

export const CineplexService = {
  getAllCineplexs,
};
