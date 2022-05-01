import { baseApi } from "./baseApi";

const getAllRooms = () => {
  return baseApi("GET", "/rooms");
};

export const MovieService = {
  getAllRooms,
};
