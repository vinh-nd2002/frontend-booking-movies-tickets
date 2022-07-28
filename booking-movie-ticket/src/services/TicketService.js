import Api from "./baseApi";

const getAllTickets = (requestParams) => {
  return Api.get("/tickets", { params: requestParams });
};

const acceptTicketById = (id) => {
  return Api.put(`/tickets/${id}`);
};

export const TicketService = {
  getAllTickets,
  acceptTicketById,
};
